/**
 * Include required files.
 */
var knex = require('./knex.js');

/**
 * Module exports with all exported functions.
 */
module.exports = {
	getAll,
	getOne,
	update,
	insert,
	deleteInvoice
};

/**
 * Create Invoices object.
 * @private
 */
function Invoices() {
	return knex('invoices');
}

/**
 * Retrieves all invoices.
 * @public
 * @returns {Object} Returned invoice object from database.
 */
function getAll() {
	return Invoices().select('*').orderBy('id', 'asc');
}

/**
 * Retrieves single invoice data using passed id.
 * @public
 * @param {number} id Invoice's id.
 * @returns {Object} Returned invoice object from database.
 */
function getOne(id) {
	return Invoices().select(
		'invoices.client_id', 
		'invoices.creation_date', 
		'invoices.price', 
		'invoices.price_vat', 
		'invoices.vat', 
		'invoices.discount', 
		'invoice_products.quantity', 
		'products.name', 
		'products.price as productPrice', 
		'products.description'
	)
		.innerJoin('invoice_products', 'invoices.id', 'invoice_products.invoice_id')
		.innerJoin('products', 'products.id', 'invoice_products.product_id')
		.where('invoices.id', id);
}

/**
 * Inserts an entry in invoices table.
 * @public
 * @param {Object} invoice Object with all invoice's data.
 * @returns {Object} Insert query response from database.
 */
function insert(invoice) {
	return Invoices().insert(invoice).returning('id');
}

/**
 * Updates an entry in invoice table.
 * @public
 * @param {Object} invoice Invoice's data.
 * @param {number} id Invoice's id.
 * @returns {Object} Update query response from database.
 */
function update(invoice, id) {
	return Invoices().where('id', id).update(invoice);
}

/**
 * Deletes an entry in invoices table.
 * @public
 * @param {number} id Invoice's id.
 * @returns {Object} Returned response from database.
 */
function deleteInvoice(id) {
	return Invoices().where('id', id).delete();
}