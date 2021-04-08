var express = require('express');
var router  = express.Router();
var Box     = require('../models/Box')


// -------------------------------------------------------------------------
//
// List
//
// -------------------------------------------------------------------------
router.get ('/', (req, res, next) => {
 	Box.find ({}, (err, boxes) => {
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
 	Box.findById (req.params.id, (err, boxes) => {
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
	let box = new Box ({
		title       : req.body.title,
		description : req.body.description
	});
	box.save (err => {
		if (err) return res.status(500).send (err);
		res.status(200).json (box);
	});
});

// -------------------------------------------------------------------------
//
// Put
//
// -------------------------------------------------------------------------
router.get ('/testput/really/:id', (req, res, next) => {
	Box.findById (req.params.id, (err, box) => {
 		if (err) return res.status(500).send (err);
		box.title = 'this is a new title again';
		box.save (err => {
			if (err) return res.status(500).send (err);
			res.status(200).json (box);
		});
 	});
});

module.exports = router;
