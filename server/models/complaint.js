const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    creator_name: {
        type: String,
        default: ''
    },
    user_id: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    resolved: {
        type: Boolean,
        default: false
    },
    responses: {
        type: Array,
        /*
            creator_name: String,
            description: String,
            time_created: {
                type: Number,
                default: Date.now()
            },
            user_id: String
         */
        default: []
    },
    time_created: {
        type: Number,
        default: Date.now()
    }
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

// module.exports.getAllComplaintsByUsername = function (username, callback) {
//     Complaint.find({ username }, function (err, complaints) {
//         if (err) return callback(err);
//         callback(complaints);
//     });
// };

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