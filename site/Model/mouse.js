var mouse = function (ctx, game) {
	this.ctx = ctx;
	this.game = game;
	this.click = new Click(ctx, game);
	this.Onmousemove = new Onmousemove(ctx, game);
	this.render = function (){
      	this.Onmousemove.render();
	}
}