/* eslint-disable quotes */
/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
const { Sequelize, DataTypes, Op, ValidationError } = require('sequelize');
const express = require('express');
const bcrypt = require('bcrypt');
const getModel = require('../models/user');
const jwtGenerator = require('../utils/jwtGenerator');

const router = new express.Router();
const sequelize = new Sequelize(
  'postgres://learn:pijarpq123@localhost:5432/jwtauth',
);
const User = getModel(sequelize, DataTypes);

// registration route
router.post('/register', async (req, res) => {
  try {
    //  1. destrukturisasi req.body
    const { name, email, password } = req.body;

    //  2. bcrypt password
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const encryptedPassword = await bcrypt.hash(password, salt);

    //  3. masukkan user baru ke dalam database
    const newUser = await User.create({
      userName: name,
      userEmail: email,
      userPassword: encryptedPassword,
    });

    //  4. generate jwt token
    const token = jwtGenerator(newUser.userId);
    return res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    if (error instanceof ValidationError) {
      return res.status(400).send(error.message);
    } else {
      return res.status(500).json(error.message);
    }
  }
});

// login route
router.post('/login', async (req, res) => {
  try {
    //  1. destrukturisasi req.body
    const { name, email, password } = req.body;

    //  2. cek apakah user sudah terdaftar
    const userFinded = await User.findOne({
      where: {
        [Op.or]: [{ userName: name }, { userEmail: email }],
      },
    });
    if (Object.keys(userFinded).length === 0) {
      return res.status(401).send("Username or email doesn't registered");
    }

    //  3. cek jika password yang dimasukkan cocok dengan passwor di database
    const validPassword = await bcrypt.compare(
      password,
      userFinded.userPassword,
    );
    if (!validPassword) {
      return res.status(401).send("Password doesn't match");
    }

    //  4. berikan jwt token
    const token = jwtGenerator(userFinded.userId);
    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).send('server error: ' + error.message);
  }
});
module.exports = router;
