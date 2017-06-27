var mob = require("./mob");
var PF = require('pathfinding');
/*
 * mobGroup
 */
module.exports = function (mobGroup, delay, spawnPoss) {
	this.mobGroup = mobGroup;
	this.wayPoints = mobGroup.wayPoint;
	this.delay = delay;
	this.mobs = [];
	for (var i = 0; i < mobGroup.mob.length; i++) {
		for (var ii = 0; ii < mobGroup.mob[i].amount; ii++) {
			var randomSpawn = { 
				x: spawnPoss.x + (Math.floor(Math.random() * spawnPoss.weight) + 1),
				y: spawnPoss.y + (Math.floor(Math.random() * spawnPoss.height) + 1)
			}
			this.mobs.push(new mob(mobGroup.mob[i], ii, randomSpawn));
		};
	};
	this.patch = [];
	this.update = function (delta) {
		// body...
	}
	this.start = function () {
		
	}
	this.updatePath = function() {
		for (var i = 0; i < this.wayPoints.length; i++) {
			this.wayPoints[i]
		}
		var grid = new PF.Grid(6, 6, matrix);
    
	    var finder = new PF.AStarFinder({
	        allowDiagonal: true,
	        dontCrossCorners: true
	    });

	    var path = finder.findPath(0, 0, 2, 4, grid);
	    var newPath = PF.Util.compressPath(path);
	}
	this.GetMobs = function () {
		
		return this.mobs;
	}
}