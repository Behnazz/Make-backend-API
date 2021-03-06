const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors')
const rateLimit = require('express-rate-limit');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');

//load env variables
dotenv.config({ path: './config/config.env' });

//connect to Database
connectDB();

//route files
const bootcamps = require('./Routes/bootcamps');
const courses = require('./Routes/courses');
const auth = require('./Routes/auth');
const users = require('./Routes/users');
const reviews = require('./Routes/reviews');

const app = express();

//body parser
app.use(express.json());

//cookie parser
app.use(cookieParser());

//dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// File uploading
app.use(fileupload());

//sanitize data
app.use(mongoSanitize());

//set security headers
app.use(helmet());

//prevent xss attacks
app.use(xss());

//prevent HTTP param pollution
app.use(hpp());

//rate limiting
const limiter = rateLimit({
  windowMs: 10 * 50 * 1000, //10mins
  max: 100
})
app.use(limiter);

//enable CORS
app.use(cors());

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

//mount routers
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/reviews', reviews);

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
    process.exit(1);
  });
});
