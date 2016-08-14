var interface = function (ctx) {
	this.ctx = ctx;
	this.image = Images.get("board"); //document.getElementById("interface");
	this.x = this.image.width;
	this.y = this.image.height;
	this.render = function (){
      	this.ctx.drawImage(this.image, 0, 0, this.x, this.y, Window.x - this.x, Window.y - this.y, this.x, this.y);
	}
}