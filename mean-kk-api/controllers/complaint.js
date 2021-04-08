var Complaint = require('../models/Complaint')


// -------------------------------------------------------------------------
//
// List
//
// -------------------------------------------------------------------------
exports.list = (req, res, next) => {
	//req.query.id
 	Complaint.find ({}, (err, boxes) => {
 		if (err) return res.status(500).send (err);
		res.status(200).json (boxes);
 	});
};


// -------------------------------------------------------------------------
//
// by ID
//
// -------------------------------------------------------------------------
exports.byId = (req, res, next) => {
 	Complaint.findById (req.params.id, (err, boxes) => {
 		if (err) return res.status(500).send (err);
		res.status(200).json (boxes);
 	});
};

// -------------------------------------------------------------------------
//
// Post
//
// -------------------------------------------------------------------------
exports.create = (req, res, next) => {
	let complaint = new Complaint ({
		title       : req.body.title,
		description : req.body.description,
		published   : req.body.published
	});
	complaint.save (err => {
		if (err) return res.status(500).send (err);
		res.status(200).json (complaint);
	});
};

// -------------------------------------------------------------------------
//
// Put
//
// -------------------------------------------------------------------------
exports.update = (req, res, next) => {
	Complaint.findById (req.params.id, (err, complaint) => {
 		if (err) return res.status(500).send (err);
		complaint.title       = req.body.title;
		complaint.description = req.body.description;
		complaint.published   = req.body.published;
		complaint.save (err => {
			if (err) return res.status(500).send (err);
			res.status(200).json (complaint);
		});
 	});
};

// -------------------------------------------------------------------------
//
// Delete
//
// -------------------------------------------------------------------------
exports.remove = (req, res, next) => {
	Complaint.findByIdAndDelete (req.params.id, (err) => {
 		if (err) return res.status(500).send (err);
		res.status(200).json ({'ok':'ok'});
 	});
};

