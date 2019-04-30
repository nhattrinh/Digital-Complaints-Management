const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    username: String,
    description: String,
    resolved: {
        type: Boolean,
        default: false
    },
    replies: [{
        name: String,
        description: String
    }]
});

const Complaint = module.exports = mongoose.model('Complaint', complaintSchema);


module.exports.uploadComplaint = function (newComplain, callback) {
    newComplain.save(callback);
};

// Modified getComplaint function -- Nhat
// Please check again if it's needed anymore -- Nhat

// module.exports.getComplaint = function (_id, callback) {
//     Complaint.findOne({ _id }, function (err, complaint) {
//         if (err) return callback(err);
//         callback(complaint);
//       });
// };

module.exports.getAllComplaintsByUsername = function (username, callback) {
    Complaint.find({ username }, function (err, complaints) {
        if (err) return callback(err);
        callback(complaints);
    });
};

module.exports.updateComplaint = function (_id, data, callback) {
    Complaint.findOneAndUpdate({ _id }, data, function (err, complaint) {
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