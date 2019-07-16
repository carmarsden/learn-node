require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const { NODE_ENV } = require('./config');
const cardRouter = require('./card/card-router');
const listRouter = require('./list/list-router');
const logger = require('./logger');

const app = express();


// LOGGING/SECURITY MIDDLEWARE

const morganOption = (NODE_ENV === 'production') ? 'tiny' : 'common';
app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
app.use(express.json());


app.use(function validateBearerToken(req, res, next) {
    const apiToken = process.env.API_TOKEN;
    const authToken = req.get('Authorization');
  
    if (!authToken || authToken.split(' ')[1] !== apiToken) {
        logger.error(`Unauthorized request to path: ${req.path}`);
        return res.status(401).json({ error: 'Unauthorized request' });
    };

    next();  // move to the next middleware
})


// ROUTING

app.use(cardRouter);
app.use(listRouter);


// BASIC ENDPOINTS

app.get('/', (req, res) => {
    res.send('Hello, world!')
})


// ERROR HANDLER

app.use(function errorHandler(error, req, res, next) {
    let response;
    if (NODE_ENV === 'production') {
        response = { error: { message: 'server error' } };
    } else {
        console.error(error);
        response = { message: error.message, error };
    }
    res.status(500).json(response)
})    

module.exports = app;