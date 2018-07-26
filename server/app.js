const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('express-jwt');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();

require('dotenv').config();

let currentDb = undefined;

// Models
const User = require('./models/user.model');

// Insecure Routes
const insecureRoutes = [
    '/api',
    '/api/users/register',
    '/api/users/login'
];

// Environment
app.set('env', process.env.NODE_ENV || 'development');
app.set('host', process.env.HOST || '0.0.0.0');
app.set('port', process.env.PORT || 8080);

// Controllers
const controllers = require('./controllers/controllers');

// Logging
app.use(logger('common', {
    stream: fs.createWriteStream('.access.log', {
        flags: 'a'
    })
}));

app.use(logger('dev'));

// Body Parser Middleware
app.use(bodyParser.json());

// Parse application/w-xxx-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Cookie Parser Middleware
app.use(cookieParser());

// CORS Middleware
app.use((req, res, next) => {
    // const allowedOrigins = [];
    // const origin = req.headers.origin;
    // if (allowedOrigins.indexOf(origin) > -1) {
    //     res.setHeader('Access-Control-Allow-Origin', origin);
    // }
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    next();
});

// JWT AUTH
app.use(jwt({secret: process.env.JWT_SECRET})
.unless({
    path: insecureRoutes
}));

app.use( async ( req, res, next ) => {
    if( req.method === 'OPTIONS' || isInsecurePage(req.path) ) {
        return next();
    } 
    try {
        const authHeader = req.get( 'Authorization' );
        const token = authHeader ? authHeader.split( ' ' )[ 1 ].split('.')[1] : null;
        const tokenBase64 = new Buffer(token, 'base64');
        const tokenData = JSON.parse(tokenBase64.toString('ascii'));
        if ( !tokenData.id ) {
            throw new Error();
        }
        const user = await User.findById( tokenData.id );
        if ( !user || user.secStamp !== tokenData.secStamp ) {
            throw new Error();
        }
        req.user = user;
        next();
    } catch( e ) {
        let err = new Error( 'Token Invalid' );
        err.name = 'UnauthorizedError';
        next( err );
    }
});

//Public Dir
app.use(express.static(__dirname + '/public'));

//Mongoose Connection
mongoose.connect(process.env.DEVELOPMENT_DATABASE);

mongoose.connection.on('connected', (req, res, next) => {
    console.log(`Connected to ${app.get('env')} database`);
});

mongoose.connection.on('error', (req, res, next) => {
    console.log(`Error connecting to ${app.get('env')} database`);
});

// Route Prefix
app.use('/api', controllers);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
    let err = new Error('Not Found');4
    err.status = 404;
    next(err);
});

// Development Error Handler -- no stack trace
if(app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err.code || 500)
            .json({
                status: 'error',
                message: err
            });
    });
}

if(app.get('env') === 'production') {
    app.use((err, req, res, next) => {
        res.status(err.code || 500)
            .json({
                status: 'error',
                message: err.message
            });
    });
}

// Start Server
app.listen(app.get('port'), () => {
    console.log(`Listening on port ${app.get('port')}`);
});

// Utility Functions

let isInsecurePage = (location) => {
    if(insecureRoutes.includes(location)) {
        return true;
    } else {
        return false;
    }
}
