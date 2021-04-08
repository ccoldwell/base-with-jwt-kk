const bcrypt = require('bcrypt');
const crypto = require('crypto');
const mongoose = require('mongoose');

// -------------------------------------------------------------------------
//
// User Schema
//
// -------------------------------------------------------------------------
const userSchema = new mongoose.Schema ({
	email                  : { type: String, unique: true },
	password               : String,
	passwordResetToken     : String,
	passwordResetExpires   : Date,
	emailVerificationToken : String,
	emailVerified          : Boolean,

	snapchat   : String,
	facebook   : String,
	twitter    : String,
	google     : String,
	github     : String,
	instagram  : String,
	linkedin   : String,
	steam      : String,
	twitch     : String,
	quickbooks : String,
	tokens     : Array,

		firstName     : String,
		lastName     : String,
		gender   : String,
		location : String,
		website  : String,
		picture  : String,

	roles : []

},{
	timestamps:true
});

// -------------------------------------------------------------------------
//
// hash a password pre save
//
// -------------------------------------------------------------------------
userSchema.pre ('save', function save (next) {
	const user = this;
	if (!user.isModified ('password')) return next ();
	bcrypt.genSalt (10, (err, salt) => {
		if (err) return next (err);
		bcrypt.hash (user.password, salt, (err, hash) => {
			if (err) return next (err);
			user.password = hash;
			next ();
		});
	});
});

// -------------------------------------------------------------------------
//
// compare passwords
//
// -------------------------------------------------------------------------
userSchema.methods.comparePassword = function comparePassword (candidate, cb) {
	bcrypt.compare (candidate, this.password, (err, isMatch) => {
		cb (err, isMatch);
	});
};

const User = mongoose.model ('User', userSchema);

module.exports = User;
