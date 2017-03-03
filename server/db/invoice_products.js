/**
 * Include required files.
 */
var knex = require('./knex.js');

/**
 * Module exports with all exported functions.
 */
module.exports = {
    getAll,
    insert,
    update,
    deleteInvoiceProduct,
    deleteAllInvoiceProducts
};

/**
 * Create Invoice products object.
 * @private
 */
function InvoiceProducts() {
	return knex('invoice_products');
}

/**
 * Retrieves all invoice products.
 * @public
 * @param {number} invoice_id Invoice id for which products will be returned.
 * @returns {Object} Returned invoice object from database.
 */
function getAll(invoice_id) {
	return InvoiceProducts().select('product_id', 'quantity').where('invoice_id', invoice_id).orderBy('id', 'asc');
}

/**
 * Inserts an entry in invoice products table.
 * @public
 * @param {Object} invoice_products Object with all invoice products data.
 * @returns {Object} Insert query response from database.
 */
function insert(invoice_products) {
	return InvoiceProducts().insert(invoice_products);
}

/**
 * Updates an entry in invoice products table.
 * @public
 * @param {Object} invoice_products Invoice prodcuts data.
 * @param {number} id Invoice products id.
 * @returns {Object} Update query response from database.
 */
function update(invoice_products, id) {
	return InvoiceProducts().where('id', id).update(invoice_products);
}

/**
 * Deletes an entry in invoices products table.
 * @public
 * @param {number} id Invoice products id.
 * @returns {Object} Returned response from database.
 */
function deleteInvoiceProduct(id) {
	return InvoiceProducts().where('id', id).delete();
}

/**
 * Deletes all invoice products.
 * @public
 * @param {number} invoice_id Invoice id.
 * @returns {Object} Returned response from database.
 */
function deleteAllInvoiceProducts(invoice_id) {
    return InvoiceProducts().where('invoice_id', invoice_id).delete();
}