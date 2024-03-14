const CourseModel = require('../models/Course');

const getAllCourses = async (req, res) => {
  const { limit = 10, offset = 0 } = req.query;
  const query = { isActive: true };

  try {
    const [results, total] = await Promise.all([
      CourseModel.find(query)
        .skip(offset)
        .limit(limit)
        .populate('user', 'email')
        .populate('category', 'name'),
      CourseModel.countDocuments(query),
    ]);

    res.json({
      message: 'All courses',
      courses: results,
      total,
    });
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.json({
      message: 'INTERNAL SERVER ERROR',
      error: error.message,
    });
  }
};

const getCourse = async (req, res) => {
  // /courses/:id
  const { id } = req.params;

  try {
    const course = await CourseModel.findById(id).populate('user').populate('category', 'name');

    if (!course) {
      return res.status(404).json({
        message: `Course with id: ${id} is not found`,
      });
    }

    res.json({
      message: 'Get course by id',
      result: course,
    });
  } catch (error) {
    res.status(500).json({
      message: 'INTERNAL SERVER ERROR',
      error: error.message,
    });
  }
};

const createCourse = async (req, res) => {
  console.log('Se llega aca????');
  const { price, category, description, img, duration } = req.body;
  const name = req.body.name.toUpperCase();

  try {
    const courseDB = await CourseModel.findOne({ name });

    if (courseDB) {
      return res.status(400).json({
        message: `Course ${courseDB.name} is already exist`,
      });
    }

    const newCourse = new CourseModel({
      name,
      price,
      category,
      description,
      img,
      duration,
      user: req.user._id,
    });

    await newCourse.save();

    res.status(201).json({
      newCourse,
      message: `course created success`,
    });
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.json({
      message: 'INTERNAL SERVER ERROR',
      error: error.message,
    });
  }
};

const updateCourse = async (req, res) => {
  const { id } = req.params;
  const { name, ...body } = req.body;

  try {
    const courseUpdated = await CourseModel.findByIdAndUpdate(
      id,
      { ...body, name: name && name.toUpperCase() },
      { new: true }
    );

    if (!courseUpdated) {
      return res.status(404).json({
        message: `Course with id: ${id} is not found`,
      });
    }

    res.json({
      message: 'Course updated successfully',
      course: courseUpdated,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'INTERNAL SERVER ERROR',
      error: error.message,
    });
  }
};

const deleteCourse = async (req, res) => {
  const { id } = req.params;

  try {
    const course = await CourseModel.findById(id);

    if (!course) {
      return res.status(404).json({
        message: `Course with id: ${id} is not found`,
      });
    }

    if (!course.isActive) {
      return res.status(404).json({
        message: `Course with id: ${id} is inactive`,
      });
    }

    const deletedCourse = await CourseModel.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    res.json({
      message: 'Delete course successfully',
      deletedCourse,
    });
  } catch (error) {
    res.status(500).json({
      message: 'INTERNAL SERVER ERROR',
      error: error.message,
    });
  }
};

module.exports = {
  getAllCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
};
