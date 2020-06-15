const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//load env variables
dotenv.config({ path: './config/config.env' });

//load models
const Bootcamp = require('./models/Bootcamp');
const Course = require('./models/Course');
//connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

//Read the json files
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8')
);
const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/courses.json`, 'utf-8')
);
//Imports into DB
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    // await Course.create(courses);

    console.log('data imported ...');

    process.exit();
  } catch (error) {
    console.log(error);
  }
};

//Delete the data from DB
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    await Course.deleteMany();

    console.log('data destroyed');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
