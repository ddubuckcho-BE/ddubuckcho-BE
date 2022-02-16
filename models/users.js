const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const UserSchema = new mongoose.Schema({
  loginId: String,
  password: String,
  confirmPassword: String,
  name: String,
});

UserSchema.virtual('userId').get(function () {
  return this._id.toHexString();
});

UserSchema.set('toJSON', {
  virtuals: true,
});

UserSchema.pre('save', function( next ){ // 몽구스의 pre 메소드 save하기 전에 function
  const user = this;
  if(user.isModified('password')){                         // 패스워드를 바꿀 때만 암호화 
    bcrypt.genSalt(saltRounds, function(err, salt){        // salt 생성 
      if(err) return next(err);
  
      bcrypt.hash(user.password, salt, function(err,hash){ // salt를 이용하여 비밀번호를 hash 암호화
        if(err) return next(err);
        user.password = hash;                              // 비밀번호 암호화로 변경
        next();
      })
    })   
  } else {
    next();
  }
}) 

UserSchema.methods.checkPassword = function(plainPassword, password, cb) {

  bcrypt.compare(plainPassword, password, function(err, isMatch){ 
    console.log(plainPassword)
    console.log(password)
    console.log(err)
    console.log(isMatch)
    if(err) return cb(err),     // 비밀번호가 다르면
    cb(null, isMatch)           // 비밀번호가 같으면
    console.log(1, err, isMatch)
  })

}

module.exports = mongoose.model('Users', UserSchema);
