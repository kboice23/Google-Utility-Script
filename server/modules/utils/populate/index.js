const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');

const myEnv = dotenv.config();
dotenvExpand(myEnv);

const HandleGlobalErrors = require('../errors');

/**
 * @class
 * @classdesc Handles populating Twilio with a chat room for testing and development purposes
 * @member Testing
 * @exports Populate
 * @author Keith Boice
 */
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const chatSid = process.env.TWILIO_CHAT_SERVICE_SID;

const client = require('twilio')(accountSid, authToken);

client.chat.services(chatSid)
    .channels
    .create({
        friendlyName: 'test channel A'
    })
    .then((channel) => console.log(`Created Twilio chat room ${channel.sid}`))
    .catch((e) => console.error(e.stack));
