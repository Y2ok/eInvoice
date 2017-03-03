/**
 * Invoices Route.
 */

/**
 * Include libraries.
 */
const express = require('express');
const router = express.Router();
const invoices = require('../controllers/invoices');
const expressJwt = require('express-jwt');
const { secretToken } = require('../config');
const { setRole } = require('../middleware/index');

// Set expressJWT secret token for authorization
const requireAuth = expressJwt({
    secret: secretToken
});

/**
 * All routes are accessible only if authorized.
 */
router.all('*', requireAuth, setRole);

/**
 * Get all invoices route.
 */
router.get('/', invoices.getAll);

/**
 * Get a single invoice route.
 */
router.get('/:id', invoices.getSingle);

/**
 * Post an invoice route.
 */
router.post('/', invoices.createInvoice);

/**
 * Export router.
 */
module.exports = router;