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
	deleteClient
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
	return Clients().select('name', 'surname', 'company_name', 'registration_nr', 'address', 'city', 'zip', 'country').where('id', id).first();
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

/**
 * Updates an entry in clients table.
 * @public
 * @param {Object} client Client's data.
 * @param {number} id Client's id.
 * @returns {Object} Update query response from database.
 */
function update(client, id) {
	return Clients().where('id', id).update(client);
}

/**
 * Deletes an entry in clients table.
 * @public
 * @param {number} id Client's id.
 * @returns {Object} Returned response from database.
 */
function deleteClient(id) {
	return Clients().where('id', id).delete();
}