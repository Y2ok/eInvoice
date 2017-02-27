/**
 * Settings controller.
 */

/**
 * Load required libraries.
 */
const response = require('../helpers/response');
const validate = require('../helpers/validate');
const settings = require('../db/settings');

/**
 * Export modules
 */
module.exports = {
    getAll
}

/**
 * Retrieves all settings
 * @public
 * @param {Object} req HTTP Request object.
 * @param {Object} res HTTP Response object.
 * @returns {Object} Response object with response.
 */
function getAll(req, res) {
    return response.reportMessage(200, "settings", res);
}

