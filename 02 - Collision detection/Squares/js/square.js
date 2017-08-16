function Square(context) {
	this.pos = new Vector(getRandom(100, canvas.width-100), getRandom(100, canvas.height-100));
	this.vel = new Vector(getRandom(-5, 5), getRandom(-5, 5));
	this.vel.normal();
	this.vel.mult(10);
	this.size = 100;

	this.run = function(array) {
		this.update();
		this.checkColissions(array);
		this.checkEdges();
		this.display();
	}

	this.update = function() {
		this.pos.add(this.vel);
	}

	this.display = function() {
		context.beginPath();
		context.rect(this.pos.x, this.pos.y, this.size, this.size);
      	context.fillStyle = 'green';
      	context.fill();
	}

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

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}