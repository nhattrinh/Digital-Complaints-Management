const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const passport = require('passport');
const jwt =  require('jsonwebtoken');

const Complain = require('../models/users');

router.post('/complain/get', (req, res) => {
    let {complain_id,username,description } = req.body;

    if (complain_id && username && description) {
        try {
            const storeComplain = new Complain({
                complain_id:complain_id,
                username: name,
                description:description
            });

            Complain.getComplain(storeComplain, function(err, complain_id){
                if(err) {
                    return res.status(500).json({
                        success: false, 
                        msg: 'Complain does not exist', 
                        errors: err
                    });
                } else {
                    return res.status(200).json({
                        success: true, 
                        msg: 'Complain found', 
                        complain_id
                    });
                }
            });
        } catch (err) {
            return res.status(400).json({
                success: false,
                msg : 'Unable to find complain',
                err
            });
        }
    }
});

router.post('/complain/create', (req, res) => {
    let {complain_id,username,description } = req.body;

    if (complain_id && username && description) {
        try {
            const newComplain = new Complain({
                complain_id:complain_id,
                username: username,
                description:description
            });

            Complain.uploadComplain(newComplain, function(err, complain_id){
                if(err) {
                    return res.status(500).json({
                        success: false, 
                        msg: 'Failed to upload complain', errors: err
                    });
                } else {
                    return res.status(200).json({
                        success: true, 
                        msg: 'Complain uploaded', 
                        complain_id
                    });
                }
            });
        } catch (err) {
            return res.status(400).json({
                success: false,
                msg : 'Unable to upload complain',
                err
            });
        }
    }
});

router.post('/complain/update', (req, res) => {
    let {complain_id,username,description } = req.body;

    if (complain_id && username && description) {
        try {
            const updateComplain = new Complain({
                complain_id:complain_id,
                username: username,
                description:description
            });

            Complain.updateComplain(updateComplain, function(err, complain_id){
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

router.post('/complain/delete', (req, res) => {
    let {complain_id,username,description } = req.body;

    if (complain_id && username && description) {
        try {
            const deleteComplain = new Complain({
                complain_id:complain_id,
                username: username,
                description:description
            });

            Complain.deleteComplain(deleteComplain, function(err, complain_id){
                if(err) {
                    return res.status(500).json({
                        success: false, 
                        msg: 'Failed to delete complain', errors: err
                    });
                } else {
                    return res.status(200).json({
                        success: true, 
                        msg: 'Complain deleted', 
                        complain_id
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