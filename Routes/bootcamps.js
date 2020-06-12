const express = require('express');
const {
  getBootcamps,
  getBootcamp,
  deleteBootcamp,
  createBootcamp,
  updateBootcamp,
  getBootcampsInRadius,
} = require('../controlers/bootcamps');

// Include other resource router
const courseRouter = require('./courses')

const router = express.Router();

router.route('/').get(getBootcamps).post(createBootcamp);

router
  .route('/:id')
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

//re-route into any other resource routers
//any thing that has :bootcamp/courses redirected to courses route
router.use('/:bootcampId/courses', courseRouter) 

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

module.exports = router;
