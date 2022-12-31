const
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    bcrypt = require('bcrypt'),
    Factory = require('../persistence/factory'),
    daoUsuarios = new Factory().bring('user')

passport.use(
    new LocalStrategy({ usernameField: 'username' }, async(username, password, done) => {
        const user = await daoUsuarios.getByUsername(username);
        if (user != null) {
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) console.log(err);
                if (!isMatch) {
                    console.log('Password is not correct')
                    return done(null, false);
                }
                return done(null, user);
            })
        } else {
            console.log(`Username ${username} not found`);
            return done(null, false);
        }
    })
)

passport.serializeUser((user, done) => {
    return done(null, user.username);
})
passport.deserializeUser(async(username, done) => {
    const user = await daoUsuarios.getByUsername(username);
    return done(null, user);
})

const authenticate = passport.authenticate('local', { failureRedirect: '/register' })

module.exports = {
    passport,
    authenticate,
}