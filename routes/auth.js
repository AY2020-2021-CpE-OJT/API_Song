const passport = require('passport');
require('dotenv').config();
const jwt = require('jsonwebtoken')
const express = require('express');
const auth = express.Router();

function create(req, res, next) {
    // eslint-disable-next-line consistent-return
    passport.authenticate("local", { session: false }, (err, user) => {
      if (err || !user) return res.status(400).end();
      req.login(user, { session: false }, (error) => {
        if (error) next(error);
        const token = jwt.sign(
          {
            uid: user.uid, 
          }, // 토큰에 입력할 private 값
          process.env.key, // 나만의 시크릿키
          { expiresIn: "5m" } // 토큰 만료 시간
        );
        return res.json({ token });
      });
    })(req, res);
  }

  auth.post("/login", create);

  auth.get("/", passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.send();
  });


  module.exports = auth;