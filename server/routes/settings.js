/**
 * Settings Route.
 */

/**
 * Include libraries.
 */
const express = require('express');
const router = express.Router();
const settings = require('../controllers/settings');
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
router.get('/', settings.getAll);

/**
 * Export router.
 */
module.exports = router;