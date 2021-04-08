var express = require('express');
var router  = express.Router();
var Org     = require('../models/Org')


// -------------------------------------------------------------------------
//
// List
//
// -------------------------------------------------------------------------
router.get ('/', (req, res, next) => {
 	Org.find ({}, (err, boxes) => {
 		if (err) return res.status(500).send (err);
		res.status(200).json (boxes);
 	});
});


// -------------------------------------------------------------------------
//
// by ID
//
// -------------------------------------------------------------------------
router.get ('/:id', (req, res, next) => {
 	Org.findById (req.params.id, (err, boxes) => {
 		if (err) return res.status(500).send (err);
		res.status(200).json (boxes);
 	});
});

// -------------------------------------------------------------------------
//
// Post
//
// -------------------------------------------------------------------------
router.post ('/', (req, res, next) => {
	let org = new Org ({
		title       : req.body.title,
		description : req.body.description,
		published   : req.body.published
	});
	org.save (err => {
		if (err) return res.status(500).send (err);
		res.status(200).json (org);
	});
});

// -------------------------------------------------------------------------
//
// Put
//
// -------------------------------------------------------------------------
router.put ('/:id', (req, res, next) => {
	Org.findById (req.params.id, (err, org) => {
 		if (err) return res.status(500).send (err);
		org.title       = req.body.title;
		org.description = req.body.description;
		org.published   = req.body.published;
		org.save (err => {
			if (err) return res.status(500).send (err);
			res.status(200).json (org);
		});
 	});
});


module.exports = router;
