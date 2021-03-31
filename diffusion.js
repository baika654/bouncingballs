"use strict";
//import {Canvas} from "./app.js";
/**
 * Canvas Wrapper Class
 */
class Canvas {
    constructor(id) {
        this.id = id;
        this.canvas = document.getElementById(id);
        this.canvas.width = document.body.clientWidth;
        this.canvas.height = document.body.clientHeight;
        window.addEventListener('resize', this.resizeCanvas.bind(this), false);
    }
    getEl() {
        return this.canvas;
    }
    getContext() {
        return this.canvas.getContext('2d');
    }
    getWidth() {
        return this.canvas.width;
    }
    getHeight() {
        return this.canvas.height;
    }
    resizeCanvas() {
        this.canvas.width = document.body.clientWidth;
        this.canvas.height = document.body.clientHeight;
    }
}
/**
 * Particle Wrapper Class
 */
class Particle {
    constructor(canvas, x, y, velX, velY, color, size) {
        this.canvas = canvas;
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.size = size;
        this.UUID = this.createUUID();
    }
    createUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    setXpos(x) {
        this.x = x;
    }
    setYpos(y) {
        this.y = y;
    }
    setSize(size) {
        this.size = size;
    }
    setVelX(velX) {
        this.velX = velX;
    }
    ;
    setVelY(velY) {
        this.velY = velY;
    }
    getXpos() {
        return this.x;
    }
    getYpos() {
        return this.y;
    }
    getSize() {
        return this.size;
    }
    getVelX() {
        return this.velX;
    }
    ;
    getVelY() {
        return this.velY;
    }
    getUUID() {
        return this.UUID;
    }
    draw() {
        let context = this.canvas.getContext();
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        context.fill();
    }
    update(graphicObject) {
        for (let i = 0; i < graphicObject.length; i++) {
            if (this.UUID !== graphicObject[i].getUUID()) {
                let ballDiff = Math.sqrt(Math.pow(this.x - graphicObject[i].getXpos(), 2) + Math.pow(this.y - graphicObject[i].getYpos(), 2));
                if (ballDiff < (this.size + graphicObject[i].getSize())) {
                    /** Calculate total kinetic energy in X direction
                    let KinX:number = 0.5*Math.pow(this.velX,2) + 0.5*Math.pow(allBalls[i].velX,2) */
                    //let diffAngle:number = Math.asin((allBalls[i].x-this.x)/ballDiff);
                    let diffAngle2 = Math.atan2((graphicObject[i].getXpos() - this.x), (graphicObject[i].getYpos() - this.y));
                    //console.log("diffAngle = ", diffAngle, "diffAngle2 = ", diffAngle2, "X1 vector:" , (this.velX>0 ? '+':'-'), " Y1 vector:", (this.velY>0 ? '+':'-'), "X2 vector:" ,(allBalls[i].velX>0 ? '+':'-'), " Y2 vector:",(allBalls[i].velY>0 ? '+':'-'));
                    let dx = this.x - graphicObject[i].getXpos();
                    let dy = this.y - graphicObject[i].getYpos();
                    let normalX = dx / ballDiff;
                    let normalY = dy / ballDiff;
                    let midpointX = (graphicObject[i].getXpos() + this.x) / 2;
                    let midpointY = (graphicObject[i].getYpos() + this.y) / 2;
                    graphicObject[i].setXpos(midpointX - normalX * graphicObject[i].getSize());
                    graphicObject[i].setYpos(midpointY - normalY * graphicObject[i].getSize());
                    this.x = midpointX + normalX * this.size;
                    this.y = (midpointY + normalY * this.size);
                    // Rotate colliding balls
                    let velXBall1 = this.velX * Math.cos(diffAngle2) + this.velY * Math.sin(diffAngle2);
                    let velYBall1 = this.velY * Math.cos(diffAngle2) - this.velX * Math.sin(diffAngle2);
                    let velXBall2 = graphicObject[i].getVelX() * Math.cos(diffAngle2) + graphicObject[i].getVelY() * Math.sin(diffAngle2);
                    let velYBall2 = graphicObject[i].getVelY() * Math.cos(diffAngle2) - graphicObject[i].getVelX() * Math.sin(diffAngle2);
                    let tempVelXBall1 = velXBall1;
                    let tempVelXBall2 = velXBall2;
                    velXBall1 = -tempVelXBall1;
                    velXBall2 = -tempVelXBall2;
                    this.velX = velXBall1 * Math.cos(diffAngle2) - velYBall1 * Math.sin(diffAngle2);
                    this.velY = velYBall1 * Math.cos(diffAngle2) + velXBall1 * Math.sin(diffAngle2);
                    graphicObject[i].setVelX(velXBall2 * Math.cos(diffAngle2) - velYBall2 * Math.sin(diffAngle2));
                    graphicObject[i].setVelY(velYBall2 * Math.cos(diffAngle2) + velXBall2 * Math.sin(diffAngle2));
                    //this.x += this.velX;
                    //this.y += this.velY;
                    //graphicObject[i].setXpos(graphicObject[i].getXpos() + graphicObject[i].getVelX());
                    //graphicObject[i].setYpos(graphicObject[i].getYpos() + graphicObject[i].getVelY());
                    console.log("Collision!");
                }
            }
        }
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
    }
}
/**
 * Main Loop Class
 */
class Loop {
    constructor(canvas, drawingObjectGenerator) {
        this.canvas = canvas;
        this.drawingObjectGenerator = drawingObjectGenerator;
    }
    start() {
        this.canvas.getContext().fillStyle = 'rgba(255,255,255,0.7)';
        this.canvas.getContext().fillRect(0, 0, this.canvas.getWidth(), this.canvas.getHeight());
        for (let particle of this.drawingObjectGenerator.getAll()) {
            particle.draw();
            particle.update(this.drawingObjectGenerator.getAll());
        }
        requestAnimationFrame(this.start.bind(this));
    }
}
class DrawingObjectGenerator {
    constructor(canvas, numberOfParticles = 10, numberOfBlocks = 0) {
        this.drawingobjects = [];
        this.canvas = canvas;
        this.numberOfParticles = numberOfParticles;
        this.numberOfBlocks = numberOfBlocks;
        this.numberOfDrawingObjects = numberOfParticles + numberOfBlocks;
    }
    generate() {
        for (let i = 0; i < this.numberOfParticles; i++) {
            let velocity = this.getRandomVelocity();
            let size = this.getRandomSize();
            /** init a new particle */
            let particle = new Particle(this.canvas, this.getRandomX(size), this.getRandomY(size), velocity, velocity, this.getRandomColor(), size);
            this.add(particle);
        }
        return this;
    }
    add(particle) {
        this.drawingobjects.push(particle);
    }
    getAll() {
        return this.drawingobjects;
    }
    getRandomColor() {
        let hue = Math.floor(Math.random() * 360);
        let pastel = 'hsl(' + hue + ', 100%, 87.5%)';
        return pastel;
    }
    getRandomVelocity() {
        return this.random(2, 4);
    }
    getRandomSize() {
        return this.random(5, 60);
    }
    getRandomX(size) {
        return this.random(size, this.canvas.getWidth() - size);
    }
    getRandomY(size) {
        return this.random(size, this.canvas.getHeight() - size);
    }
    random(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}
function init2() {
    let canvas = new Canvas("my-canvas");
    let drawingObjectGenerator = new DrawingObjectGenerator(canvas, 40);
    let loop = new Loop(canvas, drawingObjectGenerator.generate());
    loop.start();
}
