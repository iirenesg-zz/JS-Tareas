var game = new Game();

function init() {
	game.init();
}

var imageRepository = new function() {

	var numImages = 5;
	var numLoaded = 0;

	this.background = new Image();
	this.spaceship = new Image();
	this.bullet = new Image();
	this.enemy = new Image();
	this.enemyBullet = new Image();

	this.background.src = "assets/img/bg.jpg";
	this.background.onload = function() {
		imageLoaded();
	}

	this.spaceship.src = "assets/img/ship.png";	
	this.spaceship.onload = function() {
		imageLoaded();
	}

	this.bullet.src = "assets/img/bullet.png";
	this.bullet.onload = function() {
		imageLoaded();
	}

	this.enemy.src = "assets/img/enemy.png";
	this.enemy.onload = function() {
		imageLoaded();
	}

	this.enemyBullet.src = "assets/img/bullet_enemy.png";	
	this.enemyBullet.onload = function() {
		imageLoaded();
	}

	function imageLoaded() {
		numLoaded++;
		if (numLoaded === numImages) {
			window.init();
		}
	}
}

function checkReadyState() {
	if (game.gameOverAudio.readyState === 4 && game.backgroundAudio.readyState === 4) {
		window.clearInterval(game.checkAudio);
		document.getElementById('loading').style.display = "none";
		game.start();
	}
}

window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame       ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			window.oRequestAnimationFrame      ||
			window.msRequestAnimationFrame     ||
			function(callback, element){
				window.setTimeout(callback, 1000 / 60);
			};
})();