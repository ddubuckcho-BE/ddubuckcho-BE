const jwt = require('jsonwebtoken');
const Joi = require('joi');
const Users = require('../models/users');

const signupSchema = Joi.object({
  loginId: Joi.string().alphanum().min(6).required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().min(6).required(),
  name: Joi.required(),
});

// 회원가입
const signup = async (req, res) => {
  try {
    const { loginId, password, confirmPassword, name } =
      await signupSchema.validateAsync(req.body);
    if (password !== confirmPassword) {
      res.status(400).send({
        message: '패스워드가 확인란과 동일하지 않습니다.',
      });
      return;
    }
    const existId = await Users.find({ loginId });
    console.log(existId)
    if (existId.length) {
      res.status(400).send({
        message: '이미 가입된 아이디입니다.', 
      });
      return;
    }
    const existName = await Users.find({ name });
    if (existName.length) {
      res.status(400).send({
        message: '이미 가입된 이름입니다.',
      });
      return;
    }
    const user = new Users({ loginId, password, name });
    await user.save();
    res.status(201).json({ ok: true, message: '회원가입에 성공하였습니다.' });
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({ ok: false, message: '요청한 데이터 형식이 올바르지 않습니다.' });
  }
};

//로그인
const loginSchema = Joi.object({
  loginId: Joi.string().alphanum().min(6).required(),
  password: Joi.string().min(6).required(),
});

const login = async (req, res) => {
  try {
    const { loginId, password } = await loginSchema.validateAsync(req.body);
    const user = await Users.findOne({ loginId, password });

    if (!user) {
      res.status(400).send({
        message: '아이디 또는 패스워드를 확인해주세요.',
      });
      return;
    }
    const token = jwt.sign({ loginId: user.loginId }, process.env.TOKENKEY);
    const name = user.name
    console.log(name)
    res.json({
      token,
      name,
      ok: true,
      message: '로그인 성공',
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      ok: false,
      message: '요청한 데이터 형식이 올바르지 않습니다.',
    });
  }
};

// 로그인 확인
const auth = async (req, res) => {
  const { user } = res.locals;
  res.json({
    name: {
      name: user.name,
    },
  });
};

module.exports = {
  signup,
  login,
  auth,
};
