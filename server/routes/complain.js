const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const Complaint = require('../models/complaint');

router.post('/complain/mark-resolved', async (req,res) => {
    let { _id } = req.body;

    try {
        await Complaint.findOneAndUpdate({ _id }, { resolved: true }).exec();

        return res.status(200).json({
            success: true,
            msg: 'Successfully marked complaint as resolved'
        });

    } catch(err) {
        console.log(err);
        return res.status(400).json({
            success: false,
            msg: 'Unable to find complaints',
            err
        });
    }
})

router.get('/complain/get/all', (req, res) => {
    try {
        Complaint.find({}, (err, complaints) => {
            if (err) throw new Error(err);

            return res.status(200).json({
                success: true,
                msg: 'Complaints found',
                complaints
            });
        });

    } catch (err) {
        return res.status(400).json({
            success: false,
            msg: 'Unable to find complaints',
            err
        });
    }
});

router.get('/complain/get/:_id', (req, res) => {
    let { _id } = req.params;

    if (!validator.isEmpty(_id)) {
        try {
            Complaint.find({
                user_id: _id
            }, (err, complaints) => {
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
                msg: 'Unable to find complaints',
                err
            });
        }
    }
});

router.post('/complain/reply', async (req, res) => {
    let { user_id, _id, description, creator_name } = req.body;

    if (
        !validator.isEmpty(_id) &&
        !validator.isEmpty(description) &&
        !validator.isEmpty(creator_name) &&
        !validator.isEmpty(user_id)
    ) {
        try {
            let complaint = await Complaint.findOne({
                _id
            }).exec();

            if (!complaint) throw new Error('Complaint not found');

            complaint.responses.push({
                user_id,
                _id,
                description,
                creator_name,
                time_created: Date.now()
            });

            await complaint.save();

            return res.status(200).json({
                success: true,
                complaint
            });
        } catch (err) {
            console.log(err);
            return res.status(400).json({
                success: false,
                msg: 'Unable to upload reply',
                err
            });
        }

    } else {
        console.log(err);
        return res.status(400).json({
            success: false,
            msg: 'Unable to upload reply'
        });
    }
});

router.post('/complain/create', (req, res) => {
    let { _id, description, creator_name } = req.body;

    if (
        !validator.isEmpty(_id) &&
        !validator.isEmpty(description)
        // &&  !validator.isEmpty(creator_name)
    ) {
        try {
            const newComplaint = new Complaint({
                user_id: _id,
                description,
                creator_name
            });

            newComplaint.save((err, complaint) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        msg: 'Failed to upload complaint',
                        errors: err
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
            console.log(err);
            return res.status(400).json({
                success: false,
                msg: 'Unable to upload complaint',
                err
            });
        }
    }
});

router.post('/complain/update', (req, res) => {
    let { _id, data } = req.body;

    if (
        !validator.isEmpty(_id) &&
        data
    ) {
        try {
            Complain.updateComplain(_id, data, function (err, complain_id) {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        msg: 'Failed to update complain',
                        errors: err
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
                msg: 'Unable to update complain',
                err
            });
        }
    }
});

router.delete('/complain/delete/:_id', (req, res) => {
    let { _id } = req.params;

    if (!validator.isEmpty(_id)) {
        try {
            Complain.deleteComplain(_id, function (err, complain_id) {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        msg: 'Failed to delete complain',
                        errors: err
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
                msg: 'Unable to delete complain',
                err
            });
        }
    }
});
module.exports = router;