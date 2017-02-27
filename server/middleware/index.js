/**
 * Middleware for checking access.
 */

/**
 * Load all required libraries.
 */
const users = require('../db/users');
const response = require('../helpers/response');

/**
 * Exports all modules.
 */
module.exports = {
    isAdmin,
    isUserManager,
    isNotUser,
    setRole
}

/**
 * Checks if user is admin.
 * @public
 * @param {Object} req HTTP Request.
 * @param {Object} res HTTP Response.
 * @param {Function} next Callback function.
 * @returns {Object} HTTP Response.
 */
function isAdmin(req, res, next) {
    users.getOne(req.user.id)
        .then((data) => {
            // If user is not authorized, return message
            if (data.role !== "Admin") {
                const message = {
                    errors: "User is not authorized to do this action!"
                };
                return response.reportMessage(403, message, res);
            }   

            // User is authorized
            return next();
        })
        .catch((error) => {
            return response.reportMessage(500, undefined, res);
        });
}

/**
 * Checks if user is User Manager.
 * @public
 * @param {Object} req HTTP Request.
 * @param {Object} res HTTP Response.
 * @param {Function} next Callback function.
 * @returns {Object} HTTP Response.
*/
function isUserManager(req, res, next) {
    users.getOne(req.user.id)
        .then((data) => {
            // If user is not authorized, return message
            if (data.role !== "User Manager") {
                const message = {
                    errors: "User is not authorized to do this action!"
                };
                return response.reportMessage(403, message, res);
            }   

            // User is authorized
            return next();
        })
        .catch((error) => {
            return response.reportMessage(500, undefined, res);
        });
}

/**
 * Checks if user's role is not User.
 * @public
 * @param {Object} req HTTP Request.
 * @param {Object} res HTTP Response.
 * @param {Function} next Callback function.
 * @returns {Object} HTTP Response.
*/
function isNotUser(req, res, next) {
    users.getOne(req.user.id)
        .then((data) => {
            // If user is not authorized, return message
            if (data.role === "User") {
                const message = {
                    errors: "User is not authorized to do this action!"
                };
                return response.reportMessage(403, message, res);
            }   

            // User is authorized
            return next();
        })
        .catch((error) => {
            return response.reportMessage(500, undefined, res);
        });
}

/**
 * Sets roles for user.
 * @public
 * @param {Object} req HTTP Request.
 * @param {Object} res HTTP Response.
 * @param {Function} next Callback function.
 * @returns {Object} HTTP Response.
*/
function setRole(req, res, next) {
    users.getOne(req.user.id)
        .then((data) => {
            // Save role settings
            req.userIsAdmin = (data.role === "Admin");
            req.userIsUserManager = (data.role === "User Manager");

            return next();
        })
        .catch((error) => {
            return response.reportMessage(500, undefined, res);
        });
}