// const express = require('express');
const User = require('../models/userModel');

// Controller functions
exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);

    res.status(200).json({
      status: 'User Added Successfully',
      body: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Bad request',
      data: { err },
    });
  }
};
exports.getUser = (req, res) => {};
exports.getAllUsers = (req, res) => {};
exports.updateUser = (req, res) => {};
exports.deleteUser = (req, res) => {};
