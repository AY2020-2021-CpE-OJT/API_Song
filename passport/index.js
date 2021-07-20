const passport = require('passport');
const {Strategy: LocalStrategy} = require('passport-local');
const bcrypt = require('bcrypt');
const User = require('../models/User');


const passportConfig = {usernameField: 'userID', password:'password'};
const passportVerfiy = async (userId,password,done) => {
    try {
        //유저 아이디로 일치하는 유저 데이터 검색
        const user = await User.findOne({name: userID});

        //만일 검색된 유저 데이터가 없다면
        if (!user){
            done(null,false,{reason : 'User not exist'});
            return;
        }

        //검색된 유저가 있으면 유저 해쉬된 비밀번호 비교
        const compareResult = await bcrypt.compare(password,user.password);

        //해쉬된 비밀번호가 같나면 유저 데이터 객체 전송
        if (compareResult) {
            done(null,user);
            return;
        }

        //비밀번호가 다른 경우
        done(null,false,{reason : 'password is incorrect'});
    } catch (error) {
        done(error);
    }
}

module.exports = () => {
    passport.use('local', new LocalStrategy(passportConfig,passportVerfiy));
}