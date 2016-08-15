var mouse = function (ctx, game) {
	this.ctx = ctx;
	this.game = game;
	//this.click = new click(ctx); <- need work
	this.Onmousemove = new Onmousemove(ctx, game);
	this.render = function (){
      	this.Onmousemove.render();
	}
}