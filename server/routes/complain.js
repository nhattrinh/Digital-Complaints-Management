const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const passport = require('passport');
const jwt =  require('jsonwebtoken');
const validator = require('validator');

const Complaint = require('../models/complaint');

router.get('/complain/get/:username', (req, res) => {
    let { username } = req.params;

    if (!validator.isEmpty(username)) {
        try {
            Complaint.getAllComplaintsByUsername(username, (err, complaints) => {
                if (err) {
                    return res.status(500).json({
                        success: false, 
                        msg: 'Complaints do not exist', 
                        errors: err
                    });
                } else {
                    return res.status(200).json({
                        success: true, 
                        msg: 'Complaints found', 
                        complaints
                    });
                }
            });
        } catch (err) {
            return res.status(400).json({
                success: false,
                msg : 'Unable to find complaints',
                err
            });
        }
    }
});

router.post('/complain/create', (req, res) => {
    let { username, description } = req.body;

    if (
            !validator.isEmpty(username)
        &&  !validator.isEmpty(description)
    ) {
        try {
            const newComplaint = new Complaint({
                username,
                description
            });

            Complain.uploadComplain(newComplaint, function(err, complaint){
                if(err) {
                    return res.status(500).json({
                        success: false, 
                        msg: 'Failed to upload complaint', errors: err
                    });
                } else {
                    return res.status(200).json({
                        success: true, 
                        msg: 'Complaint uploaded', 
                        complaint
                    });
                }
            });
        } catch (err) {
            return res.status(400).json({
                success: false,
                msg : 'Unable to upload complaint',
                err
            });
        }
    }
});

router.post('/complain/update', (req, res) => {
    let { _id, data } = req.body;

    if (
            !validator.isEmpty(_id)
        &&  data
    ) {
        try {
            Complain.updateComplain(_id, data, function (err, complain_id){
                if(err) {
                    return res.status(500).json({
                        success: false, 
                        msg: 'Failed to update complain', errors: err
                    });
                } else {
                    return res.status(200).json({
                        success: true, 
                        msg: 'Complain updated', 
                        complain_id
                    });
                }
            });
        } catch (err) {
            return res.status(400).json({
                success: false,
                msg : 'Unable to update complain',
                err
            });
        }
    }
});

router.delete('/complain/delete/:_id', (req, res) => {
    let { _id } = req.params;

    if (!validator.isEmpty(_id)) {
        try {
            Complain.deleteComplain(_id, function (err, complain_id){
                if(err) {
                    return res.status(500).json({
                        success: false, 
                        msg: 'Failed to delete complain', errors: err
                    });
                } else {
                    return res.status(200).json({
                        success: true, 
                        msg: `Complaint with ID(${_id})deleted`
                    });
                }
            });
        } catch (err) {
            return res.status(400).json({
                success: false,
                msg : 'Unable to delete complain',
                err
            });
        }
    }
});
module.exports = router;