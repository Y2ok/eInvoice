const express = require('express');
const router = express.Router();

/*
Load All Routes
*/
const authenticationRoutes = require('./authentication');
const invoicesRoutes = require('./invoices');
const clientsRoutes = require('./clients');
const productsRoutes = require('./products');
const settingsRoutes = require('./settings');

/* Setup routes */
router.use('/', authenticationRoutes);
router.use('/invoices', invoicesRoutes);
router.use('/clients', clientsRoutes);
router.use('/products', productsRoutes);
router.use('/settings', settingsRoutes);

module.exports = router;
