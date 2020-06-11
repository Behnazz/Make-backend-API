const express = require('express');
const {
  getBootcamps,
  getBootcamp,
  deleteBootcamp,
  createBootcamp,
  updateBootcamp,
  getBootcampsInRadius,
} = require('../controlers/bootcamps');

const router = express.Router();

router.route('/')
  .get(getBootcamps).post(createBootcamp);

router.route('/:id')
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

router.route('/radius/:zipcode/:distance')
  .get(getBootcampsInRadius);


module.exports = router;
