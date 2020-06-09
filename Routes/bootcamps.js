const express = require('express');
const {
  getBootcamps,
  getBootcamp,
  deleteBootcamp,
  createBootcamp,
  updateBootcamp } = require('../controlers/bootcamps')

const router = express.Router();

router.route('/')
  .get(getBootcamps)
  .post(createBootcamp);

router.route('/:id')
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

module.exports = router