/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
const { Sequelize, DataTypes } = require('sequelize');
const express = require('express');
const bcrypt = require('bcrypt');
const getModel = require('../models/user');
const jwtGenerator = require('../utils/jwtGenerator');

const router = new express.Router();
const sequelize = new Sequelize(
  'postgres://learn:pijarpq123@localhost:5432/jwtauth',
);
const User = getModel(sequelize, DataTypes);

// registering
router.post('/register', async (req, res) => {
  try {
    //  1. destrukturisasi req.body
    const { name, email, password } = req.body;

    //  2. cek apakah user sudah terdaftar
    const userFinded = await User.findAll({
      where: {
        userEmail: email,
      },
    });
    if (Object.keys(userFinded).length !== 0) {
      return res.status(200).send('User already exist');
    }

    //  3. bcrypt password
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const encryptedPassword = await bcrypt.hash(password, salt);

    //  4. masukkan user baru ke dalam database
    const newUser = await User.create({
      userName: name,
      userEmail: email,
      userPassword: encryptedPassword,
    });

    //  5. generate jwt token
    const token = jwtGenerator(newUser.userId);
    return res.status(201).json({ token });
  } catch (error) {
    console.log(User);
    console.error(error.message);
    return res.status(500).send('Server error');
  }
});

module.exports = router;
