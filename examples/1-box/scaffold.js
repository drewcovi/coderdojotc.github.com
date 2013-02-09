// This fix is specific to the htmleditor github project.
// workaround for chrome bug: http://code.google.com/p/chromium/issues/detail?id=35980#c12
if ( window.innerWidth === 0 ) { window.innerWidth = parent.innerWidth; window.innerHeight = parent.innerHeight; }


var boxes = [];

function Box() {
	boxes.push(this);

	this.x = Math.floor($(window).width() / 2);
	this.y = Math.floor($(window).height() / 2);
	this.width = 100;
	this.height = 100;
	this.bgcolor = 'white';

	// The point of this scaffold is to abstract this stuff away from the eyes of the new coder, but they may want to peak under the hood...
	// DOM seems pretty uninviting to new coders... better or worse to use zepto/jquery? to stick with canvas?
	var $box = $('<div></div>');

	$box.css({
		position: 'absolute',
		left: this.x + 'px',
		top: this.y + 'px',
		width: this.width + 'px',
		height: this.height + 'px',
		background: this.bgcolor
	});

	$('body').append($box);




	this.left = function () {
		this.x -= 1; // this.x = this.x - 1

		return this; // allow chaining
	};

	this.right = function () {
		this.x += 1;

		return this;
	};

	this.up = function () {
		this.y -= 1;

		return this;
	};

	this.down = function () {
		this.y += 1;

		return this;
	};

	this.color = function (bgcolor) {
		this.bgcolor = bgcolor;

		return this;
	};

	this.update = function () {
		$box.css({
			left: this.x + 'px',
			top: this.y + 'px',
			width: this.width + 'px',
			height: this.height + 'px',
			background: this.bgcolor
		});
	};
}


setInterval(function () {

	// Will the magic draw() function be too much of a mystery to our learners?
	if (window.draw) {
		window.draw();
	}

	var i = boxes.length;
	while (i--) {
		boxes[i].update();
	}

}, 1000 / 30);