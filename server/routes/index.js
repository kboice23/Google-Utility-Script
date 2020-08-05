const { Router } = require('express');
const { query, validationResult } = require('express-validator');

const router = Router();

// Start API
// ##############################

// Webhook endpoints
// ##############################

/**
 * @name /api/google/contacts/cleanup
 * @namespace /api/google/contacts/cleanup
 * @description Provides an API endpoint for triggering Google Contacts Cleanup (bypasses schedule)
 * @global
 * @param {boolean} cleanContacts - Specifies that contacts will be purged
 * @returns {JSON} responseBody - Success or fail message with relevant details
 * @author Keith Boice
 * @see {@link https://zapier.com/blog/what-are-webhooks/|What are Webhooks?}
 * @example <caption>Example using javascript 'fetch' to trigger the job to purge both Google contacts rooms and contacts users</caption>
 * fetch(`/api/google/contacts/cleanup?clean=true&cleanUsers=true`)
 * .then(response => response.json())
 * .then(state => this.setState(state));
 * Returns
 * {
 *       ResponseBody: success
 *  }
 */
router.get(
    '/google/contacts/cleanup',
    [query('cleanUsers').isLength({ min: 1 })],
    (req, res) => {

        // Verify that the request contains required parameters.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ status: `failed` });
        }

        // Call our Google module for contacts cleanup.
        const Google = require('../modules/google/index');

        console.log(`Running Google.CleanupContacts`);

        if (req.query.clean) {
            Google.CleanupContacts()
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
