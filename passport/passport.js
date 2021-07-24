require('dotenv').config();
const passport = require("passport");
const passportJWT = require("passport-jwt");
const bcrypt = require("bcrypt");

const JWTStrategy = passportJWT.Strategy;
const { ExtractJwt } = passportJWT;
const LocalStrategy = require("passport-local").Strategy;

const User = require('../models/User')

const LocalStrategyOption = {
    usernameField: "uid",
    passwordField: "password",
  };
  async function localVerify(uid, password, done) {
    let user;
    try {
      user = await User.find(uid);
  
      if (!user) return done(null, false);
      const isSamePassword = await bcrypt.compare(password, user.password);
      if (!isSamePassword) return done(null, false);
    } catch (e) {
      done(e);
    }
    return done(null, user);
  }

  const jwtStrategyOption = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.key,
  };
  
  async function jwtVerift(payload, done) {
    let user;
    try {
      user = await User.find(payload.uid);
      if (!user) return done(null, false);
    } catch (e) {
      return done(e);
    }
    return done(null, user);
  }

  module.exports = () => {
    passport.use(new LocalStrategy(LocalStrategyOption, localVerify));
    passport.use(new JWTStrategy(jwtStrategyOption, jwtVerift));
  };