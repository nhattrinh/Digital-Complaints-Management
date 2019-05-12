const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const passport = require('passport');
const jwt =  require('jsonwebtoken');
const validator = require('validator');

const User = require('../models/users');

router.post('/register', (req, res) => {
    let { name, email, password, clearance_code } = req.body;

    if (
            !validator.isEmpty(name) 
        &&  !validator.isEmpty(email) 
        &&  !validator.isEmpty(password)
    ) {
        try {
            let newUser;
            newUser = new User({
                name: name,
                email: email,
                password: password,
            });

            if (clearance_code && clearance_code === '11111')
                newUser = new User({
                    name: name,
                    email: email,
                    password: password,
                    type: 'HR'
                });

            User.createUser(newUser, (err, user) => {
                if(err) {
                    return res.status(500).json({
                        success: false, 
                        msg: 'Failed to register User', errors: err
                    });
                } else {
                    return res.status(200).json({
                        success: true, 
                        msg: 'User Registered', 
                        user
                    });
                }
            });
        } catch (err) {
            return res.status(400).json({
                success: false,
                msg : 'Unable to create a user',
                err
            });
        }
    }
});

router.post('/login', async (req, res) => {
    let { email, password } = req.body;

    if (
            !validator.isEmpty(email) 
        &&  !validator.isEmpty(password)
    ) {
        try {
            let user = await User.findOne({ email }).exec();
            
            if (!user) throw new Error('User does not exist in database');
        
            User.comparePassword(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if(isMatch) {
                    const token = jwt.sign({data: {
                        _id: user._id,
                    }}, 'dcmisacoolapp', {
                        expiresIn: 604800 // 1 week
                    });
    
                    return res.status(200).json({
                        token: 'Bearer ' + token,
                        user
                    });
                } else {
                    return res.status(500).json({
                        success: false, 
                        msg: 'Password is incorrect'
                    });
                }
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                msg: ' Server was unable to process your request, wait a while or try reformatting your request'
            });
        }
    } else {
        return res.status(403).json({
            success: false,
            msg: 'Invalid request, try again'
        });
    }
});

router.post('/auth/find-by-okta-id', async (req,res) => {
    let { okta_id, name, email } = req.body;

    try {
        let user = await User.findOne({ okta_id }).exec();

        if (!user) {
            user = new User({
                name,
                email,
                okta_id
            });

            user.save(() => {
                const token = jwt.sign({data: {
                    _id: user._id,
                }}, 'dcmisacoolapp', {
                    expiresIn: 604800 // 1 week
                });

                if(err) {
                    return res.status(500).json({
                        success: false, 
                        msg: 'Failed to register User', errors: err
                    });
                } else {
                    return res.status(200).json({
                        success: true, 
                        msg: 'User Registered', 
                        user, token
                    });
                }
            });
        }

        const token = jwt.sign({data: {
            _id: user._id,
        }}, 'dcmisacoolapp', {
            expiresIn: 604800 // 1 week
        });

        return res.status(200).json({
            success: true,
            user, token
        });

    } catch(err) {
        console.log(err);
        return res.status(403).json({
            success: false,
            msg: 'Invalid request, try again'
        });
    }
});

module.exports = router;