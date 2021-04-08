const express   = require('express');
const router    = express.Router();
const auth      = require ('../controllers/authorization');

router.post ('/signup', [auth.ensureUnique], auth.register);

router.post ('/signin', auth.signin);

module.exports = router;
