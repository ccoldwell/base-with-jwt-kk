const mongoose = require('mongoose');

// -------------------------------------------------------------------------
//
// Complaint Schema
//
// -------------------------------------------------------------------------
module.exports = mongoose.model ('Complaint', new mongoose.Schema ({
	title               : String,
	description         : String,
	published           : Boolean
},{
	timestamps:true
}));
