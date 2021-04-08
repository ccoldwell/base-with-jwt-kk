const session = require ('express-session');
const Keycloak = require ('keycloak-connect');
const jwt = require('jsonwebtoken');


class KK {

}
let _keycloak;

// -------------------------------------------------------------------------
//
// initializes Keycloak form the local keycloak.json
//
// -------------------------------------------------------------------------
function initKeycloak() {
	if (_keycloak) {
		console.warn("Trying to init Keycloak again!");
		return _keycloak;
	}
	else {
		console.log("Initializing Keycloak...");
		var memoryStore = new session.MemoryStore();
		_keycloak = new Keycloak({ store: memoryStore });
		_keycloak.redirectToLogin = () => false;
		_keycloak.accessDenied = (request, response) => response.redirect('/denied404.html');
		return _keycloak;
	}
}

function getKeycloak() {
	if (!_keycloak){
		console.error('Keycloak has not been initialized. Please called init first.');
	}
	return _keycloak;
}

module.exports = {
	initKeycloak,
	getKeycloak
};
