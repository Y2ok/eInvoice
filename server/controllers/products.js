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
    getAll,
    getSingle,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct
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

/**
 * Retrieves single product using passed id.
 * @public
 * @param {Object} req HTTP Request object.
 * @param {Object} res HTTP Response object.
 * @returns {Object} Response object with response.
 */
function getSingle(req, res) {
    return response.reportMessage(200, "single product", res);
}

/**
 * Create a product using passed data.
 * @public
 * @param {Object} req HTTP Request object.
 * @param {Object} res HTTP Response object.
 * @returns {Object} Response object with response.
 */
function createProduct(req, res) {
    return response.reportMessage(201, "create product", res);
}

/**
 * Updates all products data.
 * @public
 * @param {Object} req HTTP Request object.
 * @param {Object} res HTTP Response object.
 * @returns {Object} Response object with response.
 */
function updateProduct(req, res) {
    return response.reportMessage(200, "update product", res);
}


/**
 * Patch products data.
 * @public
 * @param {Object} req HTTP Request object.
 * @param {Object} res HTTP Response object.
 * @returns {Object} Response object with response.
 */
function patchProduct(req, res) {
    return response.reportMessage(200, "patch product", res);
}

/**
 * Deletes a single product.
 * @public
 * @param {Object} req HTTP Request object.
 * @param {Object} res HTTP Response object.
 * @returns {Object} Response object with response.
 */
function deleteProduct(req, res) {
    return response.reportMessage(200, "delete product", res);
}