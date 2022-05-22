// const express = require('express');
const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// controller fucntions
// wait for the promise
exports.createTour = catchAsync(async (req, res, next) => {
  const newTour = await Tour.create(req.body);

  // Add an error if there is no tour returned
  if (!newTour) {
    return next(new AppError('No tour with this ID', 404));
  }
  res.status(201).json({
    status: 'success',
    data: {
      tour: newTour,
    },
  });
});

exports.getAllTours = catchAsync(async (req, res, next) => {
  const allTours = await Tour.find();

  res.status(200).json({
    status: 'Success',
    results: allTours.length,
    body: {
      allTours,
    },
  });
});

// ID of the tour passed in the url params
exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id);

  res.status(200).json({
    status: 'Success',
    body: {
      tour,
    },
  });
});

// new: true defines that the return query object should be the updated tour
// runValidators is a mongoose validator checking incoming json in req.body
exports.updateTour = catchAsync(async (req, res, next) => {
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
});

exports.deleteTour = catchAsync(async (req, res, next) => {
  await Tour.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'Success',
  });
});

// Aggregate pipeline - UNWIND, PROJECTION
exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1;
  const plan = await Tour.aggregate([
    {
      $unwind: '$startDates',
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        // Group by the month in start Date
        _id: { $month: '$startDates' },
        numTours: { $sum: 1 },
        tours: { $push: '$name' },
      },
    },
    {
      $addFields: { month: '$_id' },
    },
    {
      $project: {
        _id: 0,
      },
    },
  ]);
  res.status(200).json({
    plan: plan,
  });
});
