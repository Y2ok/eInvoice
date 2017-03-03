/**
 * Include required files.
 */
var knex = require('./knex.js');

/**
 * Module exports with all exported functions.
 */
module.exports = {
	getAll,
	update
};

/**
 * Create Settings object.
 * @private
 */
function Settings() {
	return knex('settings');
}

/**
 * Retrieves all settings.
 * @public
 * @returns {Object} Returned client object from database.
 */
function getAll() {
	return Settings().select('*').first();
}

/**
 * Updates an entry in settings table.
 * @public
 * @param {Object} settings Settings's data.
 * @returns {Object} Update query response from database.
 */
function update(settings) {
	return Settings().update(settings);
}
