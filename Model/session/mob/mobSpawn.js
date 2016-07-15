var mobGroup = require("./mobGroup");
/*
 * mobSpawn
 */
module.exports = function (mobSpawn) {
	this.mobSpawn = mobSpawn;
	this.spawn = mobSpawn.spawn;
	this.delay = mobSpawn.delay;
	this.mobGroup = [];
	for (var i = 0; i < mobSpawn.mobsGroup.length; i++) {
		this.mobGroup.push(new mobGroup(mobSpawn.mobsGroup[i]));
	};
	
	this.update = function (delta) {
		// body...
	}
}