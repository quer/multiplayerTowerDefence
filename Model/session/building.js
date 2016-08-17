/*
 * building
 */
module.exports = function (building) {
	console.log(building);
	this.building = building;
	this.name = building.name;
	this.range = building.range;
	this.damage = building.damage;
	this.speed = building.speed;
	this.damageRadis = building.damageRadis;
	this.cost = building.cost;
	this.color = building.color;
	//this.upgrade = building.upgrade != undefined? new module.exports(building.upgrade) : null; 

	this.update = function (delta) {
		// body...
	}
}