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
	insert
};

/**
 * Create Clients object.
 * @private
 */
function Clients() {
	return knex('clients');
}

/**
 * Retrieves all clients.
 * @public
 * @returns {Object} Returned client object from database.
 */
function getAll() {
	return Clients().select('*').orderBy('id', 'asc');
}

/**
 * Retrieves single client data using passed id.
 * @public
 * @param {number} id Client's id.
 * @returns {Object} Returned client object from database.
 */
function getOne(id) {
	return Clients().select('name', 'surname', 'company_name', 'registration_nr', 'address', 'city', 'country').where('id', id).first();
}

/**
 * Inserts an entry in clients table.
 * @public
 * @param {Object} client Object with all client's data.
 * @returns {Object} Insert query response from database.
 */
function insert(client) {
	return Clients().insert(client);
}
