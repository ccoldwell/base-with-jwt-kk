const jwt    = require ('jsonwebtoken');
const secret = require ('../secret');
const User   = require ('../models/User') ;

// -------------------------------------------------------------------------
//
// verify the incoming jwt, get the user record and decorate the request
//
// -------------------------------------------------------------------------
exports.verified = (req, res, next) => {
	let token = req.headers['x-access-token'];
	if (!token) return res.status(403).json ({
		status  : 403,
		message : 'Invalid or missing authorization token'
	});
	jwt.verify (token, secret, (err, result) => {
		if (err) return res.status(401).json ({
			status  : 401,
			message : 'Unauthorized'
		});
	 	//
	 	// result.id should be the user id
	 	//
	 	User.findById (result.id, (err, user) => {
			if (err) return res.status(401).json ({
				status  : 401,
				message : 'Invalid user'
			});
			req._user = user;
			next ();
	 	});
	});
};

// -------------------------------------------------------------------------
//
// check for a particular role
//
// -------------------------------------------------------------------------
exports.has = (role) => {
	return function (req, res, next) {
		if (!req._user) return res.status(401).json ({
			status  : 401,
			message : 'Invalid user'
		});
		if (!req._user.roles.includes (role)) return res.status(401).json ({
			status  : 401,
			message : 'Insufficient access'
		});
		next ();
	}
};

// -------------------------------------------------------------------------
//
// check for all of a set of roles
//
// -------------------------------------------------------------------------
exports.hasAll = (roles) => {
	return function (req, res, next) {
		if (!req._user) return res.status(401).json ({
			status  : 401,
			message : 'Invalid user'
		});
		if (!roles.every (i => req._user.roles.includes (i))) return res.status(401).json ({
			status  : 401,
			message : 'Insufficient access'
		});
		next ();
	}
};

// -------------------------------------------------------------------------
//
// check for any of a set of roles
//
// -------------------------------------------------------------------------
exports.hasAny = (roles) => {
	return function (req, res, next) {
		if (!req._user) return res.status(401).json ({
			status  : 401,
			message : 'Invalid user'
		});
			console.log (roles, req._user.roles);
		if (!roles.some (i => req._user.roles.includes (i))) return res.status(401).json ({
			status  : 401,
			message : 'Insufficient access'
		});
		next ();
	}
};
