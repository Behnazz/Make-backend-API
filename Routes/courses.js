const express = require('express');
const {getCourses} = require('../controlers/courses');

const router = express.Router({mergeParams: true}); //so the reroute works here

router.route('/').get(getCourses);

module.exports = router;
