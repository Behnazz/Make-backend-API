const express = require('express');
const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse
} = require('../controlers/courses');

const router = express.Router({ mergeParams: true }); //so the reroute works here

router.route('/')
  .get(getCourses)
  .post(addCourse);

router.route('/:id')
  .get(getCourse)
  .put(updateCourse) 
  .delete(deleteCourse)

module.exports = router;
