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
 * Create Settings object.
 * @private
 */
function Settings() {
	return knex('settings');
}