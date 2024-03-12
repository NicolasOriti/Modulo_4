const CategoryModel = require('../models/Category');

const getAllCategories = async (req, res) => {
  const { limit = 10, offset = 0 } = req.query;
  const query = { isActive: true };

  try {
    const [results, total] = await Promise.all([
      CategoryModel.find(query).skip(offset).limit(limit).populate('user', 'email'),
      CategoryModel.countDocuments(query),
    ]);

    res.json({
      message: 'All categories',
      categories: results,
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

const getCategory = async (req, res) => {
  // /categories/:id
  const { id } = req.params;

  try {
    const category = await CategoryModel.findById(id).populate('user');

    if (!category) {
      return res.status(404).json({
        message: `Category with id: ${id} is not found`,
      });
    }

    res.json({
      message: 'Get category by id',
      result: category,
    });
  } catch (error) {
    res.status(500).json({
      message: 'INTERNAL SERVER ERROR',
      error: error.message,
    });
  }
};

const createCategory = async (req, res) => {
  const name = req.body.name.toUpperCase();

  try {
    const categoryDB = await CategoryModel.findOne({ name });

    if (categoryDB) {
      return res.status(400).json({
        message: `Category ${categoryDB.name} is already exist`,
      });
    }

    const newCategory = new CategoryModel({ name, user: '65e6526eca6ebafe6b754455' });

    await newCategory.save();

    res.status(201).json({
      newCategory,
      message: `category created success`,
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

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, ...body } = req.body;

  try {
    const categoryUpdated = await CategoryModel.findByIdAndUpdate(
      id,
      { ...body, name: name.toUpperCase() },
      { new: true }
    );

    if (!categoryUpdated) {
      return res.status(404).json({
        message: `Category with id: ${id} is not found`,
      });
    }

    res.json({
      message: 'Category updated successfully',
      category: categoryUpdated,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'INTERNAL SERVER ERROR',
      error: error.message,
    });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await CategoryModel.findById(id);

    if (!category) {
      return res.status(404).json({
        message: `Category with id: ${id} is not found`,
      });
    }

    if (!category.isActive) {
      return res.status(404).json({
        message: `Category with id: ${id} is inactive`,
      });
    }

    const deletedCategory = await CategoryModel.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    res.json({
      message: 'Delete category successfully',
      deletedCategory,
    });
  } catch (error) {
    res.status(500).json({
      message: 'INTERNAL SERVER ERROR',
      error: error.message,
    });
  }
};

module.exports = {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
