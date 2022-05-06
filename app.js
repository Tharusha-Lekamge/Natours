const express = require('express');

const app = express();

//ROUTERS
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

app.use('/api/v1/user', userRouter);
app.use('/api/v1/tours', tourRouter);

module.exports = app;
