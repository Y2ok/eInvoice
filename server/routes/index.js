const express = require('express');
const router = express.Router();

/*
Load All Routes
*/
const authenticationRoutes = require('./authentication');

/* Setup routes */
router.use('/', authenticationRoutes);

module.exports = router;
