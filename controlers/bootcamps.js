const Bootcamp = require('../models/Bootcamp');


//@desc    get all bootcamps;
//@route    GET/api/v1/bootcamps;
//@access   public;
exports.getBootcamps = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'show all bootcamps' });
};

//@desc    get a single bootcamps;
//@route    GET/api/v1/bootcamps/:id;
//@access   public;
exports.getBootcamp = (req, res, next) => {
  res.status(200).json({ success: 200, msg: `get a specific bootcamp with id of ${req.params.id}` });
};

//@desc    create new bootcamp;
//@route    POST/api/v1/bootcamps;
//@access   private;
exports.createBootcamp = async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);

  res.status(201).json({
    success: true,
    data: bootcamp
  });
};

//@desc    update bootcamps;
//@route    PUT/api/v1/bootcamps;
//@access   private;
exports.updateBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Update bootcamp ${req.params.id}` });
};

//@desc    delete bootcamps;
//@route    DELETE/api/v1/bootcamps;
//@access   private;
exports.deleteBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: `delete a bootcamp with id of ${req.params.id}` });
};