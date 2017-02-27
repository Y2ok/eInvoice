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
 * Create Clients object.
 * @private
 */
function Clients() {
	return knex('clients');
}