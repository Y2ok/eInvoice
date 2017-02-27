/**
 * Products controller.
 */

/**
 * Load required libraries.
 */
const response = require('../helpers/response');
const validate = require('../helpers/validate');
const products = require('../db/products');

/**
 * Export modules.
 */
module.exports = {
    getAll
}

/**
 * Retrieves all products.
 * @public
 * @param {Object} req HTTP Request object.
 * @param {Object} res HTTP Response object.
 * @returns {Object} Response object with response.
 */
function getAll(req, res) {
    return response.reportMessage(200, "products", res);
}

