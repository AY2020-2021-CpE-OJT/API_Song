const passport =require('passport');
const models = require('../models/User');
const LocalStrategy = require('passport-local').Strategy
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const express = require('express');
const router = express.Router();



passport.use(
    new JWTStrategy({
        secretOrKey: "SECRET_KEY",
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    },
    async (token, done) => {
        try {
            return done(null, token.user);
        } catch (error) {
            done(error);
        }
    })
)

passport.use('register', new LocalStrategy({
    usernameField: 'name', 
    passwordField: 'password'
    },
    async(name, password, done) => {
        try {
            models.findOne({name}, (err, results) => {
                if (result) {
                    done(null, {message: "name already exist"});
                } else {
                    models.create({name, password});
                    done(null, {messages: "Register Success!"});
                }
            })
        } catch (error) {
            done(error);
        }
    }
));

passport.use('login', new LocalStrategy({
    usernameField: 'name', 
    passwordField: 'password'
    },
    async (name, password, done) => {
        try{
            models.findOne({name}, (err,result) => {
                if (err) {
                    throw err;
                } else if (!result) {
                    done(null, {message: "name doesn't exit"});
                } else {
                    models.findOne({password}, (err, result2) => {
                        if (err) throw err;
                        if (!res) done(null, {message: "Wrong password"});
                        done(null, {message: "Succesfully Login"});
                    });
                }
            })
        } catch (error) {
            done(error)
        }
    }
));