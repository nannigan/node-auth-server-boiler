const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
  


const localOptions = { usernameField: 'email'}
// localstrategy expects a username and password- so we specify email as our username
// user login 
const localLogin = new LocalStrategy(localOptions, function(email, password, done){
	//verify  username and password, call done with this user
		User.findOne({ email: email }, function(err, user){
		if(err) { return done(err); }
		// done is a passport callback
		//otherwise call done with false
		if(!user) {return done(null, false)}

			// does password === user.password from search-- but our pword in db
		// but our pword in db was encrypted
		// using instance method from model that uses bcrypt...
		user.comparePassword(password, function(err, isMatch){
			if(err) { return done(err); }
			if(!isMatch) { return done(null, false)}

				return done(null, user);
		});
    });
});


// set up options for Jwt strategy
// were is the jwt in our http request?
const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: config.secret
};

// user check token either when signing up or logging in -- prior to access routes requiring auth
// create Jwt strategy
// payload is decoded jwtToken [the object with sub and iat props we made in authentication.js
// done is callback 'reacting' to payload 
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
//  alll of this for passport ie done()
	// see if user id in  payload === one in our db

	User.findById(payload.sub, function(err, user){
		if (err) { return done(err, false); }
		// if error in process

		if (user) {
			// if yes call 'done' witht that user obj
		done(null, user);
	    }else{
	    	// if no call 'done' without that user obj
		done(null, false);
		}
	});
});

//tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin)