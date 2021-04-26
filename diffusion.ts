//import {Canvas} from "./app.js";

enum HorizontalEdge {
    Down,
    Top,
    Middle
  }

  enum VerticalEdge {
    Right,
    Left,
    Middle
  } 

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
    getHeight(): number;
    getWidth(): number;
    setXpos(x: number): void;
    setYpos(y: number): void;
    setSize(size: number): void; 
    setVelX(velX: number): void;
    setVelY(velY: number): void;
    setColor(color: string):void;
    getUUID(): string;
}
/**
 * Box Wrapper Class
 */

class Box implements Loopable {
    protected canvas: Canvas;
    protected x: number;
    protected y: number;
    protected velX: number;
    protected velY: number;
    protected color: string;
    protected size: number;
    protected UUID: string;
    protected height: number;
    protected width: number;

    constructor(canvas: Canvas, x: number, y: number,  color: string, height: number, width: number) {
        this.canvas = canvas;
        this.x = x;
        this.y = y;
        this.velX = 0;
        this.velY = 0;
        this.color = color;
        this.size = 0;
        this.UUID = this.createUUID();
        this.height = height;
        this.width = width;
        
    }

    createUUID(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
    }

    public draw(): void {
        let context = this.canvas.getContext();

        context.beginPath();
        context.fillStyle = this.color;
        context.rect(this.x, this.y, this.width, this.height);
        //context.fill();
        context.lineWidth = 7;
        context.strokeStyle = 'black';
        context.stroke();
    }
    
    /** 
     * This method does nothing. The box is not moving so it does not need to be updated.
    */

    public update(graphicObject:Loopable[]): void {}
    public getXpos(): number {
        return this.x;
    }
    public getYpos(): number {
        return this.y;
    }
    public getSize(): number {
        return 0;
    } 
    public getVelX(): number {
        return 0;
    }
    public getVelY(): number {
        return 0;
    }
    public getHeight(): number {
        return this.height;
    }
    public getWidth(): number {
        return this.width;
    }
    public setXpos(x: number): void {
        this.x =x;
    }
    public setYpos(y: number): void {
        this.y = y;
    }
    public setSize(size: number): void {
        this.size  = size;
    }
    public setVelX(velX: number): void {
        this.velX = velX;
    }
    public setVelY(velY: number): void {
        this.velY = velY;
    }
    public setColor(color: string):void {
        this.color = color;
    }
    public getUUID(): string {
        return this.UUID;
    }

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

    setColor(color: string): void {
        this.color = color;
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
    public getHeight(): number {
        return this.size*2;
    }
    public getWidth(): number {
        return this.size*2;
    }

    public draw(): void {
        let context = this.canvas.getContext();
        let redBall = <HTMLImageElement> document.getElementById("RedBallImage");
        context.drawImage(redBall, this.x-40, this.y-40, 80, 80);
        
        /**context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        context.fill(); */
    }

    public update(graphicObject:Loopable[]): void {
        for (let i=0; i<graphicObject.length; i++) {
            if (this.UUID!==graphicObject[i].getUUID()) {
                if (graphicObject[i] instanceof Particle) {
                    let ballDiff = Math.sqrt(Math.pow(this.x-graphicObject[i].getXpos(),2)+Math.pow(this.y-graphicObject[i].getYpos(),2));
                    
                    if (ballDiff<(this.size+graphicObject[i].getSize())) {
                            if (graphicObject[i] instanceof Particle) console.log("The colliding object is a ball");
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

                            let dVector:number = (graphicObject[i].getVelX() - this.velX )* normalX;
                            dVector += (graphicObject[i].getVelY() - this.velY) * normalY;
                            let dvx:number = dVector * normalX;
                            let dvy:number = dVector * normalY;
                            graphicObject[i].setVelX(graphicObject[i].getVelX() - dvx);
                            graphicObject[i].setVelY(graphicObject[i].getVelY() - dvy);
                            this.velX=this.velX + dvx;
                            this.velY=this.velY + dvy;



                           
                           
                    }
                } else {
                    // This section deals with box-particle interactions
                    let testX:number = this.x;
                    let testY:number = this.y;

                    
                    let boxVerticalEdge:VerticalEdge = VerticalEdge.Middle;
                    let boxHorizontalEdge:HorizontalEdge=HorizontalEdge.Middle;
                    // which edge is closest?
                    if (this.x < graphicObject[i].getXpos()) {
                        testX = graphicObject[i].getXpos();      // test left edge
                        boxVerticalEdge = VerticalEdge.Left;
                    }   else if (this.x > graphicObject[i].getXpos()+graphicObject[i].getWidth()) {
                        testX = graphicObject[i].getXpos()+graphicObject[i].getWidth();   // right edge
                        boxVerticalEdge = VerticalEdge.Right;
                    }

                    if (this.y < graphicObject[i].getYpos()) {
                        testY = graphicObject[i].getYpos();      // top edge
                        boxHorizontalEdge = HorizontalEdge.Top;
                    } else if (this.y > (graphicObject[i].getYpos()+graphicObject[i].getHeight())) {
                        testY = graphicObject[i].getYpos()+graphicObject[i].getHeight();   // bottom edge
                        boxHorizontalEdge = HorizontalEdge.Down;
                    }

                    // get distance from closest edges
                    let distX:number  = this.x-testX;
                    let distY:number  = this.y-testY;
                    let distance:number = Math.sqrt( (distX*distX) + (distY*distY) );

                    if (distance <= this.size) {
                        // Collision detected for single particle
                        /**let context = this.canvas.getContext();

                        context.beginPath();
                        context.fillStyle = 'rgb(255,0,0)';
                        context.rect(graphicObject[i].getXpos(), graphicObject[i].getYpos(), graphicObject[i].getWidth(), graphicObject[i].getHeight());
                        context.fill();
                        context.fillStyle = 'rgb(0,0,255)'; */

                        if (Math.abs(distX)>Math.abs(distY))
                        {
                            // Vertical Collision
                            /**context.beginPath();
                            context.fillStyle = 'rgb(0,0,255)';
                            context.rect(graphicObject[i].getXpos(), graphicObject[i].getYpos(), 10, graphicObject[i].getHeight());
                            context.fill();
                            context.beginPath();
                            context.fillStyle = 'rgb(0,0,255)';
                            context.rect(graphicObject[i].getXpos()+graphicObject[i].getWidth()-10, graphicObject[i].getYpos(), 10, graphicObject[i].getHeight());// Vertical Collision
                            context.fill(); */
                            // Check for stuckness
                            let Xplus1:number = (this.getXpos()-this.getVelX());
                            let Yplus1:number = (this.getYpos()+this.getVelY());
                            let distXplus1:number  = Xplus1-testX;
                            let distYplus1:number  = Yplus1-testY;
                            let distanceplus1:number = Math.sqrt( (distXplus1*distXplus1) + (distYplus1*distYplus1) );
                            // If stuck, adjust x value accordingly
                            if (distanceplus1 < this.getSize()) {
                                console.log("Ball is stuck in vertical sides. Adjusting");
                                if (boxVerticalEdge==VerticalEdge.Left) {
                                    this.setXpos(testX-this.getSize())
                                }
                                if (boxVerticalEdge==VerticalEdge.Right) {
                                    this.setXpos(testX+this.getSize())
                                }
                            }
                            this.setVelX(-this.getVelX());
                        } else {
                            // Horizonal Collision
                            /**context.beginPath();
                            context.fillStyle = 'rgb(0,0,255)';
                            context.rect(graphicObject[i].getXpos(), graphicObject[i].getYpos(), graphicObject[i].getWidth(), 10);
                            context.fill();
                            context.beginPath();
                            context.fillStyle = 'rgb(0,0,255)';
                            context.rect(graphicObject[i].getXpos(), graphicObject[i].getYpos()+graphicObject[i].getHeight()-10, graphicObject[i].getWidth(), 10);// Vertical Collision
                            context.fill(); */
                            // Check for stuckness
                            let Xplus1:number = (this.getXpos()+this.getVelX());
                            let Yplus1:number = (this.getYpos()-this.getVelY());
                            let distXplus1:number  = Xplus1-testX;
                            let distYplus1:number  = Yplus1-testY;
                            let distanceplus1:number = Math.sqrt( (distXplus1*distXplus1) + (distYplus1*distYplus1) );
                            if (distanceplus1 < this.getSize()) {
                                console.log("Ball is stuck in horizontal sides. Adjusting.");
                                if (boxHorizontalEdge==HorizontalEdge.Top) {
                                    this.setYpos(testY-this.getSize())
                                }
                                if (boxHorizontalEdge==HorizontalEdge.Down) {
                                    this.setYpos(testY+this.getSize())
                                }
                            }
                            this.setVelY(-this.getVelY());
                        }

                        /** //if ((Math.abs(this.y-graphicObject[i].getYpos())<this.getSize())&&(Math.abs(this.x-graphicObject[i].getXpos())<this.getSize())) {
                            if ((boxHorizontalEdge==HorizontalEdge.Top)&&(boxVerticalEdge==VerticalEdge.Left)) {
                                //console.log(Math.atan2(this.y-graphicObject[i].getYpos(), this.x-graphicObject[i].getXpos()) + " X:" + (this.x-graphicObject[i].getXpos()) + " Y:" + (this.y-graphicObject[i].getYpos()));
                                if ((Math.abs(this.y-graphicObject[i].getYpos())<this.getSize())&&(Math.abs(this.x-graphicObject[i].getXpos())<this.getSize())) {
                                    if  (Math.abs(this.x-graphicObject[i].getXpos())>Math.abs(this.y-graphicObject[i].getYpos())) {
                                        this.setVelX(-this.getVelX());
                                        // Do a quick check for validity.
                                        if (Math.sqrt(Math.pow(((this.x+this.getVelX())-graphicObject[i].getXpos()),2)+Math.pow(((this.y+this.getVelY())-graphicObject[i].getYpos()),2))<this.getSize()) {
                                            console.log("Cannot bounce out");
                                            let xAdjust:number= Math.sqrt(Math.pow((this.getSize()*1.02),2)-Math.pow(((this.y+this.getVelY())-graphicObject[i].getYpos()),2))-Math.abs((this.x+this.getVelX())-graphicObject[i].getXpos());
                                            if (this.getVelX()>0) {
                                                this.setXpos((this.getXpos()+xAdjust));
                                            } else {
                                                this.setXpos((this.getXpos()-xAdjust));
                                            }
                                        }
                                    } else {
                                        this.setVelY(-this.getVelY());
                                        // Do a quick check for validity.
                                        if (Math.sqrt(Math.pow(((this.x+this.getVelX())-graphicObject[i].getXpos()),2)+Math.pow(((this.y+this.getVelY())-graphicObject[i].getYpos()),2))<this.getSize()) {
                                            console.log("Cannot bounce out");
                                            let yAdjust:number= Math.sqrt(Math.pow((this.getSize()*1.02),2)-Math.pow(((this.x+this.getVelX())-graphicObject[i].getXpos()),2))-Math.abs((this.y+this.getVelY())-graphicObject[i].getYpos());
                                            if (this.getVelY()>0) {
                                                this.setYpos((this.getYpos()+yAdjust));
                                            } else {
                                                this.setYpos((this.getYpos()-yAdjust));
                                            }
                                        }
                                    }
                                } else {
                                    console.log("Not a corner case (TOP/LEFT)");
                                    if (Math.abs(this.x-graphicObject[i].getXpos())<this.getSize()) {
                                        console.log("Changing sign of X velocity");
                                        this.setVelX(-this.getVelX());
                                    }
                                    if (Math.abs(this.y-graphicObject[i].getYpos())<this.getSize()) {
                                        console.log("Changing sign of Y velocity");
                                        this.setVelY(-this.getVelY());
                                    }
                                }
                            }

                            if ((boxHorizontalEdge==HorizontalEdge.Top)&&(boxVerticalEdge==VerticalEdge.Right)) {
                                
                                //console.log(Math.atan2(this.y-graphicObject[i].getYpos(), this.x-graphicObject[i].getXpos()) + " X:" + (this.x-(graphicObject[i].getXpos()+graphicObject[i].getWidth())) + " Y:" + (this.y-graphicObject[i].getYpos()));
                                if ((Math.abs(this.y-graphicObject[i].getYpos())<this.getSize())&&(Math.abs(this.x-(graphicObject[i].getXpos()+graphicObject[i].getWidth()))<this.getSize())) {
                                    if  (Math.abs(this.x-(graphicObject[i].getXpos()+graphicObject[i].getWidth()))>Math.abs(this.y-graphicObject[i].getYpos())) {
                                        this.setVelX(-this.getVelX());
                                        // Do a quick check for validity.
                                        console.log("Doing a test for Validity. (TOP/RIGHT)");
                                        if (Math.sqrt(Math.pow(((this.x+this.getVelX())-(graphicObject[i].getXpos()+graphicObject[i].getWidth())),2)+Math.pow(((this.y+this.getVelY())-(graphicObject[i].getYpos()+graphicObject[i].getHeight())),2))<this.getSize()) {
                                            console.log("Cannot bounce out");
                                            console.log("Adjusting X value");
                                            let xAdjust:number= Math.sqrt(Math.pow((this.getSize()*1.02),2)-Math.pow(((this.y+this.getVelY())-(graphicObject[i].getYpos()+graphicObject[i].getHeight())),2))-Math.abs((this.x+this.getVelX())-(graphicObject[i].getXpos()+graphicObject[i].getWidth()));
                                            if (this.getVelX()>0) {
                                                this.setXpos((this.getXpos()+xAdjust));
                                            } else {
                                                this.setXpos((this.getXpos()-xAdjust));
                                            }
                                        }
                                    } else {
                                        this.setVelY(-this.getVelY());
                                        // Do a quick check for validity.
                                        console.log("Doing a test for Validity. (TOP/RIGHT)");
                                        if (Math.sqrt(Math.pow(((this.x+this.getVelX())-graphicObject[i].getXpos()),2)+Math.pow(((this.y+this.getVelY())-graphicObject[i].getYpos()),2))<this.getSize()) {
                                            console.log("Cannot bounce out");
                                            console.log("Adjusting Y value");
                                            let yAdjust:number= Math.sqrt(Math.pow((this.getSize()*1.02),2)-Math.pow(((this.x+this.getVelX())-graphicObject[i].getXpos()),2))-Math.abs((this.y+this.getVelY())-graphicObject[i].getYpos());
                                            if (this.getVelY()>0) {
                                                this.setYpos((this.getYpos()+yAdjust));
                                            } else {
                                                this.setYpos((this.getYpos()-yAdjust));
                                            }
                                        }

                                    }
                                } 
                            }

                            if ((boxHorizontalEdge==HorizontalEdge.Down)&&(boxVerticalEdge==VerticalEdge.Left)) {
                                //console.log(Math.atan2(this.y-graphicObject[i].getYpos(), this.x-graphicObject[i].getXpos()) + " X:" + (this.x-graphicObject[i].getXpos()) + " Y:" + (this.y-(graphicObject[i].getYpos()+graphicObject[i].getHeight())));
                                if ((Math.abs(this.y-(graphicObject[i].getYpos()+graphicObject[i].getHeight()))<this.getSize())&&(Math.abs(this.x-graphicObject[i].getXpos())<this.getSize())) {
                                    if  (Math.abs(this.x-graphicObject[i].getXpos())>Math.abs(this.y-(graphicObject[i].getYpos()+graphicObject[i].getHeight()))) {
                                        this.setVelX(-this.getVelX());
                                        // Do a quick check for validity.
                                        console.log("Doing a test for Validity. (DOWN/LEFT)");
                                        if (Math.sqrt(Math.pow(((this.x+this.getVelX())-graphicObject[i].getXpos()),2)+Math.pow(((this.y+this.getVelY())-graphicObject[i].getYpos()),2))<this.getSize()) {
                                            console.log("Cannot bounce out");
                                            console.log("Adjusting X value");
                                            let xAdjust:number= Math.sqrt(Math.pow((this.getSize()*1.02),2)-Math.pow(((this.y+this.getVelY())-graphicObject[i].getYpos()),2))-Math.abs((this.x+this.getVelX())-graphicObject[i].getXpos());
                                            if (this.getVelX()>0) {
                                                this.setXpos((this.getXpos()+xAdjust));
                                            } else {
                                                this.setXpos((this.getXpos()-xAdjust));
                                            }
                                        }
                                    } else {
                                        this.setVelY(-this.getVelY());
                                        console.log("Doing a test for Validity. (DOWN/LEFT)");
                                        if (Math.sqrt(Math.pow(((this.x+this.getVelX())-(graphicObject[i].getXpos()+graphicObject[i].getWidth())),2)+Math.pow(((this.y+this.getVelY())-(graphicObject[i].getYpos()+graphicObject[i].getHeight())),2))<this.getSize()) {
                                            console.log("Cannot bounce out");
                                            console.log("Adjusting Y value");
                                            let yAdjust:number= Math.sqrt(Math.pow((this.getSize()*1.02),2)-Math.pow(((this.x+this.getVelX())-(graphicObject[i].getXpos()+graphicObject[i].getWidth())),2))-Math.abs((this.y+this.getVelY())-(graphicObject[i].getYpos()+graphicObject[i].getHeight()));
                                            if (this.getVelY()>0) {
                                                this.setYpos((this.getYpos()+yAdjust));
                                            } else {
                                                this.setYpos((this.getYpos()-yAdjust));
                                            }
                                        }
                                    }
                                } else {
                                    console.log("Not a corner case");
                                    if (Math.abs(this.x-graphicObject[i].getXpos())<this.getSize()) {
                                        console.log("Changing sign of X velocity");
                                        this.setVelX(-this.getVelX());
                                    }
                                    if (Math.abs(this.y-(graphicObject[i].getYpos()+graphicObject[i].getHeight()))<this.getSize()) {
                                        console.log("Changing sign of Y velocity");
                                        this.setVelY(-this.getVelY());
                                    }
                                }
                            }
                            if ((boxHorizontalEdge==HorizontalEdge.Down)&&(boxVerticalEdge==VerticalEdge.Right)) {
                                //console.log(Math.atan2(this.y-graphicObject[i].getYpos(), this.x-graphicObject[i].getXpos()) + " X:" + (this.x-(graphicObject[i].getXpos()+graphicObject[i].getWidth())) + " Y:" + (this.y-(graphicObject[i].getYpos()+graphicObject[i].getHeight())));
                                if ((Math.abs(this.y-(graphicObject[i].getYpos()+graphicObject[i].getHeight()))<this.getSize())&&(Math.abs(this.x-(graphicObject[i].getXpos()+graphicObject[i].getWidth()))<this.getSize())) {
                                    if  (Math.abs(this.x-(graphicObject[i].getXpos()+graphicObject[i].getWidth()))>Math.abs(this.y-(graphicObject[i].getYpos()+graphicObject[i].getHeight()))) {
                                        this.setVelX(-this.getVelX());
                                        // Do a quick check for validity.
                                        console.log("Doing a test for Validity. (DOWN/RIGHT)");
                                        if (Math.sqrt(Math.pow(((this.x+this.getVelX())-(graphicObject[i].getXpos()+graphicObject[i].getWidth())),2)+Math.pow(((this.y+this.getVelY())-(graphicObject[i].getYpos()+graphicObject[i].getHeight())),2))<this.getSize()) {
                                            console.log("Cannot bounce out");
                                            console.log("Adjusting X value");
                                            let xAdjust:number= Math.sqrt(Math.pow((this.getSize()*1.02),2)-Math.pow(((this.y+this.getVelY())-(graphicObject[i].getYpos()+graphicObject[i].getHeight())),2))-Math.abs((this.x+this.getVelX())-(graphicObject[i].getXpos()+graphicObject[i].getWidth()));
                                            if (this.getVelX()>0) {
                                                this.setXpos((this.getXpos()+xAdjust));
                                            } else {
                                                this.setXpos((this.getXpos()-xAdjust));
                                            }
                                        }
                                    } else {
                                        this.setVelY(-this.getVelY());
                                        // Do a quick check for validity.
                                        console.log("Doing a test for Validity. (DOWN/RIGHT)");
                                        if (Math.sqrt(Math.pow(((this.x+this.getVelX())-(graphicObject[i].getXpos()+graphicObject[i].getWidth())),2)+Math.pow(((this.y+this.getVelY())-(graphicObject[i].getYpos()+graphicObject[i].getHeight())),2))<this.getSize()) {
                                            console.log("Cannot bounce out");
                                            console.log("Adjusting Y value");
                                            let yAdjust:number= Math.sqrt(Math.pow((this.getSize()*1.02),2)-Math.pow(((this.x+this.getVelX())-(graphicObject[i].getXpos()+graphicObject[i].getWidth())),2))-Math.abs((this.y+this.getVelY())-(graphicObject[i].getYpos()+graphicObject[i].getHeight()));
                                            if (this.getVelY()>0) {
                                                this.setYpos((this.getYpos()+yAdjust));
                                            } else {
                                                this.setYpos((this.getYpos()-yAdjust));
                                            }
                                        }
                                    }
                                }
                            } */
                        /** } else {
                            if (Math.abs(this.x-graphicObject[i].getXpos())<this.getSize()) {
                                this.setVelX(-this.getVelX());
                            }
                            if (Math.abs(this.x-(graphicObject[i].getXpos()+graphicObject[i].getWidth()))<this.getSize()) {
                                this.setVelX(-this.getVelX());
                            }
                            if (Math.abs(this.y-graphicObject[i].getYpos())<this.getSize()) {
                                this.setVelY(-this.getVelY());
                            }
                            if (Math.abs(this.y-(graphicObject[i].getYpos()+graphicObject[i].getHeight()))<this.getSize()) {
                                this.setVelY(-this.getVelY());
                            }
                        } */ 
                        /**if ((boxEdge==Edge.Top)||(boxEdge==Edge.Down)) {
                            this.setVelY(-this.getVelY());
                            console.log("Up/Down")
                        }
                        if ((boxEdge==Edge.Left)||(boxEdge==Edge.Right)) {
                            this.setVelX(-this.getVelX());
                            console.log("Left/Right")
                        } */
                    } else {
                        // No collision detect for single particle  
                        /**let context = this.canvas.getContext();

                        context.beginPath();
                        context.fillStyle = 'rgb(255,255,255)';
                        context.rect(graphicObject[i].getXpos(), graphicObject[i].getYpos(), graphicObject[i].getWidth(), graphicObject[i].getHeight());
                        context.fill(); */
                    }
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
    protected mode: number;

    constructor(canvas: Canvas, numberOfParticles: number = 10, numberOfBlocks: number = 0, mode: number = 0) {
        this.canvas = canvas;
        this.numberOfParticles = numberOfParticles;
        this.numberOfBlocks = numberOfBlocks;
        this.numberOfDrawingObjects = numberOfParticles + numberOfBlocks;
        this.mode = mode;
    }

    public generate(): DrawingObjectGenerator {
        for(let i = 0; i < this.numberOfParticles; i++) {
            let velocity: number = this.getRandomVelocity();
            let size: number = 40; //this.getRandomSize();
            /** init a new particle */
            let particle = new Particle(this.canvas, this.getRandomX(size), this.getRandomY(size), velocity, velocity, this.getRandomColor(), size);
            //let particle = new Particle(this.canvas, 50, 50, 2.5, 2.2, this.getRandomColor(), size);
            if (this.mode>=1) this.adjustColor(particle, this.mode);
            this.add(particle);
        }
        if (this.mode==2) {
            let boxCount:number = 3;
            let boxHeight:number= (this.canvas.getHeight()-((boxCount-1)*150))/boxCount;
            for(let i = 0; i< boxCount; i++) {
                let yOffset:number = i*(boxHeight + 150)
                let membraneBox = new Box(this.canvas, (this.canvas.getWidth()/2)-50, yOffset, 'rgb(0,0,0)', boxHeight, 100);
                this.add(membraneBox);
            }
        }
        return this;
    }

    protected add(loopable: Loopable): void {
        this.drawingobjects.push(loopable);
    }

    public adjustColor(particle:Particle, mode:number) {
        if (mode==1) {
            if ((particle.getXpos()<(this.canvas.getWidth()/2))&&(particle.getYpos()<(this.canvas.getHeight()/2))) {
                particle.setColor('rgb(0,0,255)');
            }
        }
        if (mode==2) {
            if (particle.getXpos()<(this.canvas.getWidth()/2)) {
                particle.setColor('rgb(0,0,255)');
            }
        }
    }
    
    public getAll(): Loopable[] {
        return this.drawingobjects;
    }

    protected getRandomColor(): string {
        let hue = Math.floor(Math.random() * 360);
        let pastel = 'hsl(' + hue + ', 100%, 87.5%)';
        return 'rgb(255,0,0)'; //pastel;
    }

    protected getRandomVelocity(): number {
        return this.random(2, 6)*(Math.random() > 0.5 ? 1:-1);
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

function init2(mode:number): void {
    let canvas = new Canvas("my-canvas");
    let drawingObjectGenerator = new DrawingObjectGenerator(canvas, 120, 0, mode);
    let loop = new Loop(canvas, drawingObjectGenerator.generate());
    loop.start();
}
