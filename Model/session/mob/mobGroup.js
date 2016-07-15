var mob = require("./mob");

/*
 * mobGroup
 */
module.exports = function (mobGroup) {
	this.mobGroup = mobGroup;
	this.wayPoints = mobGroup.spawn;
	this.mobs = [];
	for (var i = 0; i < mobGroup.mob.length; i++) {
		for (var ii = 0; ii < mobGroup.mob[i].amount; ii++) {
			this.mobs.push(new mob(mobGroup.mob[i], ii));
		};
	};
	
	this.update = function (delta) {
		// body...
	}
}