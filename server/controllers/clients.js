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
    let errors = validate.validateAddClient(req);

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
            // Check if client data are unique
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
    // Validate update client form
    let errors = validate.validateAddClient(req);

    // If there are any errors return them
    if (errors) {
        const message = {
            errors
        };
        return response.reportMessage(400, message, res);
    }    

    // Setup insert data
    const clientData = {        
        name: req.body.name,
        surname: req.body.surname,
        company_name: req.body.company_name,
        registration_nr: req.body.registration_nr,
        address: req.body.address,
        city: req.body.city,
        country: req.body.country
    };

    return performUpdate(clientData, req, res);
}

/**
 * Patch clients data.
 * @public
 * @param {Object} req HTTP Request object.
 * @param {Object} res HTTP Response object.
 * @returns {Object} Response object with response.
 */
function patchClient(req, res) {
    // Validate patch client form
    let errors = validate.validatePatchClient(req);

    // If there are any errors return them
    if (errors) {
        const message = {
            errors
        };
        return response.reportMessage(400, message, res);
    }

    let clientData = {};

    // Create dynamically client's data object
    for (let field in req.body) {
        if (['name', 'surname', 'company_name', 'registration_nr', 'address', 'city', 'country'] .indexOf(field) > -1) {
            clientData[field] = req.body[field];
        }
    }

    // Check if any changes will be done
    if (Object.keys(clientData).length === 0) {
        const message = {
            errors: response.errors.general.noDataSent
        };

        return response.reportMessage(400, message, res);
    }    

    return performUpdate(clientData, req, res);
}

/**
 * Deletes a single client.
 * @public
 * @param {Object} req HTTP Request object.
 * @param {Object} res HTTP Response object.
 * @returns {Object} Response object with response.
 */

function deleteClient(req, res) {
    // Let's check if client exists.
    clients.getOne(req.params.id)
        .then((data) => {
            // Check if client exists
            if (data === undefined) {
                const message = {
                    errors: response.errors.general.notFound
                };
                return response.reportMessage(404, message, res);
            }     

            // Delete client by passed id
            clients.deleteClient(req.params.id)
                .then((result) => {
                    const message = {
                        success: response.success.general.dataDeleted
                    };
                    return response.reportMessage(200, message, res);
                })
                .catch((error) => {
                    return response.reportMessage(500, undefined, res);
                });
        })
        .catch(() => {
            // There is an internal error in database
            return response.reportMessage(500, undefined, res);
        })
}

/**
 * Update client data in database.
 * @public
 * @param {Object} req HTTP Request.
 * @param {Object} res HTTP Response.
 * @returns {Object} Response message.
 */
function performUpdate(clientData, req, res) {
    // Let's check if client exists.
    clients.getOne(req.params.id)
        .then((data) => {
            // Check if client exists
            if (data === undefined) {
                const message = {
                    errors: response.errors.general.notFound
                };
                return response.reportMessage(404, message, res);
            }       
            
            // Update client
            clients.update(clientData, req.params.id)
                .then(() => {
                    // Client has been updated, notify user
                    const message = {
                        success: response.success.general.dataUpdated,
                    };

                    return response.reportMessage(200, message, res);
                })
                .catch((error) => {
                    // Check if client data are unique
                    if (error.code === response.errors.duplicateEntryCode) {
                        const message = {
                            errors: response.errors.general.notUnique
                        };
                        return response.reportMessage(400, message, res);
                    }

                    // There is an internal error in database
                    return response.reportMessage(500, undefined, res);
                });
        })
        .catch(() => {
            // There is an internal error in database
            return response.reportMessage(500, undefined, res);
        });
}