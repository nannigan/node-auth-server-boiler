const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
	const timestamp = new Date().getTime();
	return jwt.encode({ sub: user.id, iat: timestamp}, config.secret);
}
// sub  is property of jwt --'subject' 
//iat is property of jwt --'issued at time'

// used in router-- but with middleware - requreSignin from passport
exports.signin = function(req, res, next){
	// already authenticated 
	// now give them a token
	// passport.done() gives us req.user
	res.send({token: tokenForUser(req.user)});

}
// used in router
exports.signup = function(req, res, next) {


	const email = req.body.email;
	const password = req.body.password;
	if (!email || !password){
		return res.status(422).send({error: 'you gotta gimme email and password, thanks'});
	}
	/// create user steps
	// see if a user with given email (our unique id) exists,
	User.findOne({ email: email }, function(err, existingUser){
		if(err) { return next(err); }
	// if a user with email does exist return an error
		if (existingUser) {
			return res.status(422).send({ error: 'Email is already used' });
			//422 unprocessable entity
		}

		// if a user with email does not exist create and save user record
		const user = new User({
			email: email,
			password: password
		});
		user.save(function(err){
			if (err) { return next(err); }

		});
	// respond to request indicating that user was created
	// res.json(user); but don't really wanna send pword so below
	// check wi postman to see new record

	res.json({ token: tokenForUser(user)});

	});
	// term, callback(error, ourvarname)


	// if a user with email does not exist create and save user record
	// respond to request indicating that user was created
	
}
// res.send({success: 'true'})
// in postman POST to localhost:3090/signup
// returns the above {succes: 'true'}