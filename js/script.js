var myPen = {};

(function() {
	'use strict';
	// main loop

	this.run = function() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.drawImage(this.img, this.pointer.x - 100, this.pointer.y - 100, 200, 200);

		for (var i = 0; i < this.N; i++) {
			this.particles[i].run();
		}
	}
	
	
	var Particle = function(pen, size) {
		this.pX = (pen.canvas.width * 0.5) + (Math.random() * 200) - 100;
		this.pY = -size - Math.random() * 200;
		this.vX = 0;
		this.vY = Math.random();
		this.size = size;
		this.img = pen.img;
		this.pointer = pen.pointer;
		this.canvas = pen.canvas;
		this.ctx = pen.ctx;
	}

	Particle.prototype.run = function() {
		this.pY += this.vY;
		this.pX += this.vX;
		this.vY += 0.1;

		if (this.pY > this.canvas.height) {
			this.pY = -this.size;
			this.pX = (this.canvas.width * 0.5) + (Math.random() * 200) - 100;
			this.vY = 0;
			this.vX = 0;
		}

		var dx = this.pX - this.pointer.x,
			dy = this.pY - this.pointer.y,
			r = (100 + this.size * 0.5),
			d = dx * dx + dy * dy;

		if (d < r * r) {

			d = Math.sqrt(d);
			dx /= d;
			dy /= d;
			d = (r - d) * 1.1;
			dx *= d;
			dy *= d;

			this.pX += dx;
			this.pY += dy;

			this.vX = 0.5 * dx + ((this.pX >= this.pointer.x) ? 2 : -2);
			this.vY = 0.5 * dy;
		}

		this.ctx.drawImage(this.img, this.pX - this.size * 0.5, this.pY - this.size * 0.5, this.size, this.size);
	}

	// canvas
	this.canvas = {
		elem: document.createElement('canvas'),

		resize: function() {
			this.width = this.elem.width = this.elem.offsetWidth;
			this.height = this.elem.height = this.elem.offsetHeight;
		},

		init: function() {
			var ctx = this.elem.getContext('2d');
			document.body.appendChild(this.elem);
			window.addEventListener('resize', this.resize.bind(this), false);
			this.resize();
			return ctx;
		}
	};

	this.ctx = this.canvas.init();

	// pointer
	this.pointer = (function(canvas) {
		var pointer = {
			x: canvas.width / 2,
			y: canvas.height / 2,
			pointer: function(e) {
				var touchMode = e.targetTouches,
					pointer;
				if (touchMode) {
					e.preventDefault();
					pointer = touchMode[0];
				} else pointer = e;
				this.x = pointer.clientX;
				this.y = pointer.clientY;
			},
		};

		window.addEventListener('mousemove', function(e) {
			this.pointer(e);
		}.bind(pointer), false);
		canvas.elem.addEventListener('touchmove', function(e) {
			this.pointer(e);
		}.bind(pointer), false);
		return pointer;
	}(this.canvas));

	// init
	this.particles = [];
	this.N = 800;
	this.img = new Image();
	this.img.src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/191814/heart_codepen.png';

	for (var i = 0; i < this.N; i++) {
		this.particles[i] = new Particle(this, 35);
	}

	// request animation loop
	var myPen = this;
	(function run() {
		requestAnimationFrame(run);
		myPen.run();
	})();
}).apply(myPen);




