const HandleGlobalErrors = require('../errors');

/**
 * @class
 * @classdesc Handles sending multi-channel alerts after each successful run and in the case of an error or exception
 * @member Alerts
 * @exports ChannelSMS
 * @returns {Promise} success or fail
 * @author Keith Boice
 * @see {@link https://www.twilio.com/docs/sms|Twilio Programmable Messaging SMS}
 * @example <caption>Send user identity and/or an action to Segment to track</caption>
 * Alerts.ChannelSMS( {message: 'Twilio Scheduled Chat Cleanup ran successfully', destination: '+15551234567' } )
 *  .then((response) => {
 *      console.log(`Successfully sent SMS to +15551234567`);
 *   })
 *   .catch((error) => {
 *      console.error(`Failed to send SMS to +15551234567 with error ${error.stack}`);
 *   });
 */
const ChannelSMS = async (req) => {
    try {
        // SMS alert logic goes here.

    } catch (error) {

        throw new HandleGlobalErrors(`Alerts.ChannelSMS`, `${error.stack}`).logReport();

    }
};

module.exports = {
    ChannelSMS,
};
