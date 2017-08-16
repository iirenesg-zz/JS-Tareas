/**
 * Square constructor
 *
 * @class      Square (name)
 * @param      {object}  context  The canvas context
 */
function Square(context) {
	this.pos = new Vector(getRandom(100, canvas.width-100), getRandom(100, canvas.height-100));
	this.vel = new Vector(getRandom(-5, 5), getRandom(-5, 5));
	this.vel.normal();
	this.vel.mult(10);
	this.size = 100;

	/**
	 * Calls all the functions for each frame
	 *
	 * @param      {array}  array   The array of square objects in the scene
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
		context.rect(this.pos.x, this.pos.y, this.size, this.size);
      	context.fillStyle = 'green';
      	context.fill();
	}

	/**
	 * Checks whether the object is colliding with other object
	 *
	 * @param      {array}  array   The array of square objects in the scene
	 */
	this.checkColissions = function(array) {
		for (var i = array.length - 1; i >= 0; i--) {

			if(array[i] != this) {

				var other = array[i];
				var collision = false;

				if(other.pos.x + other.size > this.pos.x && other.pos.x + other.size < this.pos.x + this.size) {
					if(other.pos.y + other.size > this.pos.y && other.pos.y + other.size < this.pos.y + this.size ||
					other.pos.y < this.pos.y + this.size && other.pos.y > this.pos.y) {
						collision = true;
					}
				} else if(other.pos.x < this.pos.x + this.size && other.pos.x > this.pos.x) {
					if(other.pos.y + other.size > this.pos.y && other.pos.y + other.size < this.pos.y + this.size ||
					other.pos.y < this.pos.y + this.size && other.pos.y > this.pos.y) {
						collision = true;
					}
				}

				if(collision) {
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
		if (this.pos.x + this.size > canvas.width) {
      		this.vel.x *= -1;
    	} else if (this.pos.x < 0) {
      		this.vel.x *= -1;
		} else if (this.pos.y + this.size > canvas.height) {
      		this.vel.y *= -1;
    	} else if (this.pos.y < 0) {
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