//const express = require('express');
const Tour = require('../models/tourModel');

// controller fucntions
// wait for the promise
exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

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

exports.getAllTours = async (req, res) => {
  try {
    const allTours = await Tour.find();

    res.status(200).json({
      status: 'Success',
      results: allTours.length,
      body: {
        allTours,
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

// ID of the tour passed in the url params
exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

    res.status(200).json({
      status: 'Success',
      body: {
        tour,
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

// new: true defines that the return query object should be the updated tour
// runValidators is a mongoose validator checking incoming json in req.body
exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'Success',
      body: {
        tour,
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

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'Success',
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
