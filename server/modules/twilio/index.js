const HandleGlobalErrors = require('../utils/errors');

/**
 * @class
 * @classdesc Handles deleting old Twilio chat rooms
 * @member Twilio
 * @exports CleanupChatRooms
 * @returns {Promise} success or fail
 * @author Keith Boice
 * @see {@link https://www.twilio.com/console/chat/dashboard|Twilio Chat Console}
 * @see {@link https://www.twilio.com/docs/tutorials?filter-product=Chat&filter-language=Node|Twilio Programmable Chat NodeJS Guide}
 * @example <caption>Delete all old Twilio Chat Rooms from your account</caption>
 * Twilio.CleanupChatRooms()
 *  .then((response) => {
 *      console.log(`Twilio chat room deleted successfully`);
 *   })
 *   .catch((error) => {
 *      console.error(`Failed to delete Twilio chat room with error ${error.stack}`);
 *   });
 */
const CleanupChatRooms = async (req) => {
    try {

        // Twilio authentication keys and values are pulled from the .env file in the project root. See .env.sample for example.
        const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID; //ACCOUNT SID from Twilio Console
        const twilioChatSService = process.env.TWILIO_CHAT_SERVICE_SID; //Chat Service SID from Twilio Chat Console
        const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN; //AUTH TOKEN from Twilio Console

        // Retrieve all chat channels we created since we last checked
        const client = require('twilio')(twilioAccountSid, twilioAuthToken);

        client.chat.services(twilioChatSService)
            .channels
            .list({ limit: 1000 })
            .then(channels => {
                channels.forEach(c => {

                    // Remove each channel one by one
                    client.chat.services(twilioChatSService)
                        .channels(c.sid)
                        .remove();

                    // Log to SegmentIO if SegmentIO is enabled in .env
                    const Monitoring = require('../utils/monitoring');

                    Monitoring.SegmentIO( {userId: c.createdBy, eventName: 'Deleted chat channel', roomId: c.sid, roomName: c.friendlyName } )
                        .then((response) => {
                            console.log(`Sent to SegmentIO successfully`);
                        })
                        .catch((error) => {
                            console.error(`Failed to send to SegmentIO with error ${error.stack}`);
                        });


                    console.log(`removed - ${c.sid}`);
                })
            });

        console.log(`Finished fetching chat channels`);

        return 'success';

    } catch (error) {

        throw new HandleGlobalErrors(`Twilio.CleanupChatRooms`, `${error.stack}`).logReport();

    }
};

module.exports = {
    CleanupChatRooms,
};
