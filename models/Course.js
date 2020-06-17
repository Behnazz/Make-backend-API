const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please add a course title'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  weeks: {
    type: String,
    required: [true, 'Please add number of weeks'],
  },
  tuition: {
    type: Number,
    required: [true, 'Please add a tuition cost'],
  },
  minimumSkill: {
    type: String,
    required: [true, 'Please add a minimum skill'],
    enum: ['beginner', 'intermediate', 'advance'],
  },
  scholarshipAvailable: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  //relationship and reference to a bootcamp
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: 'Bootcamp', //reference to Bootcamp Model
    required: true,
  },
  //relationship and reference to a user
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User', //reference to Bootcamp Model
    required: true,
  },
});

//static in mongoose apply directly to model
//static method to get the average of course tuition
CourseSchema.statics.getAverageCost = async function (bootcampId) {
  //aggregate gives a promise
  const averageCostObj = await this.aggregate([
    //pipeline
    {
      //matching bootcamp at the top with bootcampId we pass
      $match: { bootcamp: bootcampId },
    },
    {
      $group: {
        _id: '$bootcamp',
        averageCost: { $avg: '$tuition' },
      },
    },
  ]);
  try {
    //grab the Bootcamp model and update specific bootcamp by ID and add aggregation method at the top as a value to average Cost key
    await this.model('Bootcamp').findByIdAndUpdate(bootcampId, {
      averageCost: Math.ceil(averageCostObj[0].averageCost / 10) * 10,
    });
  } catch (error) {
    console.log(error)
  }
};

//call a method -> getAverageCost after save
CourseSchema.post('save', function () {
  this.constructor.getAverageCost(this.bootcamp);
});

//call a method(middleware) -> getAverageCost before remove
CourseSchema.pre('remove', function () {
  this.constructor.getAverageCost(this.bootcamp);
});

module.exports = mongoose.model('Course', CourseSchema);
