/**
 * Circle constructor
 *
 * @class      Circle (name)
 * @param      {object}  context  The canvas context
 */
function Circle(context) {
	this.pos = new Vector(getRandom(100, canvas.width-100), getRandom(100, canvas.height-100));
	this.vel = new Vector(getRandom(-5, 5), getRandom(-5, 5));
	this.vel.normal();
	this.vel.mult(10);
	this.rad = 50;

	/**
	 * Calls all the functions for each frame
	 *
	 * @param      {array}  array   The array of circle objects in the scene
	 */
	this.run = function(array) {
		this.update();
		this.checkColissions(array);
		this.checkEdges();
		this.display();
	}

	/**
	 * Updates position
	 */
	this.update = function() {
		this.pos.add(this.vel);
	}

	/**
	 * Displays object in the scene
	 */
	this.display = function() {
		context.beginPath();
      	context.arc(this.pos.x, this.pos.y, this.rad, 0, 2 * Math.PI, false);
      	context.fillStyle = 'green';
      	context.fill();
	}

	/**
	 * Checks whether the object is colliding with other object
	 *
	 * @param      {array}  array   The array of circle objects in the scene
	 */
	this.checkColissions = function(array) {
		for (var i = array.length - 1; i >= 0; i--) {

			if(array[i] != this) {

				var x = array[i].pos.x - this.pos.x;
				x < 0 ? x = x*-1 : x = x;
				var y = array[i].pos.y - this.pos.y;
				y < 0 ? y = y*-1 : y = y;

				var m = Math.sqrt((x * x) + (y * y));

				if(array[i].rad + this.rad > m) {
					this.vel.mult(-1);
					this.update();
				}
			}
		}
	}

	/**
	 * Checks whether the object is colliding with the scene bounds
	 */
	this.checkEdges = function() {
		if (this.pos.x + this.rad > canvas.width) {
      		this.vel.x *= -1;
    	} else if (this.pos.x - this.rad < 0) {
      		this.vel.x *= -1;
		} else if (this.pos.y + this.rad > canvas.height) {
      		this.vel.y *= -1;
    	} else if (this.pos.y - this.rad < 0) {
      		this.vel.y *= -1;
		}
	}
}

/**
 * Gets a random number from a range
 *
 * @param      {number}  min     The minimum
 * @param      {number}  max     The maximum
 * @return     {number}  The random number.
 */
function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}