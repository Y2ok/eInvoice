/**
 * Invoices controller.
 */

/**
 * Load required libraries.
 */
const response = require('../helpers/response');
const validate = require('../helpers/validate');
const invoices = require('../db/invoices');
const invoice_products = require('../db/invoice_products');

/**
 * Export modules.
 */
module.exports = {
    getAll,
    getSingle,
    createInvoice
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
            console.log(error);
            // Unexpected error happened, return error message.
            return response.reportMessage(500, undefined, res);
        });
}

/**
 * Create an invoice using passed data.
 * @public
 * @param {Object} req HTTP Request object.
 * @param {Object} res HTTP Response object.
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

    // Setup insert data for invoice
    const invoice = {        
        client_id: req.body.invoice.client_id,
        creation_date: req.body.invoice.creation_date,
        price: req.body.invoice.price,
        price_vat: req.body.invoice.price_vat,
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
                    .then(() => {
                        next();
                    })
                    .catch((error) => {
                        console.log(error);
                        // There is an internal error in database
                        return response.reportMessage(500, undefined, res);
                    });
            }

            // invoice has been added, notify user
            const message = {
                success: response.success.general.dataAdded,
            };
            return response.reportMessage(201, message, res);
        })
        .catch((error) => {
            console.log(error);
            // There is an internal error in database
            return response.reportMessage(500, undefined, res);
        });    
}