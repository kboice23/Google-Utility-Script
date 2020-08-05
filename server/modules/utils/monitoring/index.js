const HandleGlobalErrors = require('../errors');

/**
 * @class
 * @classdesc Handles sending activity to monitoring and logging services
 * @member Monitoring
 * @exports SegmentIO
 * @returns {Promise} success or fail
 * @author Keith Boice
 * @see {@link https://segment.com/|Get free SegmentIO account}
 * @see {@link https://segment.com/docs/connections/sources/catalog/libraries/server/node/quickstart/|SegmentIO NodeJS Quickstart}
 * @example <caption>Send contact identity and/or an action to Segment to track</caption>
 * Monitoring.SegmentIO( {contactId: 12345, contactName: 'keith boice' } )
 *  .then((response) => {
 *      console.log(`Sent to SegmentIO successfully`);
 *   })
 *   .catch((error) => {
 *      console.error(`Failed to send to SegmentIO with error ${error.stack}`);
 *   });
 */
const SegmentIO = async (req) => {
    try {
        // Instantiate the SegmentIO NodeJS plugin with our SegmentIO write key from .env.
        const Analytics = require('analytics-node');
        const analytics = new Analytics(process.env.MONITORING_SEGMENT_KEY_NODEJS);

        // Track the Twilio room we just deleted up as an event in SegmentIO.
        analytics.track({
            userId: req.userId,
            event: req.eventName,
            properties: {
                roomId: req.roomId,
                roomName: req.roomName,
            }
        });

    } catch (error) {

        throw new HandleGlobalErrors(`Utils.Monitoring.SegmentIO`, `${error.stack}`).logReport();

    }
};

module.exports = {
    SegmentIO,
};
