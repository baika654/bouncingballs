//import {Canvas} from "./app.js";

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

    public getEl(): HTMLCanvasElement {
        return <HTMLCanvasElement> this.canvas;
    }

    public getContext(): CanvasRenderingContext2D {
        return <CanvasRenderingContext2D> this.canvas.getContext('2d');
    }

    public getWidth(): number {
        return this.canvas.width;
    }

    public getHeight(): number {
        return this.canvas.height;
    }

    protected resizeCanvas(): void {
        this.canvas.width = document.body.clientWidth;
        this.canvas.height = document.body.clientHeight;
    }
}

interface Loopable {
    draw(): void;
    update(graphicObject:Loopable[]): void;
    getXpos(): number;
    getYpos(): number;
    getSize(): number; 
    getVelX(): number;
    getVelY(): number;
    setXpos(x: number): void;
    setYpos(y: number): void;
    setSize(size: number): void; 
    setVelX(velX: number): void;
    setVelY(velY: number): void;
    getUUID(): string;
}

/**
 * Particle Wrapper Class
 */

class Particle implements Loopable {
    protected canvas: Canvas;
    protected x: number;
    protected y: number;
    protected velX: number;
    protected velY: number;
    protected color: string;
    protected size: number;
    protected UUID: string;
    

    constructor(canvas: Canvas, x: number, y: number, velX: number, velY: number, color: string, size: number) {
        this.canvas = canvas;
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.size = size;
        this.UUID = this.createUUID();
        
    }

    createUUID(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
    }

    setXpos(x: number): void {
        this.x = x;
    }

    setYpos(y: number): void {
        this.y=y;
    } 

    setSize(size: number): void {
        this.size = size
    }

    setVelX(velX: number): void {
        this.velX = velX;
    };

    setVelY(velY: number): void {
        this.velY = velY;
    }

    public getXpos(): number {
        return this.x;
    }

    public getYpos(): number {
        return this.y;
    }

    public getSize(): number {
        return this.size;
    } 

    public getVelX(): number {
        return this.velX;
    };

    public getVelY(): number {
        return this.velY;
    }

    public getUUID(): string {
        return this.UUID;
    }

    public draw(): void {
        let context = this.canvas.getContext();

        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        context.fill();
    }

    public update(graphicObject:Loopable[]): void {
        for (let i=0; i<graphicObject.length; i++) {
            if (this.UUID!==graphicObject[i].getUUID()) {
                    let ballDiff = Math.sqrt(Math.pow(this.x-graphicObject[i].getXpos(),2)+Math.pow(this.y-graphicObject[i].getYpos(),2));
                    
                    if (ballDiff<(this.size+graphicObject[i].getSize())) {
                            /** Calculate total kinetic energy in X direction
                            let KinX:number = 0.5*Math.pow(this.velX,2) + 0.5*Math.pow(allBalls[i].velX,2) */
                            //let diffAngle:number = Math.asin((allBalls[i].x-this.x)/ballDiff);
                            let diffAngle2:number = Math.atan2((graphicObject[i].getXpos()-this.x),(graphicObject[i].getYpos()-this.y));
                            //console.log("diffAngle = ", diffAngle, "diffAngle2 = ", diffAngle2, "X1 vector:" , (this.velX>0 ? '+':'-'), " Y1 vector:", (this.velY>0 ? '+':'-'), "X2 vector:" ,(allBalls[i].velX>0 ? '+':'-'), " Y2 vector:",(allBalls[i].velY>0 ? '+':'-'));
                            
                            let dx:number = this.x-graphicObject[i].getXpos();
                            let dy:number = this.y-graphicObject[i].getYpos();
                            let normalX:number = dx / ballDiff;
                            let normalY:number = dy / ballDiff;
                            let midpointX:number = (graphicObject[i].getXpos() + this.x) / 2;
                            let midpointY:number = (graphicObject[i].getYpos() + this.y) / 2;
                            graphicObject[i].setXpos(midpointX - normalX * graphicObject[i].getSize());
                            graphicObject[i].setYpos(midpointY - normalY * graphicObject[i].getSize());
                            this.x = midpointX + normalX * this.size;
                            this.y =(midpointY + normalY * this.size);




                            // Rotate colliding balls
                            let velXBall1:number = this.velX*Math.cos(diffAngle2)+this.velY*Math.sin(diffAngle2);
                            let velYBall1:number = this.velY*Math.cos(diffAngle2)-this.velX*Math.sin(diffAngle2);
                            let velXBall2:number = graphicObject[i].getVelX()*Math.cos(diffAngle2)+graphicObject[i].getVelY()*Math.sin(diffAngle2);
                            let velYBall2:number = graphicObject[i].getVelY()*Math.cos(diffAngle2)-graphicObject[i].getVelX()*Math.sin(diffAngle2);
    
                            let tempVelXBall1:number = velXBall1;
                            let tempVelXBall2:number = velXBall2;
    
                            velXBall1 = -tempVelXBall1;
                            velXBall2 = -tempVelXBall2;
                            
                            this.velX = velXBall1*Math.cos(diffAngle2)-velYBall1*Math.sin(diffAngle2);
                            this.velY = velYBall1*Math.cos(diffAngle2)+velXBall1*Math.sin(diffAngle2);
                            graphicObject[i].setVelX(velXBall2*Math.cos(diffAngle2)-velYBall2*Math.sin(diffAngle2));
                            graphicObject[i].setVelY(velYBall2*Math.cos(diffAngle2)+velXBall2*Math.sin(diffAngle2));
    
                            //this.x += this.velX;
                            //this.y += this.velY;
                            //graphicObject[i].setXpos(graphicObject[i].getXpos() + graphicObject[i].getVelX());
                            //graphicObject[i].setYpos(graphicObject[i].getYpos() + graphicObject[i].getVelY());
                           
                            
                            console.log("Collision!");
                           
                    }
            }
                
        }



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
    protected drawingObjectGenerator: DrawingObjectGenerator;

    constructor(canvas: Canvas, drawingObjectGenerator: DrawingObjectGenerator) {
        this.canvas = canvas;
        this.drawingObjectGenerator = drawingObjectGenerator;
    }

    public start(): void {
        this.canvas.getContext().fillStyle = 'rgba(255,255,255,0.7)';
        this.canvas.getContext().fillRect(0,0, this.canvas.getWidth(), this.canvas.getHeight());

        for(let particle of this.drawingObjectGenerator.getAll()) {
            particle.draw();
            particle.update(this.drawingObjectGenerator.getAll());
        }

        requestAnimationFrame(this.start.bind(this));
    }
}

class DrawingObjectGenerator {
    protected canvas: Canvas;
    protected drawingobjects: Loopable[] = [];
    protected numberOfDrawingObjects: number;
    protected numberOfParticles: number;
    protected numberOfBlocks: number;

    constructor(canvas: Canvas, numberOfParticles: number = 10, numberOfBlocks: number = 0) {
        this.canvas = canvas;
        this.numberOfParticles = numberOfParticles;
        this.numberOfBlocks = numberOfBlocks;
        this.numberOfDrawingObjects = numberOfParticles + numberOfBlocks;
    }

    public generate(): DrawingObjectGenerator {
        for(let i = 0; i < this.numberOfParticles; i++) {
            let velocity: number = this.getRandomVelocity();
            let size: number = this.getRandomSize();
            /** init a new particle */
            let particle = new Particle(this.canvas, this.getRandomX(size), this.getRandomY(size), velocity, velocity, this.getRandomColor(), size);
            this.add(particle);
        }

        return this;
    }

    protected add(particle: Particle): void {
        this.drawingobjects.push(particle);
    }

    public getAll(): Loopable[] {
        return this.drawingobjects;
    }

    protected getRandomColor(): string {
        let hue = Math.floor(Math.random() * 360);
        let pastel = 'hsl(' + hue + ', 100%, 87.5%)';
        return pastel;
    }

    protected getRandomVelocity(): number {
        return this.random(2, 4);
    }

    protected getRandomSize(): number {
        return this.random(5, 60);
    }

    protected getRandomX(size: number): number {
        return this.random(size, this.canvas.getWidth() - size);
    }

    protected getRandomY(size: number): number {
        return this.random(size, this.canvas.getHeight() - size);
    }

    protected random(min: number, max: number): number {
        return Math.floor( Math.random() * (max - min) ) + min;
    }
}

function init2(): void {
    let canvas = new Canvas("my-canvas");
    let drawingObjectGenerator = new DrawingObjectGenerator(canvas, 40);
    let loop = new Loop(canvas, drawingObjectGenerator.generate());
    loop.start();
}
