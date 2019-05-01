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

router.get('/auth/github', passport.authenticate('github', { scope: ['public_profile', 'public_repo', 'email'] }));

router.get('/auth/github/callback', passport.authenticate('github', { successRedirect: 'http://localhost:3000', failureRedirect: 'http://localhost:3000' }), (req, res) => {
    res.redirect('http://localhost:3000');
});

const findOrCreateUser = async (profile, cb) => {
    console.log(profile)
    try {
        let user = await User.findOne({
            github_id: profile.id
        }).exec();

        if (!user || user === undefined) {
            let user = new User({
                name: profile.displayName,
                email: profile.email,
                github_id: profile.id
            });

            user.save(cb());
        }

        cb();
    } catch (err) {
        console.log(err);
        return null;
    }
};

module.exports = router;