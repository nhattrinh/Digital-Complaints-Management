var GoogleStrategy =    require('passport-google-oauth20').Strategy;
const router =          require('express').Router();
const passport =        require('passport');
const mongoose =        require('mongoose');
const User =            require('../models/users');
const jwt =             require('jsonwebtoken');

const config = require('../config/database');
const GoogleCredentials = require('../config/google');

const callback_url = process.env.ENDPOINT_URL || "http://localhost:3000";

passport.use(new GoogleStrategy({
  ...GoogleCredentials
},
  (accessToken, refreshToken, profile, done) => {
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

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  async (req, res) => {
    let { displayName, emails, photos, token } = req.user;
    let { sub } = req.user._json;

    try {
        let query = await User.findOne({ google_id: sub }).exec();
        if (query === null) {
            var newUser = new User({
                name: displayName,
                email: emails[0].value,
                google_id: sub
            });

            newUser.save();
        }

        return res.redirect(`http://localhost:3000?id=${sub}&new=${query === null ? 'true' : 'false'}`);
    }
    catch (err) {
      console.log(err);
      return res.status(422).json({
        success: false,
        msg: 'Error during Google authentication process'
      });
    }
  });

router.get('/auth/find-by-google-id/:google_id', async (req,res) => {
  let { google_id } = req.params;

  try {
    let user = await User.findOne({ google_id }).exec();
    
    if (user !== null) {
      const token = jwt.sign({data: {
          google_id,
      }}, 'genioisacoolapp', {
          expiresIn: 604800 // 1 week
      });

      return res.status(200).json({
        message: 'Found user with that Google ID',
        success: true,
        user,

        token: `Bearer ${token}`

      });
    } else {
      throw new Error('Could not find user');
    }
  }
  catch(err) {
    return res.status(422).json({
      success: false,
      msg: 'Unable to find any users with that Google ID'
    });
  }
});

module.exports = router;
