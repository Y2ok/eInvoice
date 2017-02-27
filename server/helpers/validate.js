/**
 * Validate helper.
 */

/**
 * Module exports.
 */
module.exports = {
    validateAddUser,
    validatePatchUser,
    validateLogin,
    validateAddMeal,
    validatePatchMeal
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
 * Validate add meal data.
 * @public
 * @param {Object} req HTTP Request.
 * @returns {Object} List of error messages.
 */
function validateAddMeal(req) {
    // Validate userId
    req.checkBody("userid", "User Id is required!").notEmpty();
    req.checkBody("userid", "User Id must be an integer!").isInt();

    // Validate creation date
    req.checkBody("created", "Creation date is required!").notEmpty();
    req.checkBody("created", "Creation date format is incorrect!").isDate();

    // Validate calories
    req.checkBody("calories", "Calories must be entered!").notEmpty();
    req.checkBody("calories", "Calories must be a positive, numeric value!").isInt({gt: -1});

    // Check for errors
    return req.validationErrors();
}

/**
 * Validate patch meal data.
 * @public
 * @param {Object} req HTTP Request.
 * @returns {Object} List of error messages.
 */
function validatePatchMeal(req) {
    // Check which fields were passed
    for (let field in req.body) {
        if (field === "userid") {
            // Validate userId
            req.checkBody("userid", "User Id is required!").notEmpty();
            req.checkBody("userid", "User Id must be an integer!").isInt();
        }

        if (field === "created") {
            // Validate creation date
            req.checkBody("created", "Creation date is required!").notEmpty();
            req.checkBody("created", "Creation date format is incorrect!").isDate();
        }

        if (field === "calories") {
            // Validate calories
            req.checkBody("calories", "Calories must be entered!").notEmpty();
            req.checkBody("calories", "Calories must be a positive, numeric value!").isInt({gt: -1});
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
