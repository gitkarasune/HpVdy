

//  BEGIN CANVAS HEARTS  --- Animated hearts forked from Gerard Ferrandez -  https://codepen.io/ge1doot/pen/OypQdy
//  I simply changed the background color and graphic to a heart.   Gerard is amazing.

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

	// particles class

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

// END CANVAS HEARTS


// BEGIN AUDIOO PLAYER

$(function() {

    var audio = $("#player")[0];
    $('#opening_screen').on('click', function() {
        $('#opening_screen').addClass('roEdgeUpOut');
        $('.player_container').toggleClass('hidden roEdgeUpIn');
        togglePlayPause();
    });

    $('#btn-play-pause').on('click', function() {
        togglePlayPause();
    });

    $('#btn-stop').on('click', function() {
        stopAudio();
    });

    $('#btn-mute').on('click', function() {
        toggleMute();
    });

    function togglePlayPause() {
        if (!audio.paused) {
            audio.pause();
            $('#btn-play-pause').children('i').removeClass('fa-pause').addClass('fa-play');
        } else {
            audio.play();
            $('#btn-play-pause').children('i').removeClass('fa-play').addClass('fa-pause');
        }
    }

    function stopAudio() {
        audio.pause();
        audio.currentTime =  0;
        $('#btn-play-pause').children('i').removeClass('fa-pause').addClass('fa-play');
    }

    function toggleMute() {
        if (audio.volume !==  0) {
            audio.volume =  0;
            $('#btn-mute').children('i').removeClass('fa-volume-off').addClass('fa-volume-up');
        } else {
            audio.volume =  1;
            $('#btn-mute').children('i').removeClass('fa-volume-up').addClass('fa-volume-off');
        }
    }

    function updateProgress() {
        var progress = document.getElementById("progress");
        var value =  0;
        if (audio.currentTime >  0) {
            value = Math.floor((100 / audio.duration) * audio.currentTime);
        }
        progress.style.width = value + "%";
    }

    // Progress Bar event listener
    audio.addEventListener("timeupdate", updateProgress, false);

});
// END AUDIOO PLAYER

// BEGIN AUDIO SYNCHING
// Using jQuery to add event listener to the audio element and toggle classes based on the curren time.  

var audioElement = document.getElementById('player');
var lastTime = 0;
audioElement.addEventListener('timeupdate', function(e) {
	var nowTime = this.currentTime;

	//Check if just passed the 1.4 second time mark.
	if (nowTime > 1 && lastTime < 5) {

		$("#peace h2").siblings().addClass('hidden').removeClass('pushSoftOut');
		$("#heart").addClass('hidden').removeClass('pushSoftIn');

	}

	// Wise Mwn Say
	if (nowTime > 7.5 && lastTime < 7.5) {
		$('#wisemensay').toggleClass('pushSoftIn hidden');

	}

	// Only fools rush in

	if (nowTime > 14 && lastTime < 14) {
		$('#onlyfools1').toggleClass('pushSoftIn hidden');
		$('#wisemensay').toggleClass('pushSoftIn pushSoftOut');
	}

	// But I can't help
	if (nowTime > 21 && lastTime < 21) {

		$('#canthelp1').toggleClass('pushSoftIn hidden');
		$('#onlyfools1').toggleClass('pushSoftIn pushSoftOut');
	}

	// Falling in love
	if (nowTime > 27 && lastTime < 27) {

		$('#fallinginlove1').toggleClass('pushSoftIn hidden');
		$('#canthelp1').toggleClass('pushSoftIn pushSoftOut');
	}

	// With you
	if (nowTime > 30 && lastTime < 30) {

		$('#withyou1').toggleClass('pushSoftIn hidden');
		$('#fallinginlove1').toggleClass('pushSoftIn pushSoftOut');
	}

	// Shall I Stay
	if (nowTime > 37 && lastTime < 37) {

		$('#shallistay').toggleClass('pushSoftIn hidden');
		$('#withyou1').toggleClass('pushSoftIn pushSoftOut');
	}

	// Would it be a sin
	if (nowTime > 43 && lastTime < 43) {

		$('#beasin').toggleClass('pushSoftIn hidden');
		$('#shallistay').toggleClass('pushSoftIn pushSoftOut');
	}
	// If I can't help
	if (nowTime > 50 && lastTime < 50) {

		$('#ificanthelp').toggleClass('pushSoftIn hidden');
		$('#beasin').toggleClass('pushSoftIn pushSoftOut');
	}
	//  Falling in Love - 2
	if (nowTime > 56 && lastTime < 56) {

		$('#fallinginlove2').toggleClass('pushSoftIn hidden');
		$('#ificanthelp').toggleClass('pushSoftIn pushSoftOut');
	}
	// With You - 2

	if (nowTime > 59 && lastTime < 59) {

		$('#withyou2').toggleClass('pushSoftIn hidden');
		$('#fallinginlove2').toggleClass('pushSoftIn pushSoftOut');
	}
	// Like a rivere flows
	if (nowTime > 65 && lastTime < 65) {

		$('#likeariver1').toggleClass('pushSoftIn hidden');
		$('#withyou2').toggleClass('pushSoftIn pushSoftOut');
	}
	// Surelt to the sea
	if (nowTime > 69 && lastTime < 69) {

		$('#tothesea1').toggleClass('pushSoftIn hidden');
		$('#likeariver1').toggleClass('pushSoftIn pushSoftOut');
	}

	// Darling so it goes
	if (nowTime > 72 && lastTime < 72) {

		$('#darlingitgoes1').toggleClass('pushSoftIn hidden');
		$('#tothesea1').toggleClass('pushSoftIn pushSoftOut');
	}

	// Some things
	if (nowTime > 75 && lastTime < 75) {

		$('#somethings1').toggleClass('pushSoftIn hidden');
		$('#darlingitgoes1').toggleClass('pushSoftIn pushSoftOut');
	}

	// Are meant to be

	if (nowTime > 78.5 && lastTime < 78.5) {

		$('#meanttobe1').toggleClass('pushSoftIn hidden');
		$('#somethings1').toggleClass('pushSoftIn pushSoftOut');
	}
	// Take my hand
	if (nowTime > 83 && lastTime < 83) {

		$('#takemyhand1').toggleClass('pushSoftIn hidden');
		$('#meanttobe1').toggleClass('pushSoftIn pushSoftOut');
	}
	// Take my whole life too
	if (nowTime > 89 && lastTime < 89) {

		$('#wholelife1').toggleClass('pushSoftIn hidden');
		$('#takemyhand1').toggleClass('pushSoftIn pushSoftOut');
	}
	// For I can't help
	if (nowTime > 96.5 && lastTime < 96.5) {

		$('#foricanthelp1').toggleClass('pushSoftIn hidden');
		$('#wholelife1').toggleClass('pushSoftIn pushSoftOut');
	}
	// Falling in love
	if (nowTime > 102 && lastTime < 102) {

		$('#fallinginlove3').toggleClass('pushSoftIn hidden');
		$('#foricanthelp1').toggleClass('pushSoftIn pushSoftOut');
	}
	// With you - 3
	if (nowTime > 105 && lastTime < 105) {

		$('#withyou3').toggleClass('pushSoftIn hidden');
		$('#fallinginlove3').toggleClass('pushSoftIn pushSoftOut');
	}

	// THIRD VERSE   Like a rivere flows

	if (nowTime > 112 && lastTime < 112) {

		$('#likeariver2').toggleClass('pushSoftIn hidden');
		$('#withyou3').toggleClass('pushSoftIn pushSoftOut');
	}
	// Surely to the sea
	if (nowTime > 115 && lastTime < 115) {

		$('#tothesea2').toggleClass('pushSoftIn hidden');
		$('#likeariver2').toggleClass('pushSoftIn pushSoftOut');
	}

	// Darling so it goes
	if (nowTime > 118.5 && lastTime < 118.5) {

		$('#darlingitgoes2').toggleClass('pushSoftIn hidden');
		$('#tothesea2').toggleClass('pushSoftIn pushSoftOut');
	}

	// Some things
	if (nowTime > 122 && lastTime < 122) {

		$('#somethings2').toggleClass('pushSoftIn hidden');
		$('#darlingitgoes2').toggleClass('pushSoftIn pushSoftOut');
	}

	// Are meant to be

	if (nowTime > 125.5 && lastTime < 125.5) {

		$('#meanttobe2').toggleClass('pushSoftIn hidden');
		$('#somethings2').toggleClass('pushSoftIn pushSoftOut');
	}
	// Take my hand
	if (nowTime > 129 && lastTime < 129) {

		$('#takemyhand2').toggleClass('pushSoftIn hidden');
		$('#meanttobe2').toggleClass('pushSoftIn pushSoftOut');
	}
	// Take my whole life too
	if (nowTime > 135 && lastTime < 135) {

		$('#wholelife2').toggleClass('pushSoftIn hidden');
		$('#takemyhand2').toggleClass('pushSoftIn pushSoftOut');
	}
	// For I can't help
	if (nowTime > 143 && lastTime < 143) {

		$('#foricanthelp2').toggleClass('pushSoftIn hidden');
		$('#wholelife2').toggleClass('pushSoftIn pushSoftOut');
	}

	// Falling in love

	if (nowTime > 147.5 && lastTime < 147.5) {

		$('#fallinginlove4').toggleClass('pushSoftIn hidden');
		$('#foricanthelp2').toggleClass('pushSoftIn pushSoftOut');
	}
	// With you - 3
	if (nowTime > 152 && lastTime < 152) {

		$('#withyou4').toggleClass('pushSoftIn hidden');
		$('#fallinginlove4').toggleClass('pushSoftIn pushSoftOut');
	}

	// For I can't help
	if (nowTime > 156 && lastTime < 156) {

		$('#foricanthelp3').toggleClass('pushSoftIn hidden');
		$('#withyou4').toggleClass('pushSoftIn pushSoftOut');
	}

	// Falling in love

	if (nowTime > 163 && lastTime < 163) {

		$('#fallinginlove5').toggleClass('pushSoftIn hidden');
		$('#foricanthelp3').toggleClass('pushSoftIn pushSoftOut');
	}
	// With you - 3
	if (nowTime > 166 && lastTime < 166) {

		$('#withyou5').toggleClass('pushSoftIn hidden');
		$('#fallinginlove5').toggleClass('pushSoftIn pushSoftOut');
	}
	// With you - 3
	if (nowTime > 175 && lastTime < 175) {

		$('#withyou5').toggleClass('pushSoftIn pushSoftOut');
	}
	if (nowTime > 180 && lastTime < 180) {

		$('#bemine').toggleClass('roEdgeUpIn hidden');

	}
	lastTime = nowTime;
});

