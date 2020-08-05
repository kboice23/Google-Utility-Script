//const Rollbar = require("rollbar");
//const rollbar = new Rollbar(process.env.ROLLBAR_APP_ID);

/**
 * @class
 * @classdesc Handles any errors we catch in try/catch block throughout the Node app
 * @member Errors
 * @param {string} errorLocation - The class or function in which the error occurred
 * @param {string} errorDescription - A description of the error that will help with debugging
 * @exports HandleGlobalErrors
 * @returns {Promise} Error Log
 * @author Keith Boice
 */
class HandleGlobalErrors extends Error {
    /**
     * @constructor
     * @param errorLocation
     * @param errorDescription
     */
    constructor(errorLocation, errorDescription) {
        super();

        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.stack) {
            this.stackTrace = Error.stack;
        }

        if (Error.message) {
            this.message = Error.message;
        }

        // Custom debugging information
        this.name = 'handleGlobalErrors Triggered';
        this.errorLocation = `Location: ${errorLocation}`;
        this.errorDescription = `Description: ${errorDescription}`;
        this.date = new Date();
    }

    /**
     * @method
     * @returns {string} ErrorDetails
     */
    logReport() {
        console.error(this.name);
        console.error(this.errorLocation);
        console.error(this.errorDescription);
        console.error(this.date);

        //rollbar.error(this.errorLocation, this.message);

        throw new Error(
            `name: ${this.name}, location: ${this.errorLocation}, stacktrace: ${this.message} - ${this.stackTrace}`
        );
    }
}

module.exports = HandleGlobalErrors;
