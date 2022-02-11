const express = require("express");
const router = express.Router();
const Users = require("../models/users");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const authMiddleware = require("../middlewares/auth-middleware");

module.exports = router;
