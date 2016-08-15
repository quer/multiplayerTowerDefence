var interface = function (ctx, game) {
	this.game = game;
	this.ctx = ctx;
	this.image = Images.get("board"); //document.getElementById("interface");
	this.x = this.image.width;
	this.y = this.image.height;
	this.topbar = new topBar(ctx, game);
	this.building = new building(ctx, game);
	this.render = function (){
      	this.ctx.drawImage(this.image, 0, 0, this.x, this.y, Window.x - this.x, Window.y - this.y, this.x, this.y);
      	this.topbar.render();
      	this.building.render();
	}
}