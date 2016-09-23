const bcrypt = require('bcrypt-nodejs');

// local def of what a user is

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// tells mongoose what fields our model will have

const userSchema = new Schema({
	email: { type:String, unique: true, lowercase: true },
	//unique is NOT case sensitive
	password: String
});
// On Save Hook, encrypt password
// before saving a model run this...
userSchema.pre('save', function(next){
	const user = this;
	//getting access to instance of User model
// gen salt then
	bcrypt.genSalt(10, function(err, salt){
		if (err) { return next(err); }
// hash/encrypt our pwd using the salt
		bcrypt.hash(user.password, salt, null, function(err, hash){
			if (err) { return next(err); }

			user.password = hash;

			next();

		});
	});
});

// add instance method to schema 
userSchema.methods.comparePassword = function(candidatePassword, callback){
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
		if (err) { return callback(err); }

		callback(null, isMatch);

	});
	// this.password being the salted and hashed version stored on the model


}




const ModelClass = mongoose.model('user', userSchema);


module.exports = ModelClass;

