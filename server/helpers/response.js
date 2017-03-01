/**
 * Response handler helper.
 */

// List of error codes
const errors = {
    authorization: {
        incorrectData: "incorrect_data"
    },
    general: {
        unexpected: "unexpected_error",
        notFound: "resource_not_found",
        notUnique: "data_not_unique",
        noDataSent: "no_data_sent"
    },
    validation: {
        isEmpty: "is_empty",
        isAlpha: "is_alpha",
        validEmail: "is_not_email",
        incorrectLength: "is_incorrect_length"
    },
    duplicateEntryCode: '23505',
    foreignKeyNotFound: '23503'
}

// List of success codes
const success = {
    general: {
        dataReturned: "data_returned_successfully",
        dataAdded: "data_added_successfully",
        dataUpdated: "data_updated_successfully",
        dataDeleted: "data_deleted_succesffully"
    }
};

/**
 * Export modules.
 */
module.exports = {
    reportMessage,
    errors,
    success
}

/**
 * Provide error/success messages for the application.
 * @public
 * @param {number} code HTTP error/success code which will be returned.
 * @param {Object|undefined} message Error/success message object which will be returned.
 * @param {Object} res HTTP response object.
 * @returns {Object} HTTP response with code and message.
 */
function reportMessage(code, message, res) {
    // Return error/success with message, otherwise - return just an error/success
    if (message !== undefined) {
        return res.status(code).json(message);
    }
    const errors = {
        errors: this.errors.general.unexpected 
    };
    return res.status(code).json(errors);
}