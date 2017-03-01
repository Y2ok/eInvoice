/**
 * Validate helper.
 */

/**
 * Import required libraries.
 */
const response = require('./response');

/**
 * Module exports.
 */
module.exports = {
    validateAddUser,
    validatePatchUser,
    validateLogin,
    validateAddClient,
    validatePatchClient
}

/**
 * Validate create user data.
 * @public
 * @param {Object} req HTTP Request.
 * @returns {Object} List of error messages.
 */
function validateAddUser(req) {
    // Validate e-mail
    req.checkBody("email", "E-mail field must contain a valid e-mail!").isEmail();

    // Validate password
    req.checkBody("password", "Password must be from 6 to 30 characters long!").isLength({ min: 6, max: 30 });

    // Validate name
    req.checkBody("name", "Name field must contain only letters!").isAlpha();
    req.checkBody("name", "Name must be from 1 to 30 characters long!").isLength({ min: 1, max: 30 });

    // Validate surname
    req.checkBody("surname", "Surname field must contain only letters!").isAlpha();
    req.checkBody("surname", "Surname must be from 1 to 30 characters long!").isLength({ min: 1, max: 30 });

    // Validate Expected Calories
    req.checkBody("expectedCalories", "Expected calories must be a number!").isInt({ gt: 0 });

    // Validate role
    if (req.body.Role) {
        req.checkBody("role", "Role is unknown!").isIn(["User", "User Manager", "Admin"]);
    }

    // Check for errors
    return req.validationErrors();
}

/**
 * Validate patch user data.
 * @public
 * @param {Object} req HTTP Request.
 * @returns {Object} List of error messages.
 */
function validatePatchUser(req) {
    // Check which fields were passed
    for (let field in req.body) {
        if (field === "email") {
            // Validate e-mail
            req.checkBody("email", "E-mail field must contain a valid e-mail!").isEmail();
        }

        if (field === "password") {
            // Validate password
            req.checkBody("password", "Password must be from 6 to 30 characters long!").isLength({ min: 6, max: 30 });
        }

        if (field === "name") {
            // Validate name
            req.checkBody("name", "Name field must contain only letters!").isAlpha();
            req.checkBody("name", "Name must be from 1 to 30 characters long!").isLength({ min: 1, max: 30 });
        }

        if (field === "surname") {
            // Validate surname
            req.checkBody("surname", "Surname field must contain only letters!").isAlpha();
            req.checkBody("surname", "Surname must be from 1 to 30 characters long!").isLength({ min: 1, max: 30 });
        }

        if (field === "expectedCalories") {
            // Validate Expected Calories
            req.checkBody("expectedCalories", "Expected calories must be a number!").isInt({ gt: 0 });
        }

        if (field === "role") {
            // Validate role
            req.checkBody("role", "Role is unknown!").isIn(["User", "User Manager", "Admin"]);
        }
    }

    // Check for errors
    return req.validationErrors();
}

/**
 * Validate login input data.
 * @public
 * @param {Object} req HTTP Request.
 * @returns {Object} List of error messages.
 */
function validateLogin(req) {
    req.checkBody("email", response.errors.validation.validEmail).isEmail();
    req.checkBody("password", response.errors.validation.incorrecLength).isLength({ min: 6, max: 30 });

    // Check for errors
    return req.validationErrors();
}

/**
 * Validate patch client input data.
 * @public
 * @param {Object} req HTTP Request.
 * @returns {Object} List of error messages.
 */
function validatePatchClient(req) {
    // Check which fields were passed
    for (let field in req.body) {
        if (field === 'name') {
            // Validate name
            req.checkBody("name", response.errors.validation.isEmpty).isLength({ min: 1 });
            req.checkBody("name", response.errors.validation.isAlpha).isAlpha();
        }

        if (field === 'surname') {
            // Validate surname
            req.checkBody("surname", response.errors.validation.isEmpty).isLength({ min: 1 });
            req.checkBody("surname", response.errors.validation.isAlpha).isAlpha();
        }

        if (field === 'company_name') {
            // Validate company name
            req.checkBody("company_name", response.errors.validation.isEmpty).isLength({ min: 1 });
        }

        if (field === 'registration_nr') {
            // Validate registration number
            req.checkBody("registration_nr", response.errors.validation.isEmpty).isLength({ min: 1 });
        }

        if (field === 'address') {
            // Validate address
            req.checkBody("address", response.errors.validation.isEmpty).isLength({ min: 1 });
        }

        if (field === 'city') {
            // Validate city
            req.checkBody("city", response.errors.validation.isEmpty).isLength({ min: 1 });
        }

        if (field === 'country') {
            // Validate country
            req.checkBody("country", response.errors.validation.isEmpty).isLength({ min: 1 });
        }
    }
    // Check for errors
    return req.validationErrors();
}

/**
 * Validate add client input data.
 * @public
 * @param {Object} req HTTP Request.
 * @returns {Object} List of error messages.
 */
function validateAddClient(req) {
    // Validate name
    req.checkBody("name", response.errors.validation.isEmpty).isLength({ min: 1 });
    req.checkBody("name", response.errors.validation.isAlpha).isAlpha();

    // Validate surname
    req.checkBody("surname", response.errors.validation.isEmpty).isLength({ min: 1 });
    req.checkBody("surname", response.errors.validation.isAlpha).isAlpha();

    // Validate company name
    req.checkBody("company_name", response.errors.validation.isEmpty).isLength({ min: 1 });

    // Validate registration number
    req.checkBody("registration_nr", response.errors.validation.isEmpty).isLength({ min: 1 });

    // Validate address
    req.checkBody("address", response.errors.validation.isEmpty).isLength({ min: 1 });

    // Validate city
    req.checkBody("city", response.errors.validation.isEmpty).isLength({ min: 1 });

    // Validate country
    req.checkBody("country", response.errors.validation.isEmpty).isLength({ min: 1 });

    // Check for errors
    return req.validationErrors();
}