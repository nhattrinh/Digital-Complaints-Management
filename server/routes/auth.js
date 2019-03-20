const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const passport = require('passport');
const jwt =  require('jsonwebtoken');

const User = require('../models/users');

router.post('/register', (req, res) => {
    let { name, email, password } = req.body;

    if (name && email && password) {
        try {
            const newUser = new User({
                name: name,
                email: email,
                password: password
            });

            User.createUser(newUser, function(err, user){
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

router.post('/login', (req, res) => {
    let { email, password } = req.body;

    if (email && password) {
        try {
            User.getUserByEmail(email, function(err, user){
                if (err) throw err;
                if(!user){
                    return res.status(500).json({
                        success: false, 
                        msg: 'User with that email does not exist'
                    });
                }
        
                User.comparePassword(password, user.password, (err, isMatch) => {
                    if (err) throw err;
                    if(isMatch) {
                        const token = jwt.sign({data: {
                            _id: user._id,
                        }}, config.secret, {
                            expiresIn: 604800 // 1 week
                        });
        
                        return res.status(200).json({
                            token: 'Bearer ' + token,
                            user: {
                                _id: user._id,
                                email: user.email,
                                name: user.name
                            }
                        });
                    } else {
                        return res.status(500).json({
                            success: false, 
                            msg: 'Password is incorrect'
                        });
                    }
                });
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