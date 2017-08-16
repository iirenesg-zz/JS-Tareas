/**
 * Gallery constructor
 *
 * @class      Gallery (name)
 * @param      {object}  images  Array with the image sources
 */
function Gallery(images) {
	var self = this;

	self.amtItems = images.length;
	self.currentIndex = 0;
	self.imagesSrc = images;

	self.container = document.getElementById('gallery-container');
	self.nextBtn = document.getElementById('btn-next');
	self.prevBtn = document.getElementById('btn-prev');
	
}

Gallery.prototype = {
	constructor: Gallery,
	self: null,

	/**
	 * Initializes the gallery
	 */
	init: function() {
		self = this;
		self.nextBtn.addEventListener('click', self.setNext);
		self.prevBtn.addEventListener('click', self.setPrev);
		self.composeGallery();
	},

	/**
	 * Composes the gallery in the initialization
	 */
	composeGallery: function() {

		var ul = document.createElement('ul');
		var li = document.createElement('li');
			
		var img = document.createElement('img');
		img.setAttribute('src', self.imagesSrc[self.currentIndex]);

		ul.appendChild(li);
		li.appendChild(img);
		self.container.appendChild(ul);
	},

	/**
	 * Sets the next slide
	 */
	setNext: function() {
		if (self.currentIndex == self.amtItems-1) {
			self.currentIndex = 0;
		}

		var items = self.container.getElementsByTagName('li');
		for (var i=0; i<items.length; i++) {
			var img = items[i].getElementsByTagName('img');	
			self.currentIndex++;
			img[0].setAttribute('src', self.imagesSrc[self.currentIndex]);
		}
	},

	/**
	 * Sets the previous slide
	 */
	setPrev: function() {
		if (self.currentIndex == 0) {
			self.currentIndex = self.amtItems-1;
		}

		var items = self.container.getElementsByTagName('li');
		for (var i=0; i<items.length; i++) {
			var img = items[i].getElementsByTagName('img');
			self.currentIndex--;
			img[0].setAttribute('src', self.imagesSrc[self.currentIndex]);
		}
	}
}