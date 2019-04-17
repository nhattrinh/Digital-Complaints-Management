const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const passport = require('passport');
const jwt =  require('jsonwebtoken');

const Complain = require('../models/users');

router.post('/complain', (req, res) => {
    let {complain_id,name,description } = req.body;

    if (complain_id && name && description) {
        try {
            const newComplain = new Complain({
                complain_id:complain_id,
                name: name,
                description:description
            });

            User.uploadComplain(newComplain, function(err, complain_id){
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
module.exports = router;