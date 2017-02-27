/**
 * Settings Route.
 */

/**
 * Include libraries.
 */
const express = require('express');
const router = express.Router();
const invoices = require('../controllers/invoices');
const expressJwt = require('express-jwt');
const { secretToken } = require('../config');
const { setRole, isAdmin } = require('../middleware/index');

// Set expressJWT secret token for authorization
const requireAuth = expressJwt({
    secret: secretToken
});

/**
 * All routes are accessible only if authorized.
 */
router.all('*', isAdmin, requireAuth, setRole);

/**
 * Get all settings route.
 */
router.get('/', invoices.getAll);

/**
 * Export router.
 */
module.exports = router;