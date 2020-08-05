/*
This script handles deleting old Twilio Chat channels. It runs as a scheduled job every night during off hours.
 */
require('dotenv').config();
const express = require("express");
const cors = require('cors');
const routes = require('./routes');

const server = express();

server.use(express.json());
server.use(cors());

// We use node-cron for scheduling.
const cron = require("node-cron");

// Module for handling Twilio API calls.
const Twilio = require('./modules/google');

// Run daily at 2 AM.
cron.schedule("00 02 * * *", function () {
    console.log(`---------------------`);
    console.log(`Running Cron Job`);

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

});

console.log(`Waiting until 2AM each day to delete all old chat channels`);

server.use('/api', routes);

module.exports = server;
