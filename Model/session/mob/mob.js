/*
 * mob
 */
module.exports = function (mob, index) {
	this.index = index;
	this.mob = mob;
	this.name = mob.name;
	this.life = mob.life;
	this.design = mob.design;
	this.x = 0;
	this.y = 0;
	this.size = 4; //pixels size
	
	this.update = function (delta) {
		// body...
	}
}