const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');


const requireAuth = passport.authenticate('jwt', { session: false} );
//since we are using jwt do not set up a cookie based session
const requireSignin = passport.authenticate('local', { session: false} );

// routes associated with controllers
// so sign up and sign in attached to authentication.js
module.exports = function(app){
	// using http verb
	// request response next
	app.get('/', requireAuth, function(req, res){
		res.send({ hi: 'there'});

	});

	app.post('/signin', requireSignin, Authentication.signin);
	app.post('/signup', Authentication.signup);
	

}