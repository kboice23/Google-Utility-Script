const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');

const myEnv = dotenv.config();
dotenvExpand(myEnv);

describe('Test Twilio modules', () => {

    it('Should verify that we can create Twilio Chat Rooms', async (done) => {

        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const chatSid = process.env.TWILIO_CHAT_SERVICE_SID;

        const client = require('twilio')(accountSid, authToken);

        await client.chat.services(chatSid)
            .channels
            .create({
                friendlyName: 'test channel A'
            })
            .then((channel) => console.log(`Created Twilio chat room ${channel.sid}`))
            .catch((e) => console.error(e.stack));

        done();
    });

});
