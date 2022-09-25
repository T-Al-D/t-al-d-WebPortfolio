export class Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    sizeDecrease: number;
    hueColor = 0;
    colorjump = 3;

    constructor(
        xPos: number,
        yPos: number,
        size: number,
        speedX: number,
        speedY: number,
        sizeDecrease: number
    ) {
        this.x = xPos;
        this.y = yPos;
        this.size = size;
        this.speedX = speedX;
        this.speedY = speedY;
        this.sizeDecrease = sizeDecrease;
        this.hueColor += this.colorjump;
    }

    // new position for Particles
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.size -= this.sizeDecrease;
        this.hueColor += this.colorjump;
    }

    // draw the Particles on the canvas
    draw(canvasContext: CanvasRenderingContext2D) {
        // hue, saturation, lightness
        const hue: string = "hsl(" + this.hueColor + ", 100%, 35%)";
        canvasContext.strokeStyle = hue;
        canvasContext.strokeRect(this.x, this.y, this.size, this.size);
    }
}
