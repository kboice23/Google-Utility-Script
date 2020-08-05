/*
This script handles deleting old Twilio Chat channels. It runs as a scheduled job every night during off hours.
 */

//@todo: Add config variables to set what to cleanup and what to leave alone
//@todo: Add pm2 config/logging/monitoring
//@todo: Add New Relic logging/monitoring
//@todo: Add Rollbar logging/monitoring
//@todo: Add twilio sms notification option when it runs

const express = require("express");
app = express();

// We use node-cron for scheduling.
const cron = require("node-cron");

// Module for handling Twilio API calls.
const Twilio = require('../server/modules/twilio');

// Run daily at 2 AM.
/*
cron.schedule("00 02 * * *", function () {
    console.log(`---------------------`);
    console.log(`Running Cron Job`);

 */

if (process.env.CONFIG_CLEAN_CHAT_ROOMS) {
    Twilio.CleanupChatRooms()
        .then((response) => {
            console.log(`Cron job ran successfully`);
        })
        .catch((error) => {
            console.error(`Cron job ran failed with error ${error.stack}`);
        });
}

/*
if (cleanChatUsers) {

    // @todo: Add Twilio.cleanChatUsers module

}
 */

//});

console.log(`Successfully deleted all old chat channels`);

