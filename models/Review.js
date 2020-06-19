const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please add a title for the review'],
    maxlength: 100,
  },
  text: {
    type: String,
    required: [true, 'Please add some text'],
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, 'Please add a rating between 1 and 10'],
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

// Prevent user from submitting more than one review per bootcamp(there is bug here!!!!!!!!!!!!!)
ReviewSchema.index({ bootcamp: 1, user: 1 }, { unique: true });

//static method to get the average rating and save
ReviewSchema.statics.getAverageRating = async function (bootcampId) {
  //aggregate gives a promise
  const averageReviewObj = await this.aggregate([
    //pipeline
    {
      //matching bootcamp at the top with bootcampId we pass
      $match: { bootcamp: bootcampId },
    },
    {
      $group: {
        _id: '$bootcamp',
        averageRating: { $avg: '$rating' },
      },
    },
  ]);
  try {
    //grab the Bootcamp model and update specific bootcamp by ID and add aggregation method at the top as a value to average rating key
    await this.model('Bootcamp').findByIdAndUpdate(bootcampId, {
      averageRating: averageReviewObj[0].averageRating
    });
  } catch (error) {
    console.log(error)
  }
};

//call a method -> getAverageRating after save
ReviewSchema.post('save', function () {
  this.constructor.getAverageRating(this.bootcamp);
});


//call a method(middleware) -> getAverageRating before remove
ReviewSchema.pre('remove', function () {
  this.constructor.getAverageRating(this.bootcamp);
});



module.exports = mongoose.model('Review', ReviewSchema);
