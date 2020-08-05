const HandleGlobalErrors = require('../utils/errors');

/**
 * @class
 * @classdesc Handles deleting old Google contacts
 * @member Google
 * @exports CleanupContacts
 * @returns {Promise} success or fail
 * @author Keith Boice
 * @see {@link https://developers.google.com/people/quickstart/nodejs|Google People API NodeJS Quickstart}
 * @see {@link https://developers.google.com/people|Google People API}
 * @see {@link https://console.developers.google.com/flows/enableapi?apiid=people.googleapis.com&credential=client_key|Google API Console}
 * @see {@link https://github.com/googleapis/google-api-nodejs-client|Google API NodeJS Client}
 * @see {@link https://googleapis.dev/nodejs/googleapis/latest/people/classes/People.html|Google People NodeJS Reference}
 * @example <caption>Delete all old Google Contacts from your account</caption>
 * Google.CleanupContacts()
 *  .then((response) => {
 *      console.log(`Google contacts deleted successfully`);
 *   })
 *   .catch((error) => {
 *      console.error(`Failed to delete Google contacts with error ${error.stack}`);
 *   });
 */
const CleanupContacts = async (req) => {
    try {

        // Path to the Google service account credential file is pulled from the .env file in the project root. See .env.sample for example.
        const googleAppCreds = process.env.GOOGLE_APPLICATION_CREDENTIALS; //Google service account

        // Instantiate connection to Google API.
        const {google} = require('googleapis');

        const auth = new google.auth.GoogleAuth({
            keyFile: googleAppCreds,
            scopes: ['https://www.googleapis.com/auth/cloud-platform'],
        });

        const people = google.people('v1');



        client.contact.services(googleContactsSService)
            .channels
            .list({ limit: 1000 })
            .then(channels => {
                channels.forEach(c => {

                    // Remove each channel one by one
                    client.contact.services(googleContactsSService)
                        .channels(c.sid)
                        .remove();

                    // Log to SegmentIO if SegmentIO is enabled in .env
                    const Monitoring = require('../utils/monitoring');

                    Monitoring.SegmentIO( {userId: c.createdBy, eventName: 'Deleted contact', roomId: c.sid, roomName: c.friendlyName } )
                        .then((response) => {
                            console.log(`Sent to SegmentIO successfully`);
                        })
                        .catch((error) => {
                            console.error(`Failed to send to SegmentIO with error ${error.stack}`);
                        });


                    console.log(`removed - ${c.sid}`);
                })
            });

        console.log(`Finished fetching contacts`);

        return 'success';

    } catch (error) {

        throw new HandleGlobalErrors(`Google.CleanupContacts`, `${error.stack}`).logReport();

    }
};

module.exports = {
    CleanupContacts,
};
