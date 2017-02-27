const express = require('express');
const router = express.Router();

/*
Load All Routes
*/
const authenticationRoutes = require('./authentication');
const invoicesRoutes = require('./invoices');

/* Setup routes */
router.use('/', authenticationRoutes);
router.use('/invoices', invoicesRoutes);

module.exports = router;
