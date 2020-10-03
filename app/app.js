const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const servers = require('./routes/servers');
const agents = require('./routes/agents');

const app = express();

mongoose.connect(`mongodb+srv://oybek:${process.env.MONGO_PASS}@cluster0.gqiob.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, () => {
    console.log('DB is working');
});

app.use(bodyParser.urlencoded({
    extended: false,
}));

app.use(bodyParser.json());

app.use('/servers', servers);

app.use('/agents', agents);
 
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status);
    res.json({
        error: {
            error,
        }
    });
});

module.exports = app;