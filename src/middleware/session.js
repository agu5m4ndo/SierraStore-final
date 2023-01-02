const
    session = require('express-session'),
    mongoose = require('mongoose'),
    MongoStore = require('connect-mongo'),
    advancedOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
require('dotenv').config();

mongoose.connect(process.env.CONNECTION_LINK, advancedOptions)

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