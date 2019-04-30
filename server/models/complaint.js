const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    username: String,
    description: String,
});

const Complaint = module.exports = mongoose.model('Complaint', complaintSchema);


module.exports.uploadComplaint = function (newComplain, callback) {
    newComplain.save(callback);
};

module.exports.getComplaint = function (storeComplain, callback) {
    Complaint.find({ 'username': storeComplain.username }, function (err, complaint) {
        if (err) return callback(err);
        callback(complaint);
      });
};

module.exports.updateComplaint = function (_id, data, callback) {
    Complaint.findOneAndUpdate({ _id }, data, function(err, complaint) {
        if (err) return callback(err);
        callback(complaint);
    });    
};

module.exports.deleteComplaint = function (_id, callback) {
    Complaint.deleteOne({ _id }, function (err, res) {
        if (err) return callback(err);
        callback(res);
      });     
};