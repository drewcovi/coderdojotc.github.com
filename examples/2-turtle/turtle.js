var Turtle  =  function ( start_x, start_y ) {
	
	this.points  =  [];
	
	this.x  =  ( start_x || 0 ) * Turtle.DISTANCE;
	this.y  =  ( start_y || 0 ) * Turtle.DISTANCE;
	
	Turtle.list.push( this );
};

Turtle.list      =  [];
Turtle.DISTANCE  =  20;
Turtle.SPEED     =  100;

Turtle.animate  =  function ( ) {
	for ( var i = 0; i < Turtle.list.length; ++i ) {
		Turtle.list[i].animate( );
	}
};

Turtle.init  =  function ( canvas_id ) {

	Turtle.canvas_tag  =  document.getElementById( canvas_id );
	Turtle.canvas      =  Turtle.canvas_tag.getContext( '2d' );
	
	Turtle.canvas.lineWidth  =  1.0;
	Turtle.canvas.lineCap    =  "butt";

	var draw  =  function ( ) {
		Turtle.animate( );
		window.setTimeout( draw, 1000/30 );
	};
	
	draw( );
};

Turtle.prototype  =  {
	
	'animate' :  function ( ) {
		
		if ( this.points.length == 0 ) {
			return;
		}
		
		var next  =  this.next( );
		
		if ( next.x == this.x && next.y == this.y ) {
			this.points.shift( );
			return;
		}
		
		var delta  =  function ( next, current, speed ) {
			if ( next > current ) {
				return Math.min( next - current, speed );
			}
			else if ( next < current ) {
				return Math.max( next - current, -1 * speed );
			}
			else {
				return 0;
			}
		};
		
		var dx  =  delta( next.x, this.x, Turtle.SPEED );
		var dy  =  delta( next.y, this.y, Turtle.SPEED );
		
		Turtle.canvas.moveTo( this.x + Turtle.canvas.lineWidth/2.0, this.y - Turtle.canvas.lineWidth/2.0 );

		this.x  =  this.x + dx;
		this.y  =  this.y + dy;
		
		Turtle.canvas.lineTo( this.x + Turtle.canvas.lineWidth/2.0, this.y - Turtle.canvas.lineWidth/2.0 );
		Turtle.canvas.stroke( );
	},
	
	'last' :  function ( ) {
		if ( this.points.length == 0 ) {
			return { x: this.x, y: this.y };
		}
		
		return this.points[this.points.length-1];
	},
	
	'next' :  function ( ) {
		
		if ( this.points.length == 0 ) {
			return { x: this.x, y: this.y };
		}
		
		return this.points[0];
	},
	
	'new_point_from'  :  function ( reference, dx, dy ) {
		return {
			x: reference.x + dx * Turtle.DISTANCE,
			y: reference.y + dy * Turtle.DISTANCE
		};
	},
	
	'move'  :  function ( dx, dy ) {
		this.points.push( this.new_point_from( this.last( ), dx, dy ) );
		return this;
	},
	
	'up'   :  function ( n ) {
		return this.move( 0, -1 * ( n || 1 ) );
	},
	
	'left' :  function ( n ) {
		return this.move( -1 * ( n || 1), 0 );
	},
	
	'down'  :  function ( n ) {
		return this.move( 0, n || 1 );
	},
	
	'right'  :  function ( n ) {
		return this.move( n || 1, 0 );
	}
};
