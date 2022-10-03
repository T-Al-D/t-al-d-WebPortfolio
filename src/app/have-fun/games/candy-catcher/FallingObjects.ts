export class FallingObjects {
    x: number;
    y: number;
    size: number;
    speedY: number;
    hueColor: number;
    constructor(
        xPos: number,
        yPos: number,
        size: number,
        speedY: number,
        hueColor: number
    ) {
        this.x = xPos;
        this.y = yPos;
        this.size = size;
        this.speedY = speedY;
        this.hueColor = hueColor;
    }

    // new position for FallingObjects (can only fall)
    update() {
        this.y += this.speedY;
    }

    // fallingObject appears on the screen
    draw(canvasContext: CanvasRenderingContext2D) {
        // hue, saturation, lightness
        const hue: string = "hsl(" + this.hueColor + ", 100%, 50%)";
        canvasContext.fillStyle = hue;
        canvasContext.beginPath();
        canvasContext.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
        canvasContext.fill();
    }
}
