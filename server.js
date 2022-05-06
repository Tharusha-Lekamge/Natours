// MongoDB connection
const mongoose = require('mongoose');

// To laod environment variables
const dotenv = require('dotenv');

// Get the app.js file to the server
const app = require('./app');

dotenv.config({ path: './config.env' });

// get the port from dotenv
const port = process.env.port || 3000;

// connect to the database
const DB = process.env.DB_STRING.replace('<PASSWORD>', process.env.DB_PASSWORD);

// this .connect method generates a coneection object
// Which is used in the callback function .then
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // eslint-disable-next-line no-console
    // console.log(con.connections);
    // eslint-disable-next-line no-console
    console.log('DB connection set');
  });

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`listening on port ${port}`);
});
