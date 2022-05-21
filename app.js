const express = require('express');

const app = express();
app.use(express.json());

//ROUTERS
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

app.use('/api/v1/user', userRouter);
app.use('/api/v1/tours', tourRouter);

// If the route does not match any of the above routes, code will reach here.
// Then call this func for all HTTP method
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `can't fins ${req.originalUrl} on this server`,
  });
});

module.exports = app;
