require('dotenv').config();
const http = require('http');

const port = process.env.PORT_TEST;

const app = require('./app/app');

const server = http.createServer(app, () => {
    console.log('Server is working!');
});

server.listen(port, () => {
    console.log('Serves is listening!');
});