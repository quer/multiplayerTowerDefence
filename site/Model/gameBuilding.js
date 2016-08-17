var gameBuilding = function (ctx, game) {
	this.game = game;
	this.ctx = ctx;
	this.show = true;
	this.render = function (){
		if (this.show) {
			for (var i = 0; i < this.game.buildings.length; i++) {
				var building = this.game.buildings[i];
		      	this.ctx.beginPath();
		    	this.ctx.fillStyle = building.color;

		    	this.ctx.fillRect(Math.abs(building.x*Tile.SCALE_SIZE()) - this.game.world.offset.x, Math.abs(building.y*Tile.SCALE_SIZE()) - this.game.world.offset.y, Tile.SCALE_SIZE(), Tile.SCALE_SIZE());
				this.ctx.fill();
			}
		}
    }
}