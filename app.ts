// http://www.jeffreythompson.org/collision-detection/circle-rect.php


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
    update(): void;
}

class Square implements Loopable {
    protected canvas: Canvas;
    protected x: number;
    protected y: number;
    protected sqHeight: number;
    protected sqWidth: number;
    protected color: string;
    

    constructor(canvas: Canvas, x: number, y: number, sqHeight: number, sqWidth: number, color: string) {
        this.canvas = canvas;
        this.x = x;
        this.y = y;
        this.sqHeight = sqHeight;
        this.sqWidth = sqWidth;
        this.color = color;
        
    }

    public draw(): void {
        let context = this.canvas.getContext();

        context.beginPath();
        context.fillStyle = this.color;
        context.rect(this.x, this.y, this.sqWidth, this.sqHeight);
        context.stroke();
        
    }

    public update(): void {

    }
}


/**
 * Ball Wrapper Class
 */
class Ball implements Loopable {
    protected canvas: Canvas;
    protected x: number;
    protected y: number;
    protected velX: number;
    protected velY: number;
    protected color: string;
    protected size: number;
    protected UUID: string;
    protected isValidBall: boolean;
    

    constructor(canvas: Canvas, x: number, y: number, velX: number, velY: number, color: string, size: number, isValidBall: boolean) {
        this.canvas = canvas;
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.size = size;
        this.UUID = this.createUUID();
        this.isValidBall = isValidBall;
        if ((this.x<(canvas.getWidth()/2))&&(this.y<(canvas.getHeight()/2))) {
            this.color = 'rgb(0,0,255)';
            
        }
    }

    public draw(): void {
        let context = this.canvas.getContext();

        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        context.fill();
    }

    public update(): void {
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

/** This update function checks that balls that hit each other bounce away from each other */

public update2(allBalls:Ball[]): void {
        
    for (let i=0; i<allBalls.length; i++) {
        for (let j = i+1; j<allBalls.length; j++) {
            if (this.UUID!==allBalls[i].UUID) {
                let ballDiff = Math.sqrt(Math.pow(allBalls[j].x-allBalls[i].x,2)+Math.pow(allBalls[j].y-allBalls[i].y,2));
                if (ballDiff<(allBalls[j].size+allBalls[i].size)) {
                    /** The next step is to check whether flipping the x and y velocities of the balls is appropriate. This routine calculates the next step. If distance shortens, 
                     * then ball velocities are flipped.
                     */
                    let tempX1:number  = this.x + (this.velX/20);
                    let tempY1:number = this.y + (this.velY/20);
                    let tempX2:number  = allBalls[i].x + (allBalls[i].velX/20);
                    let tempY2:number = allBalls[i].y + (allBalls[i].velY/20);
                    let calcBallDiff: number = Math.sqrt(Math.pow(tempX1-tempX2,2)+Math.pow(tempY1-tempY2,2));
                    if (true) /**  (calcBallDiff < ballDiff) */ {
                        /** Calculate total kinetic energy in X direction 
                        let KinX:number = 0.5*Math.pow(this.velX,2) + 0.5*Math.pow(allBalls[i].velX,2)
                        let diffAngle:number = Math.asin((allBalls[i].x-this.x)/ballDiff);
                        let totalVelX:number = this.velX-allBalls[i].velX;
                        let totalVelY:number = this.velY-allBalls[i].velY;
                        let totalVelAngle:number = Math.atan(totalVelY/totalVelX);
                        
                        let allBallsAngle:number = totalVelAngle - diffAngle;
                        if (allBallsAngle>(Math.PI/2)) {
                            allBallsAngle = totalVelAngle + diffAngle;
                        }
                        let localAngle:number = Math.acos((totalVelX-(totalVelX*Math.cos(allBallsAngle)))/totalVelX);
                        let localAngleRatio:number  = (totalVelX-(totalVelX*Math.cos(allBallsAngle)))/totalVelX
                        console.log("diffAngle = ", diffAngle, " , totalVelX = " , totalVelX , " , totalVelY = " , totalVelY , " , totalVelAngle = " , totalVelAngle );
                        console.log("allBallsAngle = ", allBallsAngle , " , localAngle = ", localAngle , " , localAngleRatio = " + localAngleRatio);
                        this.velX = totalVelX*Math.cos(localAngle) + allBalls[i].velX;; //((this.velX+allBalls[i].velX)/2)-(this.velX);
                        this.velY = totalVelY*Math.cos(localAngle) + allBalls[i].velY;;//((this.velY+allBalls[i].velY)/2)-(this.velY);
                        allBalls[i].velX = totalVelX*Math.cos(allBallsAngle) + allBalls[i].velX;;//((this.velX+allBalls[i].velX)/2)-(allBalls[i].velX);
                        allBalls[i].velY = totalVelY*Math.cos(allBallsAngle) + allBalls[i].velY;;//((this.velY+allBalls[i].velY)/2)-(allBalls[i].velY);
                        */
                    /** Calculate total kinetic energy in X direction
                        let KinX:number = 0.5*Math.pow(this.velX,2) + 0.5*Math.pow(allBalls[i].velX,2) */
                        //let diffAngle:number = Math.asin((allBalls[i].x-this.x)/ballDiff);
                        let diffAngle2:number = Math.atan2((allBalls[i].x-allBalls[j].x),(allBalls[i].y-allBalls[j].y));
                        //console.log("diffAngle = ", diffAngle, "diffAngle2 = ", diffAngle2, "X1 vector:" , (this.velX>0 ? '+':'-'), " Y1 vector:", (this.velY>0 ? '+':'-'), "X2 vector:" ,(allBalls[i].velX>0 ? '+':'-'), " Y2 vector:",(allBalls[i].velY>0 ? '+':'-'));
                        
                        // Rotate colliding balls
                        let velXBall1:number = allBalls[j].velX*Math.cos(diffAngle2)+allBalls[j].velY*Math.sin(diffAngle2);
                        let velYBall1:number = allBalls[j].velY*Math.cos(diffAngle2)-allBalls[j].velX*Math.sin(diffAngle2);
                        let velXBall2:number = allBalls[i].velX*Math.cos(diffAngle2)+allBalls[i].velY*Math.sin(diffAngle2);
                        let velYBall2:number = allBalls[i].velY*Math.cos(diffAngle2)-allBalls[i].velX*Math.sin(diffAngle2);

                        let tempVelXBall1:number = velXBall2;
                        let tempVelXBall2:number = velXBall1;

                        velXBall1 = -tempVelXBall2;
                        velXBall2 = -tempVelXBall1;
                        
                        allBalls[j].velX = velXBall1*Math.cos(diffAngle2)-velYBall1*Math.sin(diffAngle2);
                        allBalls[j].velY = velYBall1*Math.cos(diffAngle2)+velXBall1*Math.sin(diffAngle2);
                        allBalls[i].velX = velXBall2*Math.cos(diffAngle2)-velYBall2*Math.sin(diffAngle2);
                        allBalls[i].velY = velYBall2*Math.cos(diffAngle2)+velXBall2*Math.sin(diffAngle2);

                        allBalls[j].x += allBalls[j].velX;
                        allBalls[j].y += allBalls[j].velY;
                        allBalls[i].x += allBalls[i].velX;
                        allBalls[i].y += allBalls[i].velY;
                        //let totalVelX:number = this.velX-allBalls[i].velX;
                        //let totalVelY:number = this.velY-allBalls[i].velY;
                        //let totalVelAngle:number = Math.atan(totalVelY/totalVelX);
                        //let allBallsAngle:number = totalVelAngle - diffAngle2;
                        //let localAngle:number = Math.acos((totalVelX-(totalVelX*Math.cos(allBallsAngle)))/totalVelX);
                        //console.log("diffAngle = ", diffAngle, " , totalVelX = " , totalVelX , " , totalVelY = " , totalVelY , " , totalVelAngle = " , totalVelAngle );
                        //this.velX = totalVelX*Math.cos(localAngle) + allBalls[i].velX;; //((this.velX+allBalls[i].velX)/2)-(this.velX);
                        //this.velY = totalVelY*Math.cos(localAngle) + allBalls[i].velY;;//((this.velY+allBalls[i].velY)/2)-(this.velY);
                        //allBalls[i].velX = totalVelX*Math.cos(allBallsAngle) + allBalls[i].velX;;//((this.velX+allBalls[i].velX)/2)-(allBalls[i].velX);
                        //allBalls[i].velY = totalVelY*Math.cos(allBallsAngle) + allBalls[i].velY;;//((this.velY+allBalls[i].velY)/2)-(allBalls[i].velY); 
                        
                        console.log("Collision!");
                        /** 
                        let dx:number = allBalls[i].x - this.x;
                        let dy:number = allBalls[i].y - this.y;
                        let angle:number = Math.atan2(dy, dx);
                        let targetX = this.x + Math.cos(angle) * ballDiff;
                        let targetY = this.y + Math.sin(angle) * ballDiff;
                        let ax = (targetX - allBalls[i].x) * 1;
                        let ay = (targetY - allBalls[i].y) * 1;
                        this.velX -= ax;
                        this.velY -= ay;
                        allBalls[i].velX += ax;
                        allBalls[i].velY += ay;*/
                        
                        /**let dx:number = allBalls[i].x - this.x;
                        let dy:number = allBalls[i].y - this.y;
                        let totalVelX:number = this.velX-allBalls[i].velX;
                        let totalVelY:number = this.velY-allBalls[i].velY;
                        let dotProduct:number = dx*totalVelX + dy*totalVelY;
                        let distSquared:number  = dx * dx + dy * dy;
                        let collisionScale:number = dotProduct / distSquared;
                        let xCollision:number = dx * collisionScale;
                        let yCollision:number = dy * collisionScale;
                        //The Collision vector is the speed difference projected on the Dist vector,
                        //thus it is the component of the speed difference needed for the collision.
                        let combinedMass:number = 1 + 1;
                        let collisionWeightA:number = 2 * 1 / combinedMass;
                        let collisionWeightB:number = 2 * 1 / combinedMass;
                        this.velX +=  xCollision;
                        this.velY +=  yCollision;
                        allBalls[i].velX -=  xCollision;
                        allBalls[i].velY -=  yCollision; */

                    }
                }
            }
        }
    }

    /** Check bouncing against wall */

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

    setVelX(velX:number ):void {
        this.velX = velX;
    }

    setVelY(velY:number):void {
        this.velY = velY;
    }

    setXpos(x:number ):void {
        this.x = x;
    }

    setYpos(y:number):void {
        this.y = y;
    }

    getVelX():number {
        return this.velX;
    }

    getVelY():number {
        return this.velY;
    }

    getXpos():number {
        return this.x;
    }

    getYpos():number {
        return this.y;
    }

    getSize():number {
        return this.size;
    }

    getUUID():string {
        return this.UUID;
    }
    
    ballisValid(): void {
        this.isValidBall=true;
    }

    isBallValid(): boolean {
        return this.isValidBall;
    }


    createUUID(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
    }
}

/**
 * Main Loop Class
 */
class Loop {
    protected canvas: Canvas;
    protected ballGenerator: BallGenerator;
    
    constructor(canvas: Canvas, ballGenerator: BallGenerator) {
        this.canvas = canvas;
        this.ballGenerator = ballGenerator;
    }

    public start(): void {
        this.canvas.getContext().fillStyle = 'rgba(255,255,255,0.7)';
        this.canvas.getContext().fillRect(0,0, this.canvas.getWidth(), this.canvas.getHeight());
        let boxHeight:number = (this.canvas.getHeight()-300)/3;
        let ctx = this.canvas.getContext();
        ctx.beginPath;
        ctx.rect((this.canvas.getWidth()/2)-75,0,150,boxHeight);
        ctx.stroke();
        ctx.beginPath;
        ctx.rect((this.canvas.getWidth()/2)-75,150+boxHeight,150,boxHeight);
        ctx.stroke();
        ctx.beginPath;
        ctx.rect((this.canvas.getWidth()/2)-75,300+(2*boxHeight),150,boxHeight);
        ctx.stroke();


        for(let ball of this.ballGenerator.getAll()) {
            ball.draw();
            //ball.update();
            
        }
        this.update(this.ballGenerator.getAll());
        this.checkWithinBounds(this.ballGenerator.getAll());
        
        requestAnimationFrame(this.start.bind(this));
    }

    public checkWithinBounds(allBalls:Ball[]):void {
        /** Check bouncing against wall */
        for (let i=0; i<allBalls.length; i++) {
            if((allBalls[i].getXpos() + allBalls[i].getSize()) >= this.canvas.getWidth()) {
                allBalls[i].setVelX(-allBalls[i].getVelX());
            }

            if((allBalls[i].getXpos() - allBalls[i].getSize()) <= 0) {
                allBalls[i].setVelX(-allBalls[i].getVelX());
            }

            if((allBalls[i].getYpos() + allBalls[i].getSize()) >= this.canvas.getHeight()) {
                allBalls[i].setVelY(-allBalls[i].getVelY());
            }

            if((allBalls[i].getYpos() - allBalls[i].getSize()) <= 0) {
                allBalls[i].setVelY(-allBalls[i].getVelY());
            }

            if (((allBalls[i].getXpos() + allBalls[i].getSize()) >= (this.canvas.getWidth()/2)-75) && ((allBalls[i].getXpos() - allBalls[i].getSize()) <= (this.canvas.getWidth()/2)+75)) {
                if (((allBalls[i].getYpos() - allBalls[i].getSize()) >= (this.canvas.getHeight()-300)/3)&& ((allBalls[i].getYpos() + allBalls[i].getSize()) <= ((this.canvas.getHeight()-300)/3)+150)) {
                    console.log("Ball coming through");
                    if((allBalls[i].getYpos() - allBalls[i].getSize()) <= (this.canvas.getHeight()-300)/3) {
                        console.log("ball going up into SIL");
                        allBalls[i].setYpos(((this.canvas.getHeight()-300)/3)+allBalls[i].getSize());
                        allBalls[i].setVelY(-allBalls[i].getVelY());
                    }
                    if((allBalls[i].getYpos() + allBalls[i].getSize()) >= ((this.canvas.getHeight()-300)/3) +150) {
                        allBalls[i].setVelY(-allBalls[i].getVelY());
                    }

                } else {
                    allBalls[i].setVelX(-allBalls[i].getVelX());
                    if ((allBalls[i].getXpos() + allBalls[i].getSize()) <= (this.canvas.getWidth()/2)) {
                        allBalls[i].setXpos((((this.canvas.getWidth()/2)-75)-allBalls[i].getSize()));                    }

                }

            }

            allBalls[i].setXpos(allBalls[i].getVelX() + allBalls[i].getXpos());
            allBalls[i].setYpos(allBalls[i].getVelY() + allBalls[i].getYpos());
        }
    }

    public update(allBalls:Ball[]): void {
        
        //console.log("Started update");
        for (let i=0; i<allBalls.length; i++) {
            for (let j = i+1; j<allBalls.length; j++) {
                if (allBalls[i].getUUID()!==allBalls[j].getUUID()) {
                    let ballDiff = Math.sqrt(Math.pow(allBalls[j].getXpos()-allBalls[i].getXpos(),2)+Math.pow(allBalls[j].getYpos()-allBalls[i].getYpos(),2));
                    if (ballDiff<(allBalls[j].getSize()+allBalls[i].getSize())) {
                        /** The next step is to check whether flipping the x and y velocities of the balls is appropriate. This routine calculates the next step. If distance shortens, 
                         *then ball velocities are flipped. */
                        let dx:number = allBalls[j].getXpos()-allBalls[i].getXpos();
                        let dy:number = allBalls[j].getYpos()-allBalls[i].getYpos();
                        let normalX:number = dx / ballDiff;
                        let normalY:number = dy / ballDiff;
                        let midpointX:number = (allBalls[i].getXpos() + allBalls[j].getXpos()) / 2;
                        let midpointY:number = (allBalls[i].getYpos() + allBalls[j].getYpos()) / 2;
                        allBalls[i].setXpos(midpointX - normalX * allBalls[i].getSize());
                        allBalls[i].setYpos(midpointY - normalY * allBalls[i].getSize());
                        allBalls[j].setXpos(midpointX + normalX * allBalls[j].getSize());
                        allBalls[j].setYpos(midpointY + normalY * allBalls[j].getSize());
                        let dVector:number = (allBalls[i].getVelX() - allBalls[j].getVelX()) * normalX;
                        dVector += (allBalls[i].getVelY() - allBalls[j].getVelY()) * normalY;
                        let dvx:number = dVector * normalX;
                        let dvy:number = dVector * normalY;
                        allBalls[i].setVelX(allBalls[i].getVelX() - dvx);
                        allBalls[i].setVelY(allBalls[i].getVelY() - dvy);
                        allBalls[j].setVelX(allBalls[j].getVelX() + dvx);
                        allBalls[j].setVelY(allBalls[j].getVelY() + dvy);

                        /**  
                        let tempX1:number  = this.x + (this.velX/20);
                        let tempY1:number = this.y + (this.velY/20);
                        let tempX2:number  = allBalls[i].x + (allBalls[i].velX/20);
                        let tempY2:number = allBalls[i].y + (allBalls[i].velY/20);
                        let calcBallDiff: number = Math.sqrt(Math.pow(tempX1-tempX2,2)+Math.pow(tempY1-tempY2,2)); 
                        if (true) /**  (calcBallDiff < ballDiff) */ {
                            
                        /** Calculate total kinetic energy in X direction
                            let KinX:number = 0.5*Math.pow(this.velX,2) + 0.5*Math.pow(allBalls[i].velX,2) 
                            let diffAngle2:number = Math.atan2((allBalls[i].getXpos()-allBalls[j].getXpos()),(allBalls[i].getYpos()-allBalls[j].getYpos()));
                            //console.log("diffAngle = ", diffAngle, "diffAngle2 = ", diffAngle2, "X1 vector:" , (this.velX>0 ? '+':'-'), " Y1 vector:", (this.velY>0 ? '+':'-'), "X2 vector:" ,(allBalls[i].velX>0 ? '+':'-'), " Y2 vector:",(allBalls[i].velY>0 ? '+':'-'));
                            
                            // Rotate colliding balls
                            let velXBall1:number = allBalls[j].getVelX()*Math.cos(diffAngle2)+allBalls[j].getVelY()*Math.sin(diffAngle2);
                            let velYBall1:number = allBalls[j].getVelY()*Math.cos(diffAngle2)-allBalls[j].getVelX()*Math.sin(diffAngle2);
                            let velXBall2:number = allBalls[i].getVelX()*Math.cos(diffAngle2)+allBalls[i].getVelY()*Math.sin(diffAngle2);
                            let velYBall2:number = allBalls[i].getVelY()*Math.cos(diffAngle2)-allBalls[i].getVelX()*Math.sin(diffAngle2);
    
                            let tempVelXBall1:number = velXBall1;
                            let tempVelXBall2:number = velXBall2;
    
               
                            velXBall1 = -tempVelXBall1;
                            velXBall2 = -tempVelXBall2;
                            
                            allBalls[j].setVelX(velXBall1*Math.cos(diffAngle2)-velYBall1*Math.sin(diffAngle2));
                            allBalls[j].setVelY(velYBall1*Math.cos(diffAngle2)+velXBall1*Math.sin(diffAngle2));
                            allBalls[i].setVelX(velXBall2*Math.cos(diffAngle2)-velYBall2*Math.sin(diffAngle2));
                            allBalls[i].setVelY(velYBall2*Math.cos(diffAngle2)+velXBall2*Math.sin(diffAngle2));
    
                            allBalls[j].setXpos(allBalls[j].getVelX() + allBalls[j].getXpos());
                            allBalls[j].setYpos(allBalls[j].getVelY() + allBalls[j].getYpos());
                            allBalls[i].setXpos(allBalls[i].getVelX() + allBalls[i].getXpos());
                            allBalls[i].setYpos(allBalls[i].getVelY() + allBalls[i].getYpos());
                            
                            */
                        }

                    
                    }
                }
            }
         
        }
    }
}

class BallGenerator {
    protected canvas: Canvas;
    protected balls: Ball[] = [];
    protected numberOfBalls: number;

    constructor(canvas: Canvas, numberOfBalls: number = 10) {
        this.canvas = canvas;
        this.numberOfBalls = numberOfBalls;
    }

    public createValidBall(): Ball {
        let velocity: number = this.getRandomVelocity();
        let size: number = 50; //this.getRandomSize();
        let ball = new Ball(this.canvas, this.getRandomX(size), this.getRandomY(size), velocity*(Math.random() < 0.5 ? -1:1 ), velocity*(Math.random() < 0.5 ? -1:1 ), this.getRandomColor(), size, false);
        if (this.balls.length>0) {
            for (let i=0; i < this.balls.length; i++) {
                if (ball.getUUID()!==this.balls[i].getUUID()) {
                    let balldistance:number  = Math.sqrt(Math.pow(ball.getXpos()-this.balls[i].getXpos(),2) + Math.pow(ball.getYpos()-this.balls[i].getYpos(),2))
                    //console.log("Ball Distance = ", balldistance);
                    //console.log("Combined radii = ", (ball.getSize()+this.balls[i].getSize()))
                    if (balldistance < (ball.getSize()+this.balls[i].getSize())) {
                        //console.log("Balls overlap");
                        return ball;
                    }

                }
                if (i==this.balls.length-1) {
                    //console.log("i loop count = ", i);
                }
            }
        }
        ball.ballisValid();
        //console.log("Ball is added");
        //console.log("Current balls length = ", this.balls.length);
        return ball;
    }
    
    public generate(): BallGenerator {
        let i = 0;
        while (i<this.numberOfBalls) {
            
            let newBall = this.createValidBall();
            if (newBall.isBallValid()) {
                this.add(newBall);
                i++
            }

        }

        return this;
    }

    protected add(ball: Ball): void {
        this.balls.push(ball);
    }

    public getAll(): Ball[] {
        return this.balls;
    }

    protected getRandomColor(): string {
        let hue = Math.floor(Math.random() * 360);
        let pastel = 'rgb(255,0,0)'; //'hsl(' + hue + ', 100%, 87.5%)';
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

function init(): void {
    let canvas = new Canvas("my-canvas");
    let ballGenerator = new BallGenerator(canvas, 5);
    let loop = new Loop(canvas, ballGenerator.generate());
    loop.start();
}



