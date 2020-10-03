import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import servers from './routes/servers';
import agents from './routes/agents';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

mongoose.connect(`mongodb+srv://oybek:${process.env.MONGO_PASS}@cluster0.gqiob.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, { 
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

export default app;