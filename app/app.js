import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import servers from './routes/servers';
import agents from './routes/agents';
import ping from './routes/ping';
import workspaces from './routes/workspaces';
import config from './config/config';

const app = express();

mongoose.connect(config.dbUrl, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
}, () => {
    console.log('DB is working');
});

app.use(bodyParser.urlencoded({
    extended: false,
}));

app.use(bodyParser.json());

app.use('/servers', servers);

app.use('/agents', agents);

app.use('/ping', ping);

app.use('/workspaces', workspaces);
 
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status);
    res.json({
        error,
    });
});

export default app;