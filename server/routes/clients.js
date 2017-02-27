/**
 * Clients Route.
 */

/**
 * Include libraries.
 */
const express = require('express');
const router = express.Router();
const clients = require('../controllers/clients');
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
 * Get all clients route.
 */
router.get('/', clients.getAll);

/**
 * Export router.
 */
module.exports = router;