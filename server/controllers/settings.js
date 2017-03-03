/**
 * Settings controller.
 */

/**
 * Load required libraries.
 */
const response = require('../helpers/response');
const validate = require('../helpers/validate');
const settings = require('../db/settings');

/**
 * Export modules.
 */
module.exports = {
    getAll,
    updateSettings,
    patchSettings
}

/**
 * Retrieves all settings.
 * @public
 * @param {Object} req HTTP Request object.
 * @param {Object} res HTTP Response object.
 * @returns {Object} Response object with response.
 */
function getAll(req, res) {
    settings.getAll()
        .then((data) => {
            // Return retrieved data
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
 * Updates all settings data.
 * @public
 * @param {Object} req HTTP Request object.
 * @param {Object} res HTTP Response object.
 * @returns {Object} Response object with response.
 */
function updateSettings(req, res) {
    // Validate update setting form
    let errors = validate.validateAddSettings(req);

    // If there are any errors return them
    if (errors) {
        const message = {
            errors
        };
        return response.reportMessage(400, message, res);
    }    

    // Setup insert data
    const settingsData = {        
        company_name: req.body.company_name,
        registration_nr: req.body.registration_nr,
        address: req.body.address,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country
    };

    return performUpdate(settingsData, req, res);
}

/**
 * Patch settings data.
 * @public
 * @param {Object} req HTTP Request object.
 * @param {Object} res HTTP Response object.
 * @returns {Object} Response object with response.
 */
function patchSettings(req, res) {
    // Validate patch settings form
    let errors = validate.validatePatchSettings(req);

    // If there are any errors return them
    if (errors) {
        const message = {
            errors
        };
        return response.reportMessage(400, message, res);
    }

    let settingsData = {};

    // Create dynamically settings data object
    for (let field in req.body) {
        if (['company_name', 'registration_nr', 'address', 'city', 'zip', 'country'].indexOf(field) > -1) {
            settingsData[field] = req.body[field];
        }
    }

    // Check if any changes will be done
    if (Object.keys(settingsData).length === 0) {
        const message = {
            errors: response.errors.general.noDataSent
        };

        return response.reportMessage(400, message, res);
    }    

    return performUpdate(settingsData, req, res);
}

/**
 * Update settings data in database.
 * @public
 * @param {Object} settingsData Settings data which will be updated.
 * @param {Object} req HTTP Request.
 * @param {Object} res HTTP Response.
 * @returns {Object} Response message.
 */
function performUpdate(settingsData, req, res) {
    settings.update(settingsData)
        .then(() => {
            // Settings has been updated, notify user
            const message = {
                success: response.success.general.dataUpdated,
            };

            return response.reportMessage(200, message, res);
        })
        .catch((error) => {
            // There is an internal error in database
            return response.reportMessage(500, undefined, res);
        });
}