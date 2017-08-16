function Vector(x, y) {
	this.x = x;
	this.y = y;

	this.add = function(v) {
		this.x = this.x + v.x;
		this.y = this.y + v.y;
	}

	this.sub = function(v) {
		this.x = this.x - v.x;
		this.y = this.y - v.y;
	}

	this.mult = function(n) {
		this.x = this.x * n;
		this.y = this.y * n;
	}

	this.div = function(n) {
		this.x = this.x / n;
		this.y = this.y / n;
	}

	this.mag = function() {
		return Math.sqrt((this.x * this.x) + (this.y * this.y));
	}

	this.normal = function() {
		var m = this.mag();
		this.x = this.x / m;
		this.y = this.y / m;
	}
}