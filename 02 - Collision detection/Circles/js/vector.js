/**
 * Vector constructor
 *
 * @class      Vector (name)
 * @param      {number}  x        x coordinate 
 * @param      {number}  y        y coordinate 
 */
function Vector(x, y) {
	this.x = x;
	this.y = y;

	/**
	 * Adds two vectors
	 *
	 * @param      {object}  v       The other vector object
	 */
	this.add = function(v) {
		this.x = this.x + v.x;
		this.y = this.y + v.y;
	}

	/**
	 * Substracts two vectors
	 *
	 * @param      {object}  v       The other vector object
	 */
	this.sub = function(v) {
		this.x = this.x - v.x;
		this.y = this.y - v.y;
	}

	/**
	 * Multiplies a vector by a number
	 *
	 * @param      {number}  n       Number to multiply
	 */
	this.mult = function(n) {
		this.x = this.x * n;
		this.y = this.y * n;
	}

	/**
	 * Divides a vector by a number
	 *
	 * @param      {number}  n       Number to divide
	 */
	this.div = function(n) {
		this.x = this.x / n;
		this.y = this.y / n;
	}

	/**
	 * Calculates vector magnitude
	 *
	 * @return     {number}  Vector magnitude
	 */
	this.mag = function() {
		return Math.sqrt((this.x * this.x) + (this.y * this.y));
	}

	/**
	 * Normalizes vector
	 */
	this.normal = function() {
		var m = this.mag();
		this.x = this.x / m;
		this.y = this.y / m;
	}
}