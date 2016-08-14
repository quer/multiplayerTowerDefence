var Images = function() {
	this.images = [];
	this.init = function () {
		this.addImage("deadmaul", "image/deadmaul.png");
		this.addImage("board", "image/board.png");	
	}
	this.addImage = function (name, patch) {
		this.images[name] = new Image();
		this.images[name].src = patch;
	}
	this.get = function(name) {
		return this.images[name];
	}
}
var Images = new Images();
Images.init();