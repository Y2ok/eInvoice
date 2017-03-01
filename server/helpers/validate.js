/**
 * Validate helper.
 */

/**
 * Module exports.
 */
module.exports = {
    validateAddUser,
    validatePatchUser,
    validateLogin
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
    req.checkBody("expectedCalories", "Expected calories must be a number!").isInt({gt: 0});

    // Validate role
    if(req.body.Role) {
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
            req.checkBody("expectedCalories", "Expected calories must be a number!").isInt({gt: 0});
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
    req.checkBody("email", "E-mail field must contain a valid e-mail!").isEmail();
    req.checkBody("password", "Password must be from 6 to 30 characters long!").isLength({ min: 6, max: 30 });

    // Check for errors
    return req.validationErrors();
}
