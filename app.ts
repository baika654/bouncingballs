/**
 * Canvas Wrapper Class
 */
class Canvas {
    protected canvas: HTMLCanvasElement;

    constructor(private id: string) {
        this.canvas = <HTMLCanvasElement> document.getElementById(id);
        this.canvas.width = document.body.clientWidth;
        this.canvas.height = document.body.clientHeight;

        window.addEventListener('resize', this.resizeCanvas.bind(this), false);
    }

    getEl(): HTMLCanvasElement {
        return <HTMLCanvasElement> this.canvas;
    }

    getContext(): CanvasRenderingContext2D {
        return <CanvasRenderingContext2D> this.canvas.getContext('2d');
    }

    getWidth(): number {
        return this.canvas.width;
    }

    getHeight(): number {
        return this.canvas.height;
    }

    resizeCanvas(): void {
        this.canvas.width = document.body.clientWidth;
        this.canvas.height = document.body.clientHeight;
    }
}

/**
 * Ball Wrapper Class
 */
class Ball {
    protected canvas: Canvas;
    protected x: number;
    protected y: number;
    protected velX: number;
    protected velY: number;
    protected color: string;
    protected size: number;

    constructor(canvas: Canvas, x: number, y: number, velX: number, velY: number, color: string, size: number) {
        this.canvas = canvas;
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.size = size;
    }

    draw(): void {
        let context = this.canvas.getContext();

        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        context.fill();
    }

    update(): void {
        if((this.x + this.size) >= this.canvas.getWidth()) {
            this.velX = -(this.velX);
        }

        if((this.x - this.size) <= 0) {
            this.velX = -(this.velX);
        }

        if((this.y + this.size) >= this.canvas.getHeight()) {
            this.velY = -(this.velY);
        }

        if((this.y - this.size) <= 0) {
            this.velY = -(this.velY);
        }

        this.x += this.velX;
        this.y += this.velY;
    }
}

/**
 * Main Loop Class
 */
class Loop {
    protected canvas: Canvas;
    protected ball: Ball;

    constructor(canvas: Canvas, ball: Ball) {
        this.canvas = canvas;
        this.ball = ball;
    }

    start(): void {
        this.canvas.getContext().fillStyle = 'rgba(0,0,0,0.25)';
        this.canvas.getContext().fillRect(0,0, this.canvas.getWidth(), this.canvas.getHeight());

        this.ball.draw();
        this.ball.update();

        requestAnimationFrame(this.start.bind(this));
    }
}

function init(): void {
    let canvas = new Canvas("my-canvas");
    let ball = new Ball(canvas, 100, 100, 6, 6, '#0000ff', 30);
    let loop = new Loop(canvas, ball);
    loop.start();
}



