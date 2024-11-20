const { validationResult } = require("express-validator");

const course = require("../models/course_model");

const getCourses = async (req, res) => {
  const courses = await course.find();
  res.json(courses);
};

const getCourse = async (req, res) => {
  try {
    const findedCourse = await course.findById(req.params.id);
    if (!findedCourse) {
      return res.status(404).json({
        message: "no courses found",
      });
    }
    return res.status(200).json(findedCourse);
  } catch (err) {
    return res.status(400).json({ message: "invalid id" });
  }
};

const addCourse = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({
      message: error.array(),
    });
  }
  const newCourse = new course(req.body);
  await newCourse.save();
  res.status(201).json(newCourse);
};

const updateCourse = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedCourse = await course.findByIdAndUpdate(id, {
      $set: req.body,
    });
    return res.status(200).json(updatedCourse);
  } catch (err) {
    return res.status(400).json({
      message: err,
    });
  }
};

const deletCourse = async (req, res) => {
  try {
    const deletedOne = await course.deleteOne({ _id: req.params.id });
    return res.status(200).json(deletedOne);
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

module.exports = {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deletCourse,
};
