const express = require('express');
const Tour = require('../models/tourModel');

// controller fucntions
// wait for the promise
exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    newTour.save();

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      data: {
        err,
      },
    });
  }
};
exports.getAllTours = (req, res) => {};
exports.getTour = (req, res) => {};
exports.updateTour = (req, res) => {};
exports.deleteTour = (req, res) => {};
