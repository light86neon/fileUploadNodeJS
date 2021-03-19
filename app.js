const dotenv = require('dotenv');
const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');

const app = express();

const mongoose = require('mongoose');

dotenv.config({ path: path.join(process.cwd(), '../.env') });

const { MONGO_URL, PORT } = require('./configs/config');
const { config } = require('./configs');

const apiRouter = require('./router/api.router');

// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            customCode: err.customCode || 0,
            message: err.message || ''
        });
});

_connectDB();

app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(process.cwd(), 'static')));

app.use('/', apiRouter);

app.listen(config.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`App listen ${PORT}`);
});

function _connectDB() {
    mongoose.connect(MONGO_URL,
        { useNewUrlParser: true, useUnifiedTopology: true });

    const { connection } = mongoose;

    connection.on('error', (error) => {
        // eslint-disable-next-line no-console
        console.log(error);
    });
}
