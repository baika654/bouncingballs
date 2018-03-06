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
            ball.update();
        }
        requestAnimationFrame(this.start.bind(this));
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
    BallGenerator.prototype.generate = function () {
        for (var i = 0; i < this.numberOfBalls; i++) {
            var velocity = this.getRandomVelocity();
            var size = this.getRandomSize();
            /** init a new ball */
            var ball = new Ball(this.canvas, this.getRandomX(size), this.getRandomY(size), velocity, velocity, this.getRandomColor(), size);
            this.add(ball);
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
        var pastel = 'hsl(' + hue + ', 100%, 87.5%)';
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
    var ballGenerator = new BallGenerator(canvas, 40);
    var loop = new Loop(canvas, ballGenerator.generate());
    loop.start();
}
