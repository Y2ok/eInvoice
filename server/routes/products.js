/**
 * Products Route.
 */

/**
 * Include libraries.
 */
const express = require('express');
const router = express.Router();
const products = require('../controllers/products');
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
router.all('*', requireAuth, isAdmin, setRole);

/**
 * Get all products route.
 */
router.get('/', products.getAll);

/**
 * Export router.
 */
module.exports = router;