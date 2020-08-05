const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');

const myEnv = dotenv.config();
dotenvExpand(myEnv);

const server = require('./server');

const PORT = process.env.PORT || 3128;

server.listen(PORT, () => console.log(`Server is live at localhost:${PORT}`));
