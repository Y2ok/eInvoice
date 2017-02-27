/**
 * Authentication Route.
 */

/**
 * Include libraries.
 */
const express = require('express');
const router = express.Router();
const authentication = require('../controllers/authentication');

/**
 * Login route.
 */
router.post('/login', authentication.login);

/**
 * Export router.
 */
module.exports = router;