const mongoose  = require ('mongoose');
const bcrypt = require ('bcryptjs');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    google_id: String,
    type: {
        type: Number,
        default: 1,
        min: 1
    },
    github_id: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;

module.exports.createUser = function(newUser, callBack){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callBack); 
        });
    });
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if (err) throw err;
        callback(null, isMatch);
    });
}