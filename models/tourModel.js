const mongoose = require('mongoose');
const slugify = require('slugify');

// mongoose01 - creating schema
// a field can have a set of attributes
// can pass an error msg as given in required: [true, 'Tour must have a Name']
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tour must have a Name'],
    unique: true,
  },
  rating: Number,
  price: {
    type: Number,
    required: false,
  },
  // TO specify that we need virtual properties
  // to appear in the schema

  slug: {
    type: String,
  },
});

// Virtual properties
/*
 * not saved in the DB
 * Mostly used to store derived properties
 * have to state specifically that
 * we need the virtual properties in the schema
 */
tourSchema.virtual('durationWeeks').get(function () {
  return this.durarion / 7;
  // Used a normal function to get access to thi keyword
  // To return an own parameter
});

// DOCUMENT MIDDLEWARE
// pre runs before. 'save' runs before saving and creating
// Middleware should have next
tourSchema.pre('save', function (next) {
  // 'this' is the currently saving document
  // eslint-disable-next-line no-console
  console.log(this);
  // Creata a slug
  this.slug = slugify(this.name, { lower: true });
  next();
});

// QUERY MIDDLEWARE
tourSchema.pre('query', function (next) {
  // eslint-disable-next-line no-console
  console.log(this);
  this.find({ secretTour: { $ne: true } });
  // This is the query object. Not a document
  next();
});

// AGGREGATION MIDDLEWARE
tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({
    $match: {
      secretTour: { $ne: true },
    },
  });
  // Unshift adds to the beginnning of the array
  // eslint-disable-next-line no-console
  console.log(this.pipeline());
  // 'this' is an aggregate object
  next();
});

// Mongoose02 - Creating the model
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;

// Middleware types -
/**
 * Document
 * Query
 * Aggregate
 * model
 */
