var PF = require('pathfinding');
/*
 * mob
 */
module.exports = function (mob, movement, endCord, currentCollissionForPathFinder) {
	this.mob = mob;
	this.name = mob.name;
	this.life = mob.life;
	this.design = mob.design;
	this.size = 4; //pixels size
	this.spawn = makeRandomSpawn(movement);
	this.wayPoints = movement.wayPoint;
	this.endCord = endCord;
	this.path = updatePath(currentCollissionForPathFinder).bind(this);
	this.update = function (delta) {
		// body...
	}
	this.updatePath = function() {
		this.path = updatePath(currentCollissionForPathFinder).bind(this);
	}
}

function makeRandomSpawn(movement) {
	return { 
		x: movement.start.x + (Math.floor(Math.random() * movement.end.x) + 1),
		y: movement.start.y + (Math.floor(Math.random() * movement.end.y) + 1)
	}
}
function updatePath() {
	var endCord
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