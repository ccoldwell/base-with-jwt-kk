const express   = require('express');
const router    = express.Router();
const Complaint = require('../models/Complaint')
const c         = require ('../controllers/complaint');

const keycloak = require('../config/keycloak-config.js').getKeycloak();



router.get ('/', keycloak.protect (), c.list); // any logged in person can list

router.get ('/:id', keycloak.protect ('user'), c.byId); // any user can view

router.post ('/', keycloak.protect ('admin'), c.create); // only admin can create

router.put ('/:id', keycloak.protect ('user'), c.update);

router.delete ('/:id', keycloak.protect ('admin', 'user'), c.remove);

module.exports = router;


