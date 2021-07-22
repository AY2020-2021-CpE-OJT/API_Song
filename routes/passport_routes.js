const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const LocalStrategy = require('passport-local').Strategy;
const router = express.Router();
const users = require('../models/User.js');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
require('../passport/passport.js');
// router.post('/signin', async(req,res,next) => {
//     try{
//         //아까 local로 등록한 인증과정 실행
//         passport.authenticate('local',(passportError,user,info) => {
//             //인증이 실패했거나 유저데이터가 없다면 에러 발생
//             if (passportError || !user) {
//                 res.status(400).json({message: info.reason});
//                 return;
//             }

//             //user 데이터를 통해 로그인 진행
//             req.login(user,{session:false},(loginError) => {
//                 if (loginError) {
//                     res.send(loginError);
//                     return;
//                 }

//                 //클라이언트에세 JWT 생성후 반환
//                 const token = jwt.sign({name : user.name},'jwt-secret-key');
//                 res.json({token});
//             });
//         }) (req,res);
//     } catch (error) {
//         console.error(error);
//         next(error);
//     }
// });

router.post('/signin', passport.authenticate('signin', {session:false}), async (req,res,next) => {
    res.json(req.user);
});






// router.post('/auth', passport.authenticate('jwt',{session: false}), async(req,res,next) => {
//     try {
//         res,json({result: true});
//     } catch(error) {
//         console.error(error);
//         next(error);
//     } 
// })

module.exports = router;