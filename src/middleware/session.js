const
    session = require('express-session'),
    mongoose = require('mongoose'),
    ambient = process.env.AMBIENT,
    MongoStore = require('connect-mongo'),
    advancedOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    MemoryStore = require('session-memory-store')(session),
    object = {}
require('dotenv').config();

//elije el store para las sesiones entre memory store y mongo store 
if (mongoose.connection.readyState == 0 && ambient == "prod") {
    object['store'] = MongoStore.create({
        mongoUrl: process.env.CONNECTION_LINK,
        advancedOptions,
        collectionName: 'sessions'
    })
} else object['store'] = new MemoryStore({ stale: 3600000, checkPeriod: 3600000 });

module.exports = session({
    ...object,
    secret: 'coderhouse',
    resave: true,
    saveUninitialized: false,
    rolling: true,
    cookie: { maxAge: 3600000 }
})