const { Router } = require('express');
const { query, validationResult } = require('express-validator');

const router = Router();

// Start API
// ##############################

// Webhook endpoints
// ##############################

/**
 * @name /api/twilio/chat/cleanup
 * @namespace /api/twilio/chat/cleanup
 * @description Provides an API endpoint for triggering Twilio Chat Cleanup (bypasses schedule)
 * @global
 * @param {boolean} cleanRooms - Specifies that chat rooms will be purged
 * @param {boolean} cleanUsers - Specifies that chat users will be purged
 * @returns {JSON} responseBody - Success or fail message with relevant details
 * @author Keith Boice
 * @see {@link https://zapier.com/blog/what-are-webhooks/|What are Webhooks?}
 * @example <caption>Example using javascript 'fetch' to trigger the job to purge both Twilio chat rooms and chat users</caption>
 * fetch(`/api/twilio/chat/cleanup?cleanRooms=true&cleanUsers=true`)
 * .then(response => response.json())
 * .then(state => this.setState(state));
 * Returns
 * {
 *       ResponseBody: success
 *  }
 */
router.get(
    '/twilio/chat/cleanup',
    [query('cleanRooms').isLength({ min: 1 }), query('cleanUsers').isLength({ min: 1 })],
    (req, res) => {

        // Verify that the request contains required parameters.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ status: `failed` });
        }

        // Call our Twilio module for chat cleanup.
        const Twilio = require('../modules/twilio/index');

        console.log(`Running Twilio.CleanupChatRooms`);

        if (req.query.cleanRooms) {
            Twilio.CleanupChatRooms()
                .then((response) => {
                    res.setHeader('Content-Type', 'application/json');
                    res.status(200);
                    res.json({ responseBody: response });
                })
                .catch((error) => {
                    res.setHeader('Content-Type', 'application/json');
                    res.status(500);
                    res.json({ status: error });
                });
        }


    }
);

// Test endpoints
// ##############################

// We just use this to verify the api endpoints are running at a basic level when monitoring or debugging.
router.get('/test', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    res.json({ status: `success` });
});


// ##############################
// End API

module.exports = router;
