const mongoose = require('mongoose');

// -------------------------------------------------------------------------
//
// Box Schema
//
// -------------------------------------------------------------------------
module.exports = mongoose.model ('Box', new mongoose.Schema ({
	title               : String,
	description         : String,
},{
	timestamps:true
}));
