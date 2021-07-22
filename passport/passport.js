const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const LocalStrategy = require('passport-local').Strategy;
const router = express.Router();
const users = require('../models/User.js');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
require('./passport.js');


passport.use('login', new LocalStrategy({
    usernameField: 'name',
    passwordField: 'password'
}, 
async (name, password, done) => {    

        try {
            users.findOne({name}, (err, result) => {
                if (err) throw error;
                !result ?  done(null, {message: "User doesn't exist "}) : users.findOne({password} , (err, res) => {
                    if (err) throw err;
                    !res ? done(null, {message: "You entered Wrong password!"}) : done(null, {message: "Log in succesfuly! "});
                });
            })
        } catch (error) {
            done(error);
        }
    }   
));


passport.use(
    new JWTStrategy({
        secretOrKey: "Secret",
        jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    async (token, done) => {
        try {
            return done(null, token.user);
        } catch (error) {
            done(error);
        }
    })
)

passport.use('signin', new LocalStrategy({
    usernameField: 'name',
    passwordField: 'password'
    },
    async (name, password, done) => {
        try {
            users.findOne({name}, (err, result) => {
                if (!result) {
                    
                    done(null, {message: "invalid name"});
                } else if (result){
                    users.create({name, pass});
                    done(null, {message: "Success signup"});
                }
            })
            
        } catch (error) {
            done(error);
        }
}));
// const passportConfig = {name: 'userID', password:'password'};
// const passportVerfiy = async (userId,password,done) => {
//     try {
//         //유저 아이디로 일치하는 유저 데이터 검색
//         const user = await User.findOne({name: userID});

//         //만일 검색된 유저 데이터가 없다면
//         if (!user) {
//           done(null, false, { reason: "User not exist" });
//           return;
//         }

//         //검색된 유저가 있으면 유저 해쉬된 비밀번호 비교
//         const compareResult = await bcrypt.compare(password,user.password);

//         //해쉬된 비밀번호가 같나면 유저 데이터 객체 전송
//         if (compareResult) {
//             done(null,user);
//             return;
//         }

//         //비밀번호가 다른 경우
//         done(null,false,{reason : 'password is incorrect'});
//     } catch (error) {
//         done(error);
//     }
// }


// //JWT 검증
// const JWTConfig = {
//     jwtFromRequest: ExtractJwt.fromHeader('authorization'),
//     secretOrKey: 'jwt-secret-key',
// };

// // 
// const JWTVerify = async (jwtPayload,done) => {
//     try {
//         //payload 값으로 유저 데이터 객체 전송
//         if (user) {
//             done(null,user);
//             return;
//         }

//         //유저 데이터가 없을 경우 에러 표시
//         done(null,false,{ reason: 'Its not valid'});
//     } catch (error) {
//         console.error(error);
//         done(error);
//     }
// }

// module.exports = () => {
//     passport.use('local', new LocalStrategy(passportConfig,passportVerfiy));
//     passport.use('jwt',new JWTStrategy(JWTConfig,JWTVerify));
// };