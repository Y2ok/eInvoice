/**
 * Clients controller.
 */

/**
 * Load required libraries.
 */
const response = require('../helpers/response');
const validate = require('../helpers/validate');
const clients = require('../db/clients');

/**
 * Export modules.
 */
module.exports = {
    getAll,
    getSingle,
    createClient,
    updateClient,
    patchClient,
    deleteClient
}

/**
 * Retrieves all clients.
 * @public
 * @param {Object} req HTTP Request object.
 * @param {Object} res HTTP Response object.
 * @returns {Object} Response object with response.
 */
function getAll(req, res) {
    clients.getAll()
        .then((data) => {
            // Return retrieved data
            const message = {
                success: response.success.general.dataReturned,
                data
            };
            return response.reportMessage(200, message, res);
        })
        .catch((error) => {
            console.log(error);
            // Unexpected error happened, return error message.
            return response.reportMessage(500, undefined, res);
        });
}

/**
 * Retrieves single client using passed id.
 * @public
 * @param {Object} req HTTP Request object.
 * @param {Object} res HTTP Response object.
 * @returns {Object} Response object with response.
 */
function getSingle(req, res) {
    clients.getOne(req.params.id)
        .then((data) => {
            // Check if client exists
            if (data === undefined) {
                const message = {
                    errors: response.errors.general.notFound
                };
                return response.reportMessage(404, message, res);
            }

            // Everything is fine - return clients data
            const message = {
                success: response.success.general.dataReturned,
                data
            };
            return response.reportMessage(200, message, res);
            
        })
        .catch(() => {
            // Unexpected error happened, return error message.
            return response.reportMessage(500, undefined, res);
        });
}

/**
 * Create a client using passed data.
 * @public
 * @param {Object} req HTTP Request object.
 * @param {Object} res HTTP Response object.
 * @returns {Object} Response object with response.
 */
function createClient(req, res) {
    // Validate create client form
    let errors = validate.validateCreateClient(req);

    // If there are any errors return them
    if (errors) {
        const message = {
            errors
        };
        return response.reportMessage(400, message, res);
    }    

    // Setup insert data
    const client = {        
        name: req.body.name,
        surname: req.body.surname,
        company_name: req.body.company_name,
        registration_nr: req.body.registration_nr,
        address: req.body.address,
        city: req.body.city,
        country: req.body.country
    };

    // Let's insert client in database
    clients.insert(client)
        .then((result) => {
            // client has been added, notify user
            const message = {
                success: response.success.general.dataAdded,
            };
            return response.reportMessage(201, message, res);
        })
        .catch((error) => {
            // Check if client exists
            if (error.code === response.errors.duplicateEntryCode) {
                const message = {
                    errors: response.errors.general.notUnique
                };
                return response.reportMessage(400, message, res);
            }

            // There is an internal error in database
            return response.reportMessage(500, undefined, res);
        });    
}

/**
 * Updates all clients data.
 * @public
 * @param {Object} req HTTP Request object.
 * @param {Object} res HTTP Response object.
 * @returns {Object} Response object with response.
 */
function updateClient(req, res) {
    return response.reportMessage(200, "Update client", res);
}

/**
 * Patch clients data.
 * @public
 * @param {Object} req HTTP Request object.
 * @param {Object} res HTTP Response object.
 * @returns {Object} Response object with response.
 */
function patchClient(req, res) {
    return response.reportMessage(200, "Patch client", res);
}

/**
 * Deletes a single client.
 * @public
 * @param {Object} req HTTP Request object.
 * @param {Object} res HTTP Response object.
 * @returns {Object} Response object with response.
 */

function deleteClient(req, res) {
    return response.reportMessage(200, "Delete client", res);
}