const mongoose = require('mongoose');

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
    required: true,
  },
});

// Mongoose02 - Creating the model
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
