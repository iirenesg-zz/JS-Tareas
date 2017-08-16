/**
 * Gallery constructor
 *
 * @class      Gallery (name)
 * @param      {object}  images  The array of image sources
 * @param      {object}  el      DOM element
 */
function Gallery(images, el) {
	var self = this;
	self.radius = 350;
	self.srcImg = images;
	self.pictures = [];
	self.el = el;

	/**
	 * Initializes requestAnimationFrame function
	 */
	self.init = function() {
		self.composeGallery();

		var requestAnimationFrame = window.requestAnimationFrame || 
								window.mozRequestAnimationFrame ||
                            	window.webkitRequestAnimationFrame || 
                            	window.msRequestAnimationFrame;
	
		window.requestAnimationFrame = requestAnimationFrame;

		requestAnimationFrame(self.animate);
	}

	/**
	 * Composes gallery in the DOM
	 */
	self.composeGallery = function() {
		for (var i=0; i<self.srcImg.length; i++) {
			var size = 300;
			var angle = ((2 * Math.PI) / self.srcImg.length) * i;
			var picture = new Picture(self.el, self.srcImg[i], self.radius, size, angle, this.srcImg.length - i)
			picture.init();
			self.pictures.push(picture);
		}
	}

	/**
	 * Animates each picture each frame
	 */
	self.animate = function() {

		for(i=0; i<self.pictures.length; i++) {
			self.pictures[i].run();
		}

		requestAnimationFrame(self.animate);
	}
}

/**
 * Picture constructor
 *
 * @class      Picture (name)
 * @param      {Object}  container  The DOM element container
 * @param      {string}  src        The source of the image
 * @param      {number}  radius     The radius of the gallery ellipse
 * @param      {number}  size       The size of each picture
 * @param      {number}  angle      The angle of each picture
 * @param      {number}  index      The index of the picture in the array
 */
function Picture(container, src, radius, size, angle, index) {
	var self = this;
	self.pos = new Vector(0, 0);
	self.initSize = size;
	self.size = size;
	self.initRadius = radius;
	self.radius = new Vector(0,0);
	self.src = src;	
	self.el = null;
	self.container = container;
	self.angle = angle;

	/**
	 * Composes DOM element and calls functions to display it
	 */
	self.init = function() {
		var img = document.createElement('img');
		self.el = img;

		self.el.src = self.src;
		self.container.appendChild(self.el);
		self.el.classList.add('picture');
		self.el.style.zIndex = index;
		self.update();
		self.display();
	}

	/**
	 * Calls the functions to update and display the picture object
	 * Updates the angle
	 */
	self.run = function() {
		self.angle += 0.005;
		if(self.angle >= 2*Math.PI) self.angle = 0;
		self.update();
		self.display();
	}

	/**
	 * Updates size, radius and position of each picture
	 */
	self.update = function () {		
		self.radius.x = self.initRadius + (Math.abs(self.pos.x/3));
		self.radius.y = Math.min(self.initRadius + self.pos.x/3, self.container.offsetHeight/5);
		self.pos.y = (self.radius.y) * Math.sin(self.angle);
		self.pos.x = (self.radius.x) * Math.cos(self.angle);
		self.size = self.initSize + self.pos.y;
	}

	/**
	 * Updates the element properties in the DOM
	 */
	self.display = function() {
		self.el.style.width = self.size + 'px';
		self.el.style.top = (self.pos.y + self.container.offsetHeight/2) + 'px';
		self.el.style.left = (self.pos.x + self.container.offsetWidth/2) + 'px';
	}
}