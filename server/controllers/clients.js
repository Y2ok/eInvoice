/**
 * Clients controller.
 */

/**
 * Load required libraries.
 */
const response = require('../helpers/response');
const validate = require('../helpers/validate');
const clients = require('../db/clients');

/**
 * Export modules.
 */
module.exports = {
    getAll,
    getSingle,
    createClient,
    updateClient,
    patchClient,
    deleteClient
}

/**
 * Retrieves all clients.
 * @public
 * @param {Object} req HTTP Request object.
 * @param {Object} res HTTP Response object.
 * @returns {Object} Response object with response.
 */
function getAll(req, res) {
    return response.reportMessage(200, "clients", res);
}

/**
 * Retrieves single client using passed id.
 * @public
 * @param {Object} req HTTP Request object.
 * @param {Object} res HTTP Response object.
 * @returns {Object} Response object with response.
 */
function getSingle(req, res) {
    return response.reportMessage(200, "single client", res);
}

/**
 * Create a client using passed data.
 * @public
 * @param {Object} req HTTP Request object.
 * @param {Object} res HTTP Response object.
 * @returns {Object} Response object with response.
 */
function createClient(req, res) {
    return response.reportMessage(201, "Create client", res);
}

/**
 * Updates all clients data.
 * @public
 * @param {Object} req HTTP Request object.
 * @param {Object} res HTTP Response object.
 * @returns {Object} Response object with response.
 */
function updateClient(req, res) {
    return response.reportMessage(200, "Update client", res);
}

/**
 * Patch clients data.
 * @public
 * @param {Object} req HTTP Request object.
 * @param {Object} res HTTP Response object.
 * @returns {Object} Response object with response.
 */
function patchClient(req, res) {
    return response.reportMessage(200, "Patch client", res);
}

/**
 * Deletes a single client.
 * @public
 * @param {Object} req HTTP Request object.
 * @param {Object} res HTTP Response object.
 * @returns {Object} Response object with response.
 */

function deleteClient(req, res) {
    return response.reportMessage(200, "Delete client", res);
}