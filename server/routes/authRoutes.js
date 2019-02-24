
const passport  = require('passport');

module.exports = (app) => {

    app.get(
        '/auth/google', 
        passport.authenticate('google', {
            scope: ['profile', 'email'] //asking for these form users account
        })
    );

    app.get(
        '/auth/google/callback', passport.authenticate('google')
    );
}