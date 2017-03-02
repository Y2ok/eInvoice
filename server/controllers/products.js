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
    products.getAll()
        .then((data) => {
            // Return retrieved data
            const message = {
                success: response.success.general.dataReturned,
                data
            };
            return response.reportMessage(200, message, res);
        })
        .catch((error) => {
            // Unexpected error happened, return error message.
            return response.reportMessage(500, undefined, res);
        });
}

/**
 * Retrieves single product using passed id.
 * @public
 * @param {Object} req HTTP Request object.
 * @param {Object} res HTTP Response object.
 * @returns {Object} Response object with response.
 */
function getSingle(req, res) {
    products.getOne(req.params.id)
        .then((data) => {
            // Check if product exists
            if (data === undefined) {
                const message = {
                    errors: response.errors.general.notFound
                };
                return response.reportMessage(404, message, res);
            }

            // Everything is fine - return products data
            const message = {
                success: response.success.general.dataReturned,
                data
            };
            return response.reportMessage(200, message, res);
            
        })
        .catch(() => {
            // Unexpected error happened, return error message.
            return response.reportMessage(500, undefined, res);
        });
}

/**
 * Create a product using passed data.
 * @public
 * @param {Object} req HTTP Request object.
 * @param {Object} res HTTP Response object.
 * @returns {Object} Response object with response.
 */
function createProduct(req, res) {
    // Validate create product form
    let errors = validate.validateAddProduct(req);

    // If there are any errors return them
    if (errors) {
        const message = {
            errors
        };
        return response.reportMessage(400, message, res);
    }    

    // Setup insert data
    const product = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description
    };

    // Let's insert product in database
    products.insert(product)
        .then((result) => {
            // product has been added, notify user
            const message = {
                success: response.success.general.dataAdded,
            };
            return response.reportMessage(201, message, res);
        })
        .catch((error) => {
            // Check if product data are unique
            if (error.code === response.errors.duplicateEntryCode) {
                const message = {
                    errors: response.errors.general.notUnique
                };
                return response.reportMessage(400, message, res);
            }

            // There is an internal error in database
            return response.reportMessage(500, undefined, res);
        });    
}

/**
 * Updates all products data.
 * @public
 * @param {Object} req HTTP Request object.
 * @param {Object} res HTTP Response object.
 * @returns {Object} Response object with response.
 */
function updateProduct(req, res) {    
    // Validate update product form
    let errors = validate.validateAddProduct(req);

    // If there are any errors return them
    if (errors) {
        const message = {
            errors
        };
        return response.reportMessage(400, message, res);
    }    

    // Setup insert data
    const productData = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description
    };

    return performUpdate(productData, req, res);
}


/**
 * Patch products data.
 * @public
 * @param {Object} req HTTP Request object.
 * @param {Object} res HTTP Response object.
 * @returns {Object} Response object with response.
 */
function patchProduct(req, res) {
    // Validate patch product form
    let errors = validate.validatePatchProduct(req);

    // If there are any errors return them
    if (errors) {
        const message = {
            errors
        };
        return response.reportMessage(400, message, res);
    }

    let productData = {};

    // Create dynamically product's data object
    for (let field in req.body) {
        if (['name', 'price', 'description'].indexOf(field) > -1) {
            productData[field] = req.body[field];
        }
    }

    // Check if any changes will be done
    if (Object.keys(productData).length === 0) {
        const message = {
            errors: response.errors.general.noDataSent
        };

        return response.reportMessage(400, message, res);
    }    

    return performUpdate(productData, req, res);
}

/**
 * Deletes a single product.
 * @public
 * @param {Object} req HTTP Request object.
 * @param {Object} res HTTP Response object.
 * @returns {Object} Response object with response.
 */
function deleteProduct(req, res) {
    // Let's check if product exists.
    products.getOne(req.params.id)
        .then((data) => {
            // Check if product exists
            if (data === undefined) {
                const message = {
                    errors: response.errors.general.notFound
                };
                return response.reportMessage(404, message, res);
            }     

            // Delete product by passed id
            products.deleteProducts(req.params.id)
                .then((result) => {
                    const message = {
                        success: response.success.general.dataDeleted
                    };
                    return response.reportMessage(200, message, res);
                })
                .catch((error) => {
                    return response.reportMessage(500, undefined, res);
                });
        })
        .catch(() => {
            // There is an internal error in database
            return response.reportMessage(500, undefined, res);
        })
}

/**
 * Update product data in database.
 * @public
 * @param {Object} productdata product data which will be updated.
 * @param {Object} req HTTP Request.
 * @param {Object} res HTTP Response.
 * @returns {Object} Response message.
 */
function performUpdate(productData, req, res) {
    // Let's check if product exists.
    products.getOne(req.params.id)
        .then((data) => {
            // Check if product exists
            if (data === undefined) {
                const message = {
                    errors: response.errors.general.notFound
                };
                return response.reportMessage(404, message, res);
            }       
            
            // Update product
            products.update(productData, req.params.id)
                .then(() => {
                    // Product has been updated, notify user
                    const message = {
                        success: response.success.general.dataUpdated,
                    };

                    return response.reportMessage(200, message, res);
                })
                .catch((error) => {
                    // Check if product data are unique
                    if (error.code === response.errors.duplicateEntryCode) {
                        const message = {
                            errors: response.errors.general.notUnique
                        };
                        return response.reportMessage(400, message, res);
                    }

                    // There is an internal error in database
                    return response.reportMessage(500, undefined, res);
                });
        })
        .catch(() => {
            // There is an internal error in database
            return response.reportMessage(500, undefined, res);
        });
}