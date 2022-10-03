export class Player {
    x: number;
    y: number;
    sizeX: number;
    sizeY: number;
    speedX: number;
    hueColor: number;
    score = 0;
    lifes = 3;
    constructor(
        xPos: number,
        yPos: number,
        sizeX: number,
        sizeY: number,
        speedX: number,
        hueColor: number
    ) {
        this.x = xPos;
        this.y = yPos;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.speedX = speedX;
        this.hueColor = hueColor;
    }

    // new position for Player (only allowed to move in x-axis,
    //move either 1 or -1)
    update(move: number) {
      this.x = this.x + this.speedX * move;
      this.hueColor += 5;
    }

    // player appears on the screen
    draw(canvasContext: CanvasRenderingContext2D) {
        // hue, saturation, lightness
        const hue: string = "hsl(" + this.hueColor + ", 100%, 50%)";
        canvasContext.fillStyle = hue;
        canvasContext.fillRect(this.x, this.y, this.sizeX, this.sizeY);
    }
}
