/**
 * Include required files.
 */
var knex = require('./knex.js');

/**
 * Module exports with all exported functions.
 */
module.exports = {
};

/**
 * Create Products object.
 * @private
 */
function Products() {
	return knex('products');
}