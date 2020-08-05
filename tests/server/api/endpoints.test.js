const app = require('../../../server/index'); // Link to your server file
const supertest = require('supertest');
const request = supertest(app);

describe('Test that endpoints are responding at a basic level', () => {

    it('Should verify that each of our API endpoints are running and responsive', async (done) => {

        await request.get('/api/test');
        await request.get('/api/twilio/chat/cleanup');

        done();
    });

});
