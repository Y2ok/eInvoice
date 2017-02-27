/**
 * Include required files.
 */
var knex = require('./knex.js');

/**
 * Module exports with all exported functions
 */
module.exports = {
};

/**
 * Create Invoices object.
 * @private
 */
function Invoices() {
	return knex('invoices');
}