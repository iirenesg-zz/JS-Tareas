var player;
var platforms;
var cursors;

var stars;
var score = 0;
var scoreText;

var config = {
	preload: preload, 
	create: create, 
	update: update
}

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', config);