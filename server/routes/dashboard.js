const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const getModel = require('../models/user');
const authorization = require('../middleware/authorization');
require('dotenv').config();

const router = new express.Router();
const sequelize = new Sequelize(process.env.CONNECTION_STRING);

const User = getModel(sequelize, DataTypes);

router.get('/', authorization, async (req, res) => {
  try {
    const user = await User.findByPk(req.user);
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
