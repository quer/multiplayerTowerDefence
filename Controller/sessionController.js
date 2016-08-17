var sessionObj = require("../Model/session/session");
/*
 * sessionController
 */
module.exports = new function () {
	this.session = [];
	this.newSession = function (map, user, name) {
		var session = new sessionObj(map, user, name, ( 1 + this.session.length) );
		this.addSession(session);
		return session;
	}
	this.addSession = function (session) {
		this.session.push(session);
	}
	this.removeSession = function (host) {
		for (var i = 0; i < this.session.length; i++) {
			if(this.session[i].host.name == host.name){
				this.session.slice(i,1);
				return;
			}
		};
	}
	this.findSession = function (sessionId) {
		for (var i = 0; i < this.session.length; i++) {
			if (this.session[i].id == sessionId) {
				return this.session[i];
			};
		};
		return null;
	}
	this.buildList = function () {
		var endData = [];
		for (var i = 0; i < this.session.length; i++) {
			if (!this.session[i].igang) {
				endData.push(this.session[i].buildOverview());
			}
		};
		return endData;
	}
	this.update = function(delta) {
		for (var i = 0; i < this.session.length; i++) {
			this.session[i].update(delta);
		}
	}
}