var mobGroup = require("./mobGroup");
/*
 * mobSpawn
 */
module.exports = function (mobSpawnPoss, mobsSpawnData) {
	this.mobSpawnPoss = mobSpawnPoss;
	this.refName = mobSpawnPoss.refName;
	this.startCorner = mobSpawnPoss.start;
	this.endCorner = mobSpawnPoss.end;
	this.startPoss = {
			x: this.startCorner.x,
			y: this.startCorner.y,
			height : (this.startCorner.x - this.endCorner.x),
			weight: (this.startCorner.y - this.endCorner.y)
		}
	this.mobGroup = [];
	for (var i = 0; i < mobsSpawnData.length; i++) {
		if (mobsSpawnData[i].spawn == this.refName) {
			for (var ii = 0; ii < mobsSpawnData[i].mobsGroup.length; ii++) {
				var mobGroupObj = new mobGroup(mobsSpawnData[i].mobsGroup[ii], mobsSpawnData.delay, this.startPoss);
				this.mobGroup.push(mobGroupObj);
			};
		}
	}

	this.update = function (delta) {
		// body...
	}

	this.getStart = function() {
		return 
	}
	this.GetMobs = function () {
		var mobsArray = [];
		for (var i = 0; i < this.mobGroup.length; i++) {
			mobsArray.push(this.mobGroup[i].GetMobs());
		}
		return mobsArray;
	}
}