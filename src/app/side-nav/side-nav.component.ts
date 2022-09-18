import {
    Component,
    ViewChild,
    ElementRef,
    AfterViewInit,
    HostListener,
} from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { delay, map, shareReplay } from "rxjs/operators";
import { Particle } from "./Particles";

@Component({
    selector: "app-side-nav",
    templateUrl: "./side-nav.component.html",
    styleUrls: ["./side-nav.component.css"],
})
export class SideNavComponent implements AfterViewInit {
    // auto-generated
    isHandset$: Observable<boolean> = this.breakpointObserver
        .observe(Breakpoints.Handset)
        .pipe(
            map((result) => result.matches),
            shareReplay()
        );
    constructor(private breakpointObserver: BreakpointObserver) {}
    // auto-generated

    // Access to a certain element in the DOM
    @ViewChild("canvasRef")
    canvasRef!: ElementRef<HTMLCanvasElement>;
    private canvasContext!: CanvasRenderingContext2D;
    private particlesArray: Array<Particle> = [];

    // after the view has been loaded
    ngAfterViewInit(): void {
        const tempCanvasContext = this.canvasRef.nativeElement.getContext("2d");

        if (tempCanvasContext !== null) {
            this.canvasContext = tempCanvasContext;
        }
    }

    // fill the array with new Particles
    fillParticleArray(xPos: number, yPos: number) {
        for (let i = 0; i < 15; i++) {
            const particle = new Particle(
                xPos,
                yPos,
                Math.random() * 14 + 1,
                Math.random() * 3 - 1.5,
                Math.random() * 3 - 1.5,
                0.05
            );
            this.particlesArray.push(particle);
        }
    }

    // delete Particles wich habe become to small
    emptyParticleArray() {
        for (let i = 0; i < this.particlesArray.length; i++) {
            const particle = this.particlesArray[i];
            if (particle.size < 0.7) {
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
    async loop() {
        while (this.particlesArray.length !== 0) {
            this.clearCanvas();
            this.drawRectOnCanvas();
            this.emptyParticleArray();
            await new Promise((f) => setTimeout(f, 500));
            console.log(this.particlesArray.length);
            // just for safety
            if (this.particlesArray.length === 0) {
                break;
            }
        }
    }

    // Look out for specific events
    @HostListener("document:mousemove", ["$event"])
    onMouseMove(event: MouseEvent) {
        if (this.canvasRef !== null) {
            this.canvasRef.nativeElement.width = window.innerWidth;
            this.canvasRef.nativeElement.height = window.innerHeight;
        }
        if (this.canvasContext !== null) {
            // important clar first, then draw
            this.clearCanvas();
            this.fillParticleArray(event.x - 180, event.y - 160);
            this.drawRectOnCanvas();
            this.emptyParticleArray();
            this.loop();
        }
    }
}
