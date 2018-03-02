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
    function Ball(canvas, x, y, velX, velY, color, size) {
        this.canvas = canvas;
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.size = size;
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
    return Ball;
}());
/**
 * Main Loop Class
 */
var Loop = /** @class */ (function () {
    function Loop(canvas, ball) {
        this.canvas = canvas;
        this.ball = ball;
    }
    Loop.prototype.start = function () {
        this.canvas.getContext().fillStyle = 'rgba(0,0,0,0.25)';
        this.canvas.getContext().fillRect(0, 0, this.canvas.getWidth(), this.canvas.getHeight());
        this.ball.draw();
        this.ball.update();
        requestAnimationFrame(this.start.bind(this));
    };
    return Loop;
}());
function init() {
    var canvas = new Canvas("my-canvas");
    var ball = new Ball(canvas, 100, 100, 6, 6, '#0000ff', 30);
    var loop = new Loop(canvas, ball);
    loop.start();
}
