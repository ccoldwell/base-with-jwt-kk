const User   = require ('../models/User');
const jwt    = require ('jsonwebtoken');
const bcrypt = require ('bcrypt');
const secret = require ('../secret');


// -------------------------------------------------------------------------
//
// register a new user
//
// -------------------------------------------------------------------------
exports.register = (req, res, next) => {
	const user = new User ({
		email     : req.body.email,
		password  : req.body.password,
		firstName : req.body.firstName,
		lastName  : req.body.lastName,
		roles     : req.body.roles ? req.body.roles : []
	});
	//
	// all users have the user role
	//
	user.roles.unshift ('user');
	user.save ((err, user) => {
		if (err) return res.status(500).send (err);
		res.status(200).json ({
			status  : 200,
			message : 'User registered'
		});
	});
};

// -------------------------------------------------------------------------
//
// sign in and get a token in return
//
// -------------------------------------------------------------------------
exports.signin = (req, res, next) => {
	User.findOne ({ email: req.body.email }).exec ((err, user) => {
		if (err) return res.status(500).send (err);
		if (!user) return res.status(404).json ({
			status      : 404,
			id          : null,
			email       : null,
			roles       : [],
			message     : 'User Not found, sorry - try again',
			accessToken : null
		});
		user.comparePassword (req.body.password, (err, isMatch) => {
			if (err) return res.status(500).send (err);
			if (!isMatch) return res.status(404).json ({
				status      : 404,
				id          : null,
				email       : null,
				roles       : [],
				message     : 'User Not found, sorry - try again',
				accessToken : null
			});
			//
			// generate a token
			//
			let token = jwt.sign ({ id: user._id }, secret, {
				expiresIn: 86400
			});
			return res.status(200).json ({
				status      : 200,
				id          : user._id,
				email       : user.email,
				firstName       : user.firstName,
				lastName       : user.lastName,
				roles       : user.roles,
				message     : 'Welcome back',
				accessToken : token
			});
		});
	});
};

// -------------------------------------------------------------------------
//
// ensure unique emails
//
// -------------------------------------------------------------------------
exports.ensureUnique = (req, res, next) => {
	User.findOne ({ email: req.body.email }).exec ((err, user) => {
		if (err) return res.status(500).send (err);
		if (user) return res.status(400).json ({
			status      : 400,
			message     : 'User already exists'
		});
		next ();
	});
};
