"use strict";
/**
 * Canvas Wrapper Class
 */
var Canvas = /** @class */ (function () {
    function Canvas(id) {
        this.id = id;
        this.canvas = document.getElementById(id);
        this.canvas.width = document.body.clientWidth;
        this.canvas.height = document.body.clientHeight;
        window.addEventListener('resize', this.resizeCanvas.bind(this), false);
    }
    Canvas.prototype.getEl = function () {
        return this.canvas;
    };
    Canvas.prototype.getContext = function () {
        return this.canvas.getContext('2d');
    };
    Canvas.prototype.getWidth = function () {
        return this.canvas.width;
    };
    Canvas.prototype.getHeight = function () {
        return this.canvas.height;
    };
    Canvas.prototype.resizeCanvas = function () {
        this.canvas.width = document.body.clientWidth;
        this.canvas.height = document.body.clientHeight;
    };
    return Canvas;
}());
/**
 * Ball Wrapper Class
 */
var Ball = /** @class */ (function () {
    function Ball(canvas, x, y, velX, velY, color, size, isValidBall) {
        this.canvas = canvas;
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.size = size;
        this.UUID = this.createUUID();
        this.isValidBall = isValidBall;
        if ((this.x < (canvas.getWidth() / 2)) && (this.y < (canvas.getHeight() / 2))) {
            this.color = 'rgb(0,0,255)';
        }
    }
    Ball.prototype.draw = function () {
        var context = this.canvas.getContext();
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        context.fill();
    };
    Ball.prototype.update = function () {
        if ((this.x + this.size) >= this.canvas.getWidth()) {
            this.velX = -(this.velX);
        }
        if ((this.x - this.size) <= 0) {
            this.velX = -(this.velX);
        }
        if ((this.y + this.size) >= this.canvas.getHeight()) {
            this.velY = -(this.velY);
        }
        if ((this.y - this.size) <= 0) {
            this.velY = -(this.velY);
        }
        this.x += this.velX;
        this.y += this.velY;
    };
    /** This update function checks that balls that hit each other bounce away from each other */
    Ball.prototype.update2 = function (allBalls) {
        for (var i = 0; i < allBalls.length; i++) {
            for (var j = i + 1; j < allBalls.length; j++) {
                if (this.UUID !== allBalls[i].UUID) {
                    var ballDiff = Math.sqrt(Math.pow(allBalls[j].x - allBalls[i].x, 2) + Math.pow(allBalls[j].y - allBalls[i].y, 2));
                    if (ballDiff < (allBalls[j].size + allBalls[i].size)) {
                        /** The next step is to check whether flipping the x and y velocities of the balls is appropriate. This routine calculates the next step. If distance shortens,
                         * then ball velocities are flipped.
                         */
                        var tempX1 = this.x + (this.velX / 20);
                        var tempY1 = this.y + (this.velY / 20);
                        var tempX2 = allBalls[i].x + (allBalls[i].velX / 20);
                        var tempY2 = allBalls[i].y + (allBalls[i].velY / 20);
                        var calcBallDiff = Math.sqrt(Math.pow(tempX1 - tempX2, 2) + Math.pow(tempY1 - tempY2, 2));
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
                            var diffAngle2 = Math.atan2((allBalls[i].x - allBalls[j].x), (allBalls[i].y - allBalls[j].y));
                            //console.log("diffAngle = ", diffAngle, "diffAngle2 = ", diffAngle2, "X1 vector:" , (this.velX>0 ? '+':'-'), " Y1 vector:", (this.velY>0 ? '+':'-'), "X2 vector:" ,(allBalls[i].velX>0 ? '+':'-'), " Y2 vector:",(allBalls[i].velY>0 ? '+':'-'));
                            // Rotate colliding balls
                            var velXBall1 = allBalls[j].velX * Math.cos(diffAngle2) + allBalls[j].velY * Math.sin(diffAngle2);
                            var velYBall1 = allBalls[j].velY * Math.cos(diffAngle2) - allBalls[j].velX * Math.sin(diffAngle2);
                            var velXBall2 = allBalls[i].velX * Math.cos(diffAngle2) + allBalls[i].velY * Math.sin(diffAngle2);
                            var velYBall2 = allBalls[i].velY * Math.cos(diffAngle2) - allBalls[i].velX * Math.sin(diffAngle2);
                            var tempVelXBall1 = velXBall2;
                            var tempVelXBall2 = velXBall1;
                            velXBall1 = -tempVelXBall2;
                            velXBall2 = -tempVelXBall1;
                            allBalls[j].velX = velXBall1 * Math.cos(diffAngle2) - velYBall1 * Math.sin(diffAngle2);
                            allBalls[j].velY = velYBall1 * Math.cos(diffAngle2) + velXBall1 * Math.sin(diffAngle2);
                            allBalls[i].velX = velXBall2 * Math.cos(diffAngle2) - velYBall2 * Math.sin(diffAngle2);
                            allBalls[i].velY = velYBall2 * Math.cos(diffAngle2) + velXBall2 * Math.sin(diffAngle2);
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
        if ((this.x + this.size) >= this.canvas.getWidth()) {
            this.velX = -(this.velX);
        }
        if ((this.x - this.size) <= 0) {
            this.velX = -(this.velX);
        }
        if ((this.y + this.size) >= this.canvas.getHeight()) {
            this.velY = -(this.velY);
        }
        if ((this.y - this.size) <= 0) {
            this.velY = -(this.velY);
        }
        this.x += this.velX;
        this.y += this.velY;
    };
    Ball.prototype.setVelX = function (velX) {
        this.velX = velX;
    };
    Ball.prototype.setVelY = function (velY) {
        this.velY = velY;
    };
    Ball.prototype.setXpos = function (x) {
        this.x = x;
    };
    Ball.prototype.setYpos = function (y) {
        this.y = y;
    };
    Ball.prototype.getVelX = function () {
        return this.velX;
    };
    Ball.prototype.getVelY = function () {
        return this.velY;
    };
    Ball.prototype.getXpos = function () {
        return this.x;
    };
    Ball.prototype.getYpos = function () {
        return this.y;
    };
    Ball.prototype.getSize = function () {
        return this.size;
    };
    Ball.prototype.getUUID = function () {
        return this.UUID;
    };
    Ball.prototype.ballisValid = function () {
        this.isValidBall = true;
    };
    Ball.prototype.isBallValid = function () {
        return this.isValidBall;
    };
    Ball.prototype.createUUID = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    return Ball;
}());
/**
 * Main Loop Class
 */
var Loop = /** @class */ (function () {
    function Loop(canvas, ballGenerator) {
        this.canvas = canvas;
        this.ballGenerator = ballGenerator;
    }
    Loop.prototype.start = function () {
        this.canvas.getContext().fillStyle = 'rgba(255,255,255,0.7)';
        this.canvas.getContext().fillRect(0, 0, this.canvas.getWidth(), this.canvas.getHeight());
        for (var _i = 0, _a = this.ballGenerator.getAll(); _i < _a.length; _i++) {
            var ball = _a[_i];
            ball.draw();
            //ball.update();
        }
        this.update(this.ballGenerator.getAll());
        this.checkWithinBounds(this.ballGenerator.getAll());
        requestAnimationFrame(this.start.bind(this));
    };
    Loop.prototype.checkWithinBounds = function (allBalls) {
        /** Check bouncing against wall */
        for (var i = 0; i < allBalls.length; i++) {
            if ((allBalls[i].getXpos() + allBalls[i].getSize()) >= this.canvas.getWidth()) {
                allBalls[i].setVelX(-allBalls[i].getVelX());
            }
            if ((allBalls[i].getXpos() - allBalls[i].getSize()) <= 0) {
                allBalls[i].setVelX(-allBalls[i].getVelX());
            }
            if ((allBalls[i].getYpos() + allBalls[i].getSize()) >= this.canvas.getHeight()) {
                allBalls[i].setVelY(-allBalls[i].getVelY());
            }
            if ((allBalls[i].getYpos() - allBalls[i].getSize()) <= 0) {
                allBalls[i].setVelY(-allBalls[i].getVelY());
            }
            allBalls[i].setXpos(allBalls[i].getVelX() + allBalls[i].getXpos());
            allBalls[i].setYpos(allBalls[i].getVelY() + allBalls[i].getYpos());
        }
    };
    Loop.prototype.update = function (allBalls) {
        console.log("Started update");
        for (var i = 0; i < allBalls.length; i++) {
            for (var j = i + 1; j < allBalls.length; j++) {
                if (allBalls[i].getUUID() !== allBalls[j].getUUID()) {
                    var ballDiff = Math.sqrt(Math.pow(allBalls[j].getXpos() - allBalls[i].getXpos(), 2) + Math.pow(allBalls[j].getYpos() - allBalls[i].getYpos(), 2));
                    if (ballDiff < (allBalls[j].getSize() + allBalls[i].getSize())) {
                        /** The next step is to check whether flipping the x and y velocities of the balls is appropriate. This routine calculates the next step. If distance shortens,
                         *then ball velocities are flipped. */
                        var dx = allBalls[j].getXpos() - allBalls[i].getXpos();
                        var dy = allBalls[j].getYpos() - allBalls[i].getYpos();
                        var normalX = dx / ballDiff;
                        var normalY = dy / ballDiff;
                        var midpointX = (allBalls[i].getXpos() + allBalls[j].getXpos()) / 2;
                        var midpointY = (allBalls[i].getYpos() + allBalls[j].getYpos()) / 2;
                        allBalls[i].setXpos(midpointX - normalX * allBalls[i].getSize());
                        allBalls[i].setYpos(midpointY - normalY * allBalls[i].getSize());
                        allBalls[j].setXpos(midpointX + normalX * allBalls[j].getSize());
                        allBalls[j].setYpos(midpointY + normalY * allBalls[j].getSize());
                        var dVector = (allBalls[i].getVelX() - allBalls[j].getVelX()) * normalX;
                        dVector += (allBalls[i].getVelY() - allBalls[j].getVelY()) * normalY;
                        var dvx = dVector * normalX;
                        var dvy = dVector * normalY;
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
    };
    return Loop;
}());
var BallGenerator = /** @class */ (function () {
    function BallGenerator(canvas, numberOfBalls) {
        if (numberOfBalls === void 0) { numberOfBalls = 10; }
        this.balls = [];
        this.canvas = canvas;
        this.numberOfBalls = numberOfBalls;
    }
    BallGenerator.prototype.createValidBall = function () {
        var velocity = this.getRandomVelocity();
        var size = 50; //this.getRandomSize();
        var ball = new Ball(this.canvas, this.getRandomX(size), this.getRandomY(size), velocity, velocity, this.getRandomColor(), size, false);
        if (this.balls.length > 0) {
            for (var i = 0; i < this.balls.length; i++) {
                if (ball.getUUID() !== this.balls[i].getUUID()) {
                    var balldistance = Math.sqrt(Math.pow(ball.getXpos() - this.balls[i].getXpos(), 2) + Math.pow(ball.getYpos() - this.balls[i].getYpos(), 2));
                    //console.log("Ball Distance = ", balldistance);
                    //console.log("Combined radii = ", (ball.getSize()+this.balls[i].getSize()))
                    if (balldistance < (ball.getSize() + this.balls[i].getSize())) {
                        //console.log("Balls overlap");
                        return ball;
                    }
                }
                if (i == this.balls.length - 1) {
                    console.log("i loop count = ", i);
                }
            }
        }
        ball.ballisValid();
        //console.log("Ball is added");
        //console.log("Current balls length = ", this.balls.length);
        return ball;
    };
    BallGenerator.prototype.generate = function () {
        var i = 0;
        while (i < this.numberOfBalls) {
            var newBall = this.createValidBall();
            if (newBall.isBallValid()) {
                this.add(newBall);
                i++;
            }
        }
        return this;
    };
    BallGenerator.prototype.add = function (ball) {
        this.balls.push(ball);
    };
    BallGenerator.prototype.getAll = function () {
        return this.balls;
    };
    BallGenerator.prototype.getRandomColor = function () {
        var hue = Math.floor(Math.random() * 360);
        var pastel = 'rgb(255,0,0)'; //'hsl(' + hue + ', 100%, 87.5%)';
        return pastel;
    };
    BallGenerator.prototype.getRandomVelocity = function () {
        return this.random(2, 4);
    };
    BallGenerator.prototype.getRandomSize = function () {
        return this.random(5, 60);
    };
    BallGenerator.prototype.getRandomX = function (size) {
        return this.random(size, this.canvas.getWidth() - size);
    };
    BallGenerator.prototype.getRandomY = function (size) {
        return this.random(size, this.canvas.getHeight() - size);
    };
    BallGenerator.prototype.random = function (min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    };
    return BallGenerator;
}());
function init() {
    var canvas = new Canvas("my-canvas");
    var ballGenerator = new BallGenerator(canvas, 60);
    var loop = new Loop(canvas, ballGenerator.generate());
    loop.start();
}
