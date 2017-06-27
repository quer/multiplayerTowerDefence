/*
 * mob
 */
module.exports = function (mob, index, poss) {
	this.index = index;
	this.mob = mob;
	this.name = mob.name;
	this.life = mob.life;
	this.design = mob.design;
	this.x = poss.x;
	this.y = poss.y;
	this.size = 4; //pixels size
	
	this.update = function (delta) {
		// body...
	}
}