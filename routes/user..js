const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/signin', async(req,res,next) => {
    try{
        //아까 local로 등록한 인증과정 실행
        passport.authenticate('local',(passportError,user,info) => {
            //인증이 실패했거나 유저데이터가 없다면 에러 발생
            if (passportError || !user) {
                res.status(400).json({message: info.reason});
                return;;
            }

            //user 데이터를 통해 로그인 진행
            req.login(user,{session:false},(loginError) => {
                if (loginError) {
                    res.send(loginError);
                    return;
                }

                //클라이언트에세 JWT 생성후 반환
                const token = jwt.sign({name : user.name},'jwt-secret-key');
                res.json({token});
            });
        }) (req,res);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;