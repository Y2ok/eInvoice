/**
 * Invoices controller.
 */

/**
 * Load required libraries.
 */
const response = require('../helpers/response');
const validate = require('../helpers/validate');
const invoices = require('../db/invoices');
const products = require('./products');
const invoice_products = require('../db/invoice_products');

/**
 * Export modules.
 */
module.exports = {
    getAll,
    getSingle,
    createInvoice,
    deleteInvoice
}

/**
 * Retrieves all invoices.
 * @public
 * @param {Object} req HTTP Request object.
 * @param {Object} res HTTP Response object.
 * @returns {Object} Response object with response.
 */
function getAll(req, res) {
    invoices.getAll()
        .then((data) => {
            // Return retrieved data
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
 * Retrieves single invoice using passed id.
 * @public
 * @param {Object} req HTTP Request object.
 * @param {Object} res HTTP Response object.
 * @returns {Object} Response object with response.
 */
function getSingle(req, res) {
    invoices.getOne(req.params.id)
        .then((data) => {
            // Check if invoice exists
            if (data === undefined) {
                const message = {
                    errors: response.errors.general.notFound
                };
                return response.reportMessage(404, message, res);
            }

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
 * Retrieves invoice total price.
 * @param {Object} req - HTTP Request Object. 
 * @param {Object} res - Http Response Object. 
 * @param {Object} next - Callback function.
 * @returns {number} total price for the invoice. 
 */
function retrieveInvoicePrice(req, res, next) {
    return new Promise((resolve, reject) => {
        let price = 0;
        let promises = [];

        // Let's retrieve invoice price.
        for (let invoice_product_nr = 0; invoice_product_nr < req.body.invoice_products.length; invoice_product_nr++) {
            promises.push(products.getById(req, req.body.invoice_products[invoice_product_nr].product_id, next).then((resolv) => {
                price += resolv.data.price;
            })
            .catch(next));
        }

        // Wait for all promises to return.
        Promise.all(promises).then(() => {
            return resolve(price);
        })
        .catch(next);
    });
}

/**
 * Create an invoice using passed data.
 * @public
 * @param {Object} req HTTP Request object.
 * @param {Object} res HTTP Response object.
 * @param {Object} next - Callback function.
 * @returns {Object} Response object with response.
 */
function createInvoice(req, res, next) {
    // // Validate create client form
    // let errors = validate.validateAddClient(req);

    // If there are any errors return them
    if (false) {
        const message = {
            errors
        };
        return response.reportMessage(400, message, res);
    }    
    
    // Let's retrieve price for the invoice
    retrieveInvoicePrice(req, res, next).then((resolve) => {
        // Setup insert data for invoice
        const invoice = {        
            client_id: req.body.invoice.client_id,
            creation_date: req.body.invoice.creation_date,
            price: resolve,
            price_vat: resolve + (resolve * req.body.invoice.vat / 100),
            vat: req.body.invoice.vat,
            discount: req.body.invoice.discount
        };

        // Let's insert invoice in database
        invoices.insert(invoice)
            .then((result) => {
                // Let's insert invoice products
                for (let invoice_product_nr = 0; invoice_product_nr < req.body.invoice_products.length; invoice_product_nr++) {
                    let invoice_product = {
                        invoice_id: result[0],
                        product_id: req.body.invoice_products[invoice_product_nr].product_id,
                        quantity: req.body.invoice_products[invoice_product_nr].quantity
                    };
                    invoice_products.insert(invoice_product)
                        .catch(next);
                }

                // invoice has been added, notify user
                const message = {
                    success: response.success.general.dataAdded,
                };
                return response.reportMessage(201, message, res);
            })
            .catch(next);           
    })
    .catch(next);
}


/**
 * Deletes a single invoice.
 * @public
 * @param {Object} req HTTP Request object.
 * @param {Object} res HTTP Response object.
 * @param {Object} next - Callback function.
 * @returns {Object} Response object with response.
 */
function deleteInvoice(req, res, next) {
    // Let's check if invoice exists.
    invoices.getOne(req.params.id)
        .then((data) => {
            // Check if invoice exists
            if (data.length === 0) {
                const message = {
                    errors: response.errors.general.notFound
                };
                return response.reportMessage(404, message, res);
            }     

            // Delete invoice products
            invoices.deleteInvoiceProducts(req.params.id)
                .then((result) => {
                    // Delete invoice by passed id
                    invoices.deleteInvoice(req.params.id)
                        .then((result) => {
                            const message = {
                                success: response.success.general.dataDeleted
                            };
                            return response.reportMessage(200, message, res);
                        })
                        .catch(next);
                })
                .catch(next);
        })
        .catch(next);
}