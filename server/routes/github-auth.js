const GitHubStrategy = require('passport-github').Strategy;
const passport = require('passport');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = require('../models/users');
const GitHubCredentials = require('../config/github');

passport.use(new GitHubStrategy({
    ...GitHubCredentials
  },
  (accessToken, refreshToken, profile, done) => {
    findOrCreateUser(profile, done);
    process.nextTick(function () {
        return done(null, profile);
      });
  }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

router.get('/auth/github', passport.authenticate('github', { scope: ['public_profile', 'public_repo', 'email', 'access_token' ] }));

router.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: 'http://localhost:3000/login' }), (req, res) => {
    res.redirect(`http://localhost:3000?githubID=${req.user.id}`);
});

const findOrCreateUser = async (profile, cb) => {
  console.log(profile);
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

            user.save(cb(user));
        }

        cb(user);
    } catch (err) {
        console.log(err);
        return null;
    }
};

router.get('/auth/find-by-github-id/:github_id', async (req,res) => {
    let { github_id } = req.params;
  
    try {
      let user = await User.findOne({ github_id }).exec();
      
      if (user !== null) {
        const token = jwt.sign({data: {
            github_id,
        }}, 'genioisacoolapp', {
            expiresIn: 604800 // 1 week
        });
  
        return res.status(200).json({
          message: 'Found user with that GitHub ID',
          success: true,
          user,
  
          token: `Bearer ${token}`
  
        });
      } else {
        throw new Error('Could not find user');
      }
    }
    catch(err) {
      console.log(err);
      return res.status(422).json({
        success: false,
        msg: 'Unable to find any users with that GitHub ID'
      });
    }
  });

module.exports = router;