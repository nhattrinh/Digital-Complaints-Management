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
const complainSchema = new mongoose.Schema({

    complain_id: String,
    username: String,
    description: String,
});

const User = mongoose.model('User', userSchema);

const Complain = mongoose.model('Complain', complainSchema);

module.exports = User;
module.exports = Complain;

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

module.exports.uploadComplain = function(newComplain, callBack){
    newComplain.save(callBack);
}

module.exports.getComplain = function(storeComplain, callBack){
    Complain.find({ 'username': storeComplain.username}, 'complain_id description', function (err, complain) {
        if (err) return callBack(err);
        callBack(complain);
      })
}

module.exports.updateComplain = function(updateComplain, callBack){
    Complain.find({ 'username': updateComplain.username,'complain_id':updateComplain.complain_id}, 'description', function (err, complain) {
        if (err) return callBack(err);
        callBack(complain);
      })     
}
module.exports.deleteComplain = function(updateComplain, callBack){
    Complain.deleteOne({ 'username': updateComplain.username,'complain_id':updateComplain.complain_id}, function (err, res) {
        if (err) return callBack(err);
        callBack(res);
      })     
}