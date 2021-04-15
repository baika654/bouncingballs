"use strict";
//import {Canvas} from "./app.js";
var Edge;
(function (Edge) {
    Edge[Edge["Right"] = 0] = "Right";
    Edge[Edge["Down"] = 1] = "Down";
    Edge[Edge["Left"] = 2] = "Left";
    Edge[Edge["Top"] = 3] = "Top";
})(Edge || (Edge = {}));
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
 * Box Wrapper Class
 */
class Box {
    constructor(canvas, x, y, color, height, width) {
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
    createUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    draw() {
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
    update(graphicObject) { }
    getXpos() {
        return this.x;
    }
    getYpos() {
        return this.y;
    }
    getSize() {
        return 0;
    }
    getVelX() {
        return 0;
    }
    getVelY() {
        return 0;
    }
    getHeight() {
        return this.height;
    }
    getWidth() {
        return this.width;
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
    setVelY(velY) {
        this.velY = velY;
    }
    setColor(color) {
        this.color = color;
    }
    getUUID() {
        return this.UUID;
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
    setColor(color) {
        this.color = color;
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
    getHeight() {
        return this.size * 2;
    }
    getWidth() {
        return this.size * 2;
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
                if (graphicObject[i] instanceof Particle) {
                    let ballDiff = Math.sqrt(Math.pow(this.x - graphicObject[i].getXpos(), 2) + Math.pow(this.y - graphicObject[i].getYpos(), 2));
                    if (ballDiff < (this.size + graphicObject[i].getSize())) {
                        if (graphicObject[i] instanceof Particle)
                            console.log("The colliding object is a ball");
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
                        let dVector = (graphicObject[i].getVelX() - this.velX) * normalX;
                        dVector += (graphicObject[i].getVelY() - this.velY) * normalY;
                        let dvx = dVector * normalX;
                        let dvy = dVector * normalY;
                        graphicObject[i].setVelX(graphicObject[i].getVelX() - dvx);
                        graphicObject[i].setVelY(graphicObject[i].getVelY() - dvy);
                        this.velX = this.velX + dvx;
                        this.velY = this.velY + dvy;
                    }
                }
                else {
                    // This section deals with box-particle interactions
                    let testX = this.x;
                    let testY = this.y;
                    let boxEdge = Edge.Left;
                    // which edge is closest?
                    if (this.x < graphicObject[i].getXpos()) {
                        testX = graphicObject[i].getXpos(); // test left edge
                        boxEdge = Edge.Left;
                    }
                    else if (this.x > graphicObject[i].getXpos() + graphicObject[i].getWidth()) {
                        testX = graphicObject[i].getXpos() + graphicObject[i].getWidth(); // right edge
                        boxEdge = Edge.Right;
                    }
                    if (this.y < graphicObject[i].getYpos()) {
                        testY = graphicObject[i].getYpos(); // top edge
                        boxEdge = Edge.Top;
                    }
                    else if (this.y > graphicObject[i].getYpos() + graphicObject[i].getHeight()) {
                        testY = graphicObject[i].getYpos() + graphicObject[i].getHeight(); // bottom edge
                        boxEdge = Edge.Down;
                    }
                    // get distance from closest edges
                    let distX = this.x - testX;
                    let distY = this.y - testY;
                    let distance = Math.sqrt((distX * distX) + (distY * distY));
                    if (distance <= this.size) {
                        // Collision detected for single particle
                        let context = this.canvas.getContext();
                        context.beginPath();
                        context.fillStyle = 'rgb(255,0,0)';
                        context.rect(graphicObject[i].getXpos(), graphicObject[i].getYpos(), graphicObject[i].getWidth(), graphicObject[i].getHeight());
                        context.fill();
                        if ((boxEdge == Edge.Top) || (boxEdge == Edge.Down))
                            this.setVelY(-this.getVelY());
                        if ((boxEdge == Edge.Left) || (boxEdge == Edge.Right))
                            this.setVelX(-this.getVelX());
                    }
                    else {
                        // No collision detect for single particle  
                        let context = this.canvas.getContext();
                        context.beginPath();
                        context.fillStyle = 'rgb(255,255,255)';
                        context.rect(graphicObject[i].getXpos(), graphicObject[i].getYpos(), graphicObject[i].getWidth(), graphicObject[i].getHeight());
                        context.fill();
                    }
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
    constructor(canvas, numberOfParticles = 10, numberOfBlocks = 0, mode = 0) {
        this.drawingobjects = [];
        this.canvas = canvas;
        this.numberOfParticles = numberOfParticles;
        this.numberOfBlocks = numberOfBlocks;
        this.numberOfDrawingObjects = numberOfParticles + numberOfBlocks;
        this.mode = mode;
    }
    generate() {
        for (let i = 0; i < this.numberOfParticles; i++) {
            let velocity = this.getRandomVelocity();
            let size = 40; //this.getRandomSize();
            /** init a new particle */
            let particle = new Particle(this.canvas, this.getRandomX(size), this.getRandomY(size), velocity, velocity, this.getRandomColor(), size);
            if (this.mode == 1)
                this.adjustColor(particle);
            this.add(particle);
        }
        let boxCount = 3;
        let boxHeight = (this.canvas.getHeight() - ((boxCount - 1) * 150)) / boxCount;
        for (let i = 0; i < boxCount; i++) {
            let yOffset = i * (boxHeight + 150);
            let membraneBox = new Box(this.canvas, (this.canvas.getWidth() / 2) - 50, yOffset, 'rgb(0,0,0)', boxHeight, 100);
            this.add(membraneBox);
        }
        return this;
    }
    add(loopable) {
        this.drawingobjects.push(loopable);
    }
    adjustColor(particle) {
        if ((particle.getXpos() < (this.canvas.getWidth() / 2)) && (particle.getYpos() < (this.canvas.getHeight() / 2))) {
            particle.setColor('rgb(0,0,255)');
        }
    }
    getAll() {
        return this.drawingobjects;
    }
    getRandomColor() {
        let hue = Math.floor(Math.random() * 360);
        let pastel = 'hsl(' + hue + ', 100%, 87.5%)';
        return 'rgb(255,0,0)'; //pastel;
    }
    getRandomVelocity() {
        return this.random(2, 6) * (Math.random() > 0.5 ? 1 : -1);
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
function init2(mode) {
    let canvas = new Canvas("my-canvas");
    let drawingObjectGenerator = new DrawingObjectGenerator(canvas, 120, 0, mode);
    let loop = new Loop(canvas, drawingObjectGenerator.generate());
    loop.start();
}
