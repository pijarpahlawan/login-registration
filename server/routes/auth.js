/* eslint-disable quotes */
const { Sequelize, DataTypes, Op, ValidationError } = require('sequelize');
const express = require('express');
const bcrypt = require('bcrypt');
const getModel = require('../models/user');
const jwtGenerator = require('../utils/jwtGenerator');
const authorization = require('../middleware/authorization');

const router = new express.Router();
const sequelize = new Sequelize(
  'postgres://learn:pijarpq123@localhost:5432/jwtauth',
);

const User = getModel(sequelize, DataTypes);

// registration route
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const encryptedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      userName: name,
      userEmail: email,
      userPassword: encryptedPassword,
    });

    const token = jwtGenerator(newUser.userId);
    return res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    if (error instanceof ValidationError) {
      return res.status(400).json({ message: error.message });
    } else {
      return res.status(500).json({ message: error.message });
    }
  }
});

// login route
router.post('/login', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userFinded = await User.findOne({
      where: {
        [Op.or]: [{ userName: name }, { userEmail: email }],
      },
    });
    if (!userFinded) {
      return res
        .status(401)
        .json({ message: "Username or email doesn't registered" });
    }

    const validPassword = await bcrypt.compare(
      password,
      userFinded.userPassword,
    );
    if (!validPassword) {
      return res.status(401).json({ message: "Password doesn't match" });
    }

    const token = jwtGenerator(userFinded.userId);
    return res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
});

router.get('/is-verify', authorization, async (req, res) => {
  try {
    res.status(200).json({
      isAuthorize: true,
      message: 'Authorization accepted',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
