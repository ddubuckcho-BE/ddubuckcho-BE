const jwt = require('jsonwebtoken');
const Joi = require('joi');
const authMiddleware = require('../middlewares/auth-middleware');
const Users = require('../models/users');

const joinUsersSchema = Joi.object({
    loginId: Joi.string().alphanum().min(6).required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().min(6).required(),
})