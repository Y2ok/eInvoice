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
	insert,
	update,
	deleteProduct
};

/**
 * Create Products object.
 * @private
 */
function Products() {
	return knex('products');
}

/**
 * Retrieves all products.
 * @public
 * @returns {Object} Returned products object from database.
 */
function getAll() {
	return Products().select('*').orderBy('id', 'asc');
}

/**
 * Retrieves single product data using passed id.
 * @public
 * @param {number} id Product's id.
 * @returns {Object} Returned product object from database.
 */
function getOne(id) {
	return Products().select('name', 'price', 'description').where('id', id).first();
}

/**
 * Inserts an entry in products table.
 * @public
 * @param {Object} product Object with all product's data.
 * @returns {Object} Insert query response from database.
 */
function insert(product) {
	return Products().insert(product);
}

/**
 * Updates an entry in products table.
 * @public
 * @param {Object} product Product's data.
 * @param {number} id Product's id.
 * @returns {Object} Update query response from database.
 */
function update(product, id) {
	return Products().where('id', id).update(product);
}

/**
 * Deletes an entry in products table.
 * @public
 * @param {number} id Product's id.
 * @returns {Object} Returned response from database.
 */
function deleteProduct(id) {
	return Products().where('id', id).delete();
}