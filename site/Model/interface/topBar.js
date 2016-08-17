var topBar = function (ctx, game) {
	this.game = game;
	this.show = true;
	this.render = function (){
		if (this.show) {
			ctx.beginPath();
			ctx.globalAlpha=0.75;
	    	ctx.fillStyle = "black";
	    	ctx.fillRect( 0, 0, Window.x, 30);
			ctx.fill();
			ctx.fillStyle = "red";
			ctx.font = "16px Arial";
			ctx.fillText("gold: "+ this.game.gold , 50, 20);
			ctx.fillText("Life back: "+ this.game.life , 200, 20);
			ctx.fillText("Wave: "+ this.game.wave , 350, 20);
			ctx.globalAlpha=1;
		}
    }
}