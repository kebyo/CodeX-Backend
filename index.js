import http from 'http';
import app from './app/app';
import config from './app/config/config';

const port = config.port;

const server = http.createServer(app, () => {
    console.log('Server is working!');
});

server.listen(port, () => {
    console.log('Server is listening!');
});