const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

//protect route
exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  // the header authorization
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    //so the bearer is separated from token and we need only token
    token = req.headers.authorization.split(' ')[1];
  }
  // else if (req.cookies.token) {
  //   token = req.cookies.token
  //   }

  //make sure token is sent and existed
  if (!token) {
    return next(new ErrorResponse('not authorise to access this route', 401));
  }
  //if existed verify it
  try {
    //verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //decoded object has a user id
    req.user = await User.findById(decoded.id); //current logged in user
    next();
  } catch (error) {
    return next(new ErrorResponse('not authorise to access this route', 401));
  }
});

//grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} is unauthorized to access this route`,
          403
        )
      );
    }
    next();
  };
};
