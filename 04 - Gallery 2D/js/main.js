var imgArray = [
	"../GalleryAssets/img/1406965068.jpg",
	"../GalleryAssets/img/1439358068.jpg",
	"../GalleryAssets/img/1443358068.jpg",
	"../GalleryAssets/img/1451415912.jpg",
	"../GalleryAssets/img/1451416904.jpg",
	"../GalleryAssets/img/1451431276.jpg",
	"../GalleryAssets/img/1451433043.jpg",
	"../GalleryAssets/img/1452034116.jpg",
	"../GalleryAssets/img/1464358068.jpg",
	// "../GalleryAssets/img/1469328068.jpg",
	// "../GalleryAssets/img/1469355068.jpg",
	// "../GalleryAssets/img/1469358068.jpg",
	// "../GalleryAssets/img/1469358168.jpg",
	// "../GalleryAssets/img/1469358268.jpg",
	// "../GalleryAssets/img/1469444877.jpg",
	// "../GalleryAssets/img/1469654367.jpg",
	// "../GalleryAssets/img/1469735732.jpg",
	// "../GalleryAssets/img/1487358068.jpg"
];

var container = document.getElementById('gallery');

var gallery = new Gallery(imgArray, container);
gallery.init();