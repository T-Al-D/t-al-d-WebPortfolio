import {
    AfterViewInit,
    Component,
    ElementRef,
    HostListener,
    ViewChild,
} from "@angular/core";
import { Particle } from "./Particles";

@Component({
    selector: "app-main-router",
    templateUrl: "./main-router.component.html",
    styleUrls: ["./main-router.component.css"],
})
export class MainRouterComponent implements AfterViewInit {
    constructor() {}

    ////////////   RAINBOW MOUSEMOUVE   ////////////////////
    // Access to a certain element in the DOM
    @ViewChild("canvasRef")
    canvasRef!: ElementRef<HTMLCanvasElement>;

    // variables needed
    private canvasContext!: CanvasRenderingContext2D;
    private particlesArray: Array<Particle> = [];
    private allowMouseEffect = true;

    // after the view has been loaded or else exception gets thrown
    ngAfterViewInit(): void {
        const tempCanvasContext = this.canvasRef.nativeElement.getContext("2d");
        // assin to extra variable for easier access
        if (tempCanvasContext !== null) {
            this.canvasContext = tempCanvasContext;
        }
    }

    // fill the array with new Particles
    fillParticleArray(xPos: number, yPos: number) {
        for (let i = 0; i < 6; i++) {
            const particle = new Particle(
                xPos,
                yPos,
                Math.random() * 14 + 1,
                Math.random() * 3 - 1.5,
                Math.random() * 3 - 1.5,
                0.1
            );
            this.particlesArray.push(particle);
        }
    }

    // delete Particles wich habe become to small
    emptyParticleArray() {
        for (let i = 0; i < this.particlesArray.length; i++) {
            const particle = this.particlesArray[i];
            if (particle.size < 2.5) {
                this.particlesArray.splice(i, 1);
            }
        }
    }

    //draw the rectangle on the canvas
    drawRectOnCanvas() {
        this.particlesArray.forEach((particle) => {
            particle.update();
            particle.draw(this.canvasContext);
        });
    }

    // clear the canvas to draw something new
    clearCanvas() {
        this.canvasContext.clearRect(
            0,
            0,
            this.canvasRef.nativeElement.width,
            this.canvasRef.nativeElement.height
        );
    }

    //run async while until array is empty
    async clearParticles() {
        while (this.particlesArray.length !== 0) {
            this.clearCanvas();
            this.drawRectOnCanvas();
            this.emptyParticleArray();
            await new Promise((f) => setTimeout(f, 5));
            // just for safety
            if (this.particlesArray.length === 0) {
                break;
            }
        }
    }

    // user can decide if mouse effects are wished
    toggleMouseEffect() {
        this.allowMouseEffect = !this.allowMouseEffect;
        this.clearParticles();
    }

    // every once and while empty the particleArray
    @HostListener("window:scroll ", ["$event"])
    @HostListener("document:keydown", ["$event"])
    @HostListener("document:mouseleave", ["$event"])
    @HostListener("document:mousedown", ["$event"])
    dissolveMouseEffects() {
        this.clearParticles();
    }

    // look out for mousemovements
    @HostListener("document:mousemove", ["$event"])
    onMouseMove(event: MouseEvent) {
        if (this.allowMouseEffect) {
            if (this.canvasRef !== null) {
                // make canvas fit better
                this.canvasRef.nativeElement.width =
                    this.canvasRef.nativeElement.offsetWidth;
                this.canvasRef.nativeElement.height =
                    this.canvasRef.nativeElement.offsetHeight;
            }
            if (this.canvasContext !== null) {
                // important clear first, then draw
                const correctionX = 165;
                const correctionY = 120;
                this.clearCanvas();
                this.fillParticleArray(
                    event.x - correctionX,
                    event.y - correctionY
                );
                this.drawRectOnCanvas();
                this.emptyParticleArray();
            }
        }
    }
}
