const express = require('express');
const router = express.Router();
// const user = require('../models/User');
const passport =require('passport');
const jwt = require('jsonwebtoken'); 
const models = require('../models/User');

require('../passport/passport');


router.post('/register', passport.authenticate('register', {session:false}), async(req,res,next) => {

    res.json(req.user);
    
});

router.post ('/login', function (req,res,next) {

    passport.authenticate('login', {session:false}, (err, user, info) => {
        if (err || !user) {
            return res.statusCode(400).json({message: 'Queries not right', user: user});
        }
        req.login(user, {session: false}, (err, results) => {
            const token = jwt.sign({user}, "SECRET_KEY");
            res.json({user, token})
        });
    })(req,res,next);
})


module.exports = router; 