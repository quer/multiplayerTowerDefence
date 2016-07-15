/*
 * building
 */
module.exports = function (building) {
	this.building = building;
	this.name = building.name;
	this.range = building.range;
	this.damage = building.damage;
	this.speed = building.speed;
	this.damageRadis = building.damageRadis;
	this.cost = building.cost;
	this.upgrade = building.upgrade == undefined? new this(building.upgrade) : null; 

	this.update = function (delta) {
		// body...
	}
}