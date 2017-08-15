var imgArray = [
	"img/1406965068.jpg",
	"img/1439358068.jpg",
	"img/1443358068.jpg",
	"img/1451415912.jpg",
	"img/1451416904.jpg",
	"img/1451431276.jpg",
	"img/1451433043.jpg",
	"img/1452034116.jpg",
	"img/1464358068.jpg",
	// "img/1469328068.jpg",
	// "img/1469355068.jpg",
	// "img/1469358068.jpg",
	// "img/1469358168.jpg",
	// "img/1469358268.jpg",
	// "img/1469444877.jpg",
	// "img/1469654367.jpg",
	// "img/1469735732.jpg",
	// "img/1487358068.jpg"
];

var container = document.getElementById('gallery');

var gallery = new Gallery(imgArray, container);
gallery.init();