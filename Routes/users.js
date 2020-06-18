const express = require('express');
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controlers/users');

const User = require('../models/User');

const router = express.Router({ mergeParams: true }); //so the reroute works here


const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth'); //to protect some routes

//anything below this will be protected and authorized instead of repeating them
router.use(protect);
router.use(authorize('admin'));

router
  .route('/')
  .get(advancedResults(User), getUsers)
  .post(createUser)

router
  .route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

  module.exports = router