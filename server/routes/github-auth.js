const GitHubStrategy = require('passport-github').Strategy;
const passport = require('passport');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/users');
const GitHubCredentials = require('../config/github');

passport.use(new GitHubStrategy({
    ...GitHubCredentials
  },
  (accessToken, refreshToken, profile, cb) => {
    findOrCreateUser(profile, cb);
  }
));

router.get('/auth/github', passport.authenticate('github'));

router.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: 'http://localhost:3000/login' }), (req, res) => {
    res.redirect('http://localhost:3000');
});

const findOrCreateUser = async (profile, cb) => {
    try {
        let user = await User.findOne({
            github_id: profile.id
        }).exec();

        if (!user || user === undefined) {
            let user = new User({
                name: profile.name,
                email: profile.email,
                github_id: profile.id
            });

            user.save(cb());
        }
    } catch (err) {
        console.log(err);
        return null;
    }
};

module.exports = router;