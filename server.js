const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');

//load env variables
dotenv.config({ path: './config/config.env' });

//connect to Database
connectDB();

//route files
const bootcamps = require('./Routes/bootcamps');
const courses = require('./Routes/courses');
const app = express();

//body parser
app.use(express.json())


//dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
};

//mount routers
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
//error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);


// GLOBAL Handle unhandled promise rejection
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error:${err.message}`);
  //close server and exit process
  server.close(() => {
    process.exit(1)
  })
})