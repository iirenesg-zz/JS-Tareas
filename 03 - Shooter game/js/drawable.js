function Drawable() {

	this.speed = 0;
	this.canvasWidth = 0;
	this.canvasHeight = 0;
	this.collidableWith = "";
	this.isColliding = false;
	this.type = "";

	this.init = function(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;
	}

	this.isCollidableWith = function(object) {
		return (this.collidableWith === object.type);
	};
}

function Background() {
	this.speed = 1; 

	this.draw = function() {
		this.y += this.speed;
		this.context.drawImage(imageRepository.background, this.x, this.y);
		this.context.drawImage(imageRepository.background, this.x, this.y - this.canvasHeight);

		if (this.y >= this.canvasHeight) this.y = 0;
	};
}
Background.prototype = new Drawable();


function Bullet(object) {
	this.alive = false; 
	var self = object;

	this.spawn = function(x, y, speed) {
		this.x = x;
		this.y = y;
		this.speed = speed;
		this.alive = true;
	};

	this.draw = function() {
		this.context.clearRect(this.x-1, this.y-1, this.width+2, this.height+2);
		this.y -= this.speed;

		if (this.isColliding) {
			return true;
		} else if (self === "bullet" && this.y <= 0 - this.height) {
			return true;
		} else if (self === "enemyBullet" && this.y >= this.canvasHeight) {
			return true;
		} else {
			if (self === "bullet") {
				this.context.drawImage(imageRepository.bullet, this.x, this.y);
			} else if (self === "enemyBullet") {
				this.context.drawImage(imageRepository.enemyBullet, this.x, this.y);
			}
			return false;
		}
	};

	this.clear = function() {
		this.x = 0;
		this.y = 0;
		this.speed = 0;
		this.alive = false;
		this.isColliding = false;
	};
}
Bullet.prototype = new Drawable();


function Ship() {
	this.speed = 3;
	this.bulletPool = new Pool(30);
	var fireRate = 15;
	var counter = 0;
	this.collidableWith = "enemyBullet";
	this.type = "ship";

	this.init = function(x, y, width, height) {
		this.x = x;
		this.y = y-50;
		this.width = width;
		this.height = height;
		this.alive = true;
		this.isColliding = false;
		this.bulletPool.init("bullet");
	}

	this.draw = function() {
		this.context.drawImage(imageRepository.spaceship, this.x, this.y);
	};

	this.move = function() {
		counter++;
		if (KEY_STATUS.left || KEY_STATUS.right ||
				KEY_STATUS.down || KEY_STATUS.up) {
			this.context.clearRect(this.x, this.y, this.width, this.height);

			if (KEY_STATUS.left) {
				this.x -= this.speed
				if (this.x <= 0) 
					this.x = 0;
			} else if (KEY_STATUS.right) {
				this.x += this.speed
				if (this.x >= this.canvasWidth - this.width)
					this.x = this.canvasWidth - this.width;
			} else if (KEY_STATUS.up) {
				this.y -= this.speed
				if (this.y <= this.canvasHeight/4*3)
					this.y = this.canvasHeight/4*3;
			} else if (KEY_STATUS.down) {
				this.y += this.speed
				if (this.y >= this.canvasHeight - this.height)
					this.y = this.canvasHeight - this.height;
			}
		}

		if (!this.isColliding) {
			this.draw();
		} else {
			this.alive = false;
			game.gameOver();
		}

		if (KEY_STATUS.space && counter >= fireRate && !this.isColliding) {
			this.fire();
			counter = 0;
		}
	};

	this.fire = function() {
		this.bulletPool.getTwo(this.x+40, this.y, 3,
		                       this.x+80, this.y, 3);
		game.laser.get();
	};
}
Ship.prototype = new Drawable();

function Enemy() {
	var percentFire = .01;
	var chance = 0;
	this.alive = false;
	this.collidableWith = "bullet";
	this.type = "enemy";

	this.spawn = function(x, y, speed) {
		this.x = x;
		this.y = y+100;
		this.speed = speed;
		this.speedX = 0;
		this.speedY = speed;
		this.alive = true;
		this.leftEdge = this.x - 90;
		this.rightEdge = this.x + 90;
		this.bottomEdge = this.y + 140;
	};

	this.draw = function() {
		this.context.clearRect(this.x-1, this.y, this.width+1, this.height);
		this.x += this.speedX;
		this.y += this.speedY;
		if (this.x <= this.leftEdge) {
			this.speedX = this.speed;
		} else if (this.x >= this.rightEdge + this.width) {
			this.speedX = -this.speed;
		} else if (this.y >= this.bottomEdge) {
			this.speed = 1.5;
			this.speedY = 0;
			this.y -= 5;
			this.speedX = -this.speed;
		}

		if (!this.isColliding) {
			this.context.drawImage(imageRepository.enemy, this.x, this.y);

			chance = Math.floor(Math.random()*101);
			if (chance/100 < percentFire) {
				this.fire();
			}
			return false;
		} else {
			game.playerScore += 10;
			game.explosion.get();
			return true;
		}
	};

	this.fire = function() {
		game.enemyBulletPool.get(this.x+this.width/2, this.y+this.height, -2.5);
	};

	this.clear = function() {
		this.x = 0;
		this.y = 0;
		this.speed = 0;
		this.speedX = 0;
		this.speedY = 0;
		this.alive = false;
		this.isColliding = false;
	};
}
Enemy.prototype = new Drawable();