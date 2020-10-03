import dotenv from 'dotenv';
import http from 'http';
import app from './app/app';

dotenv.config();

const port = process.env.PORT_TEST;

const server = http.createServer(app, () => {
    console.log('Server is working!');
});

server.listen(port, () => {
    console.log('Server is listening!');
});