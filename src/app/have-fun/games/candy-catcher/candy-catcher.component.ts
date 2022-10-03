import {
    AfterViewInit,
    Component,
    ElementRef,
    HostListener,
    ViewChild,
} from "@angular/core";
import { FallingObjects } from "./FallingObjects";
import { Player } from "./Player";

@Component({
    selector: "app-candy-catcher",
    templateUrl: "./candy-catcher.component.html",
    styleUrls: ["./candy-catcher.component.css"],
})
export class CandyCatcherComponent implements AfterViewInit {
    // Access to a certain element in the DOM
    @ViewChild("canvasRef")
    canvasRef!: ElementRef<HTMLCanvasElement>;

    // variables needed
    public player = new Player(0, 0, 60, 40, 25, 0);

    //the variables are being correctly reassined after init
    private canvasHeight = 0;
    private canvasWidth = 0;

    // variables (especially for the start) calculation of current amount of falling objects
    private frames = 0;
    private framesUntilNextObject = 120;
    private maxAmountOfFallingObjects = 0;
    private goalMaxAmountOfFallingObjects = 5;

    // game variables
    private gameStopped = false;
    private canvas2DContext!: CanvasRenderingContext2D;
    private fallingObjectsArray: Array<FallingObjects> = [];

    // numbers from ASCII are used: <-=37, ->=39, A=65, D=68, a=97, d=100
    private acceptedKeys: Array<number> = [37, 39, 65, 68, 97, 100];

    // after the view has been loaded or else exception gets thrown
    ngAfterViewInit(): void {
        const tempCanvasContext = this.canvasRef.nativeElement.getContext("2d");
        // assin to extra variable for easier access
        if (tempCanvasContext !== null) {
            this.canvas2DContext = tempCanvasContext;

            // make the first start apperance nice
            this.adjustCanvas();
            this.player.x = this.canvasWidth / 2.1;
            this.player.y = this.canvasHeight - this.player.sizeY * 1.075;
            this.player.draw(this.canvas2DContext);
        }
    }

    // Math.random only generates between 0 and 1, + (minimumValue)
    generateRandomNumber(min: number, max: number) {
        return Math.random() * max + min;
    }

    // make canvas fit better
    adjustCanvas() {
        this.canvasRef.nativeElement.width =
            this.canvasRef.nativeElement.offsetWidth;
        this.canvasRef.nativeElement.height =
            this.canvasRef.nativeElement.offsetHeight;

        // readjust the values for the game
        this.canvasHeight = this.canvasRef.nativeElement.height;
        this.canvasWidth = this.canvasRef.nativeElement.width;
    }

    // clear the canvas to draw something new
    clearCanvas() {
        this.canvas2DContext.clearRect(
            0,
            0,
            this.canvasRef.nativeElement.width,
            this.canvasRef.nativeElement.height
        );
    }

    // only draw as many as allowed for the current time
    // check while drawing
    drawFallingObjects() {
        // make sure the amount is more than 0
        if (this.maxAmountOfFallingObjects === 0) {
            this.maxAmountOfFallingObjects = 1;
        }
        // prevent out of bounds exception
        if (this.maxAmountOfFallingObjects > this.fallingObjectsArray.length) {
            this.maxAmountOfFallingObjects = this.fallingObjectsArray.length;
        }
        for (let i = 0; i < this.maxAmountOfFallingObjects; i++) {
            const fallingObject = this.fallingObjectsArray[i];
            fallingObject.update();
            fallingObject.draw(this.canvas2DContext);
            if (this.collisionDetection(fallingObject)) {
                this.player.score += 100;
            }
        }
    }

    // fill the array with falling Objects
    fillObjectsArray() {
        for (let i = 0; i < 10; i++) {
            // only between 4 and 91% of the screens width should the objects spawn
            const fallingObject = new FallingObjects(
                this.generateRandomNumber(
                    this.canvasWidth * 0.04,
                    this.canvasWidth * 0.91
                ),
                0,
                10,
                1,
                this.generateRandomNumber(0, 360)
            );
            this.fallingObjectsArray.push(fallingObject);
        }
    }

    // delete fallen Objects that have reached the "ground"
    emptyObjectsArray() {
        for (let i = 0; i < this.fallingObjectsArray.length; i++) {
            const fallingObject = this.fallingObjectsArray[i];
            if (fallingObject.y > this.canvasHeight - fallingObject.size) {
                this.fallingObjectsArray.splice(i, 1);
            }
        }
    }

    // finding out if the player has touched and falling object
    collisionDetection(fallingObject: FallingObjects) {
        if (
            fallingObject.x + fallingObject.size ===
                this.player.x + this.player.sizeX &&
            fallingObject.y + fallingObject.size ===
                this.player.y + this.player.sizeY
        ) {
            return true;
        }
        return false;
    }

    // resets a game from new
    gameReset() {
        this.gameStopped = false;
        this.player.score = 0;
        this.player.lifes = 3;
        this.fallingObjectsArray = [];
    }

    // reacting to key-events
    @HostListener("document:keydown", ["$event"])
    onKeyPressed(event: KeyboardEvent) {
        // only execute if canvas not null and only allowed keys are pressed
        const currentKeyCode = event.keyCode;
        if (
            this.canvas2DContext !== null &&
            this.acceptedKeys.includes(currentKeyCode)
        ) {
            if (this.canvasRef !== null) {
                this.adjustCanvas();
            }
            // important clear first, then draw
            this.clearCanvas();
            let currentPlayerMove = 0;
            // depending on what key was pressed do as follows (2 cases follwo each other
            // -> same as ||, only allow movement while on the screen )
            switch (currentKeyCode) {
                case 37:
                case 65:
                case 97:
                    if (this.player.x > 0) {
                        currentPlayerMove = -1;
                    }
                    break;
                case 39:
                case 68:
                case 100:
                    if (this.player.x < this.canvasWidth - this.player.sizeX) {
                        currentPlayerMove = 1;
                    }
                    break;
                default:
                    console.log("Error in key assingments");
                    break;
            }
            this.player.update(currentPlayerMove);
            this.player.draw(this.canvas2DContext);
        }
    }

    // continuous reapeat of this functions untill it stop
    Animation = () => {
        // START with one until maxAmount and then stay at that Amount
        // count amount of frames and release more falling objects
        if (this.frames < this.framesUntilNextObject * 6) {
            this.frames++;
        }
        this.maxAmountOfFallingObjects = Math.round(
            this.frames / this.framesUntilNextObject
        );

        //No more than goalMaxAmountOfFallingObjects falling Objects at once
        if (
            this.maxAmountOfFallingObjects > this.goalMaxAmountOfFallingObjects
        ) {
            this.maxAmountOfFallingObjects = this.goalMaxAmountOfFallingObjects;
        }

        // clear the canvas and don´t forget the player!
        this.clearCanvas();
        this.player.draw(this.canvas2DContext);

        //draw the fallen objects
        this.drawFallingObjects();

        // empty the array if any Objects have reached the ground!
        this.emptyObjectsArray();

        // refill Array before it is too empty
        if (
            this.fallingObjectsArray.length < this.goalMaxAmountOfFallingObjects
        ) {
            this.fillObjectsArray();
        }

        // in case game has to be stopped!
        if (!this.gameStopped) {
            // update before redraw and allow other functions parallel
            requestAnimationFrame(this.Animation);
        }
    };

    // this is the game-restart
    onStartClick() {
        this.gameReset();
        this.Animation();
    }

    // stop the game
    onStopClick() {
        this.gameStopped = !this.gameStopped;
    }
}
