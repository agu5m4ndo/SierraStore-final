const
    session = require('express-session'),
    MongoStore = require('connect-mongo'),
    advancedOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
require('dotenv').config();
const EXPIRATION_DATE = process.env.EXPIRATION_DATE;
module.exports = session({
    store: MongoStore.create({
        mongoUrl: process.env.CONNECTION_LINK,
        advancedOptions,
        collectionName: 'sessions'
    }),
    secret: 'coderhouse',
    resave: true,
    saveUninitialized: false,
    rolling: true,
    cookie: { maxAge: 3600000 }
})