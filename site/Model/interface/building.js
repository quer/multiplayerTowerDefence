var building = function (ctx, game) {
	this.game = game;
	this.ctx = ctx;
	this.show = true;
	this.start = {
		x: Window.x - 222,
		y: Window.y - 147
	}
	this.buildingObjs = [];
	this.init = function() {
		for (var i = 0; i < this.game.map.buildings.length; i++) {
			var index = i;
	    	var extraHeight = 0;
	    	/*if ((i % 3) == 1) {
	    		index -= 3;
	    		extraHeight = 73;
	    	}*/
	    	var x = this.start.x + (index*74);
	    	var y = this.start.y + extraHeight; 
			var building = this.game.map.buildings[i];
			console.log({"x": x, "y": y});
			var newBuildingObj = new buildingObj(this.ctx, this.game, building, {"x": x, "y": y});
			this.buildingObjs.push(newBuildingObj);

		}
	}
	this.render = function (){
		if (this.show) {
			for (var i = 0; i < this.buildingObjs.length; i++) {
				this.buildingObjs[i].render();
			}
		}
    }

    this.init();
}
var buildingObj = function (ctx, game, building, start) {
	this.game = game;
	this.ctx = ctx;
	this.show = true;
	this.name = building.name;
	this.range = building.range; 
	this.damage = building.damage;
	this.speed = building.speed;
	this.damageRadis = building.damageRadis;
	this.cost = building.cost;
	this.color = building.color;
	//this.upgrade = building.upgrade != undefined? new buildingObj(this.ctx, this.game, building.upgrade) : null;
	this.renderStart = start;
	console.log(start);
	this.clickSlotNr = this.game.mouse.click.addItem(start.x, start.y, 62, 62, false, this);
	var arrayOfText = [	building.name,
						"damage " + building.damage, 
						"cost " + building.cost, 
						"speed " + building.speed];
	this.hoverSlotNr = this.game.mouse.Onmousemove.addItem(start.x, start.y, 62, 62, arrayOfText, false);
	this.render = function (){
		if (this.show) {

				this.ctx.beginPath();
		    	this.ctx.fillStyle = building.color;

		    	this.ctx.fillRect(this.renderStart.x, this.renderStart.y, 62, 62);
				this.ctx.fill();
			
		}
    }
	// true for this can be used
    this.selected = function () {
    	console.log(this.name + " selected");
    	return true;
    }
    this.used = function (x, y) {
    	var block = this.game.world.getNearstBlock(this.game.world.offset.x + x, this.game.world.offset.y + y);
    	if (this.game.world.getCollision(block.x, block.y) == 2) {
    		console.log(this.name + " used");
    		if (this.cost > this.game.gold) {
    			console.log(this.name + " not enof gold");
    		}else{
    			console.log(this.name + " payed");
    			socket.emit('NewBuilding', this.name, block.x, block.y, function (data) {
				    if (data.status == false) {
				    	addTextChat("server", "somfing went worng trying to buy building");
				    }
				});
				return false; // true if that to force anti select item 
    		}
    	}
    	return false;
    }
}