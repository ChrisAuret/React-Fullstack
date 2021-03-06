const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');
require('./models/Survey');

mongoose.connect(keys.mongoURI);
const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(cookieSession({
    maxAge: 30 * 24 *60 * 60 * 1000,
    keys: [keys.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session());

// authRoutes returns function from that file (module.exports)
// so we immidietly invoke that function  with app
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if(process.env.NODE_ENV === 'production'){

    app.use(express.static('client/build'));

    // Express will serve up index.html if cant find route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}
 
const PORT = process.env.PORT || 5000;
app.listen(PORT);