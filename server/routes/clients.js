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
router.all('*', requireAuth, isAdmin, setRole);

/**
 * Get all clients route.
 */
router.get('/', clients.getAll);

/**
 * Get single client route.
 */
router.get('/:id', clients.getSingle);

/**
 * Add a client route.
 */
router.post('/', clients.createClient);

/**
 * Update a client route.
 */
router.put('/', clients.updateClient);

/**
 * Patch a client route.
 */
router.patch('/', clients.patchClient);

/**
 * Delete a client route.
 */
router.delete('/:id', clients.deleteClient);

/**
 * Export router.
 */
module.exports = router;