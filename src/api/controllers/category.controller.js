const { Category } = require('../models');
const { sendErr } = require('../../utils');

/*  ======================
 *  -- Category CONTROLLERS --
 *  ======================
 */

// -| Category main controllers |-

const addCategory = async (req, res, next) => {
  try {
    const categoryData = new Category({
        categoryName:req.body.categoryName,
        categoryDescription:req.body.categoryDescription,
        otherDetails:req.body.otherDetails
    });

    const category = await Category.create(categoryData);

    return res.status(200).json({
      message: 'New Category Added!',
      category
    });
  } catch (err) {
    return sendErr(res, err);
  }
};

const getAllCategories = async (req, res, next) => {
  try {
    const categories =  await Category.find()
    .sort('-created_date')
    .lean();

    return res.status(200).json({
      message: 'All Categories found!',
      categories
      
    });
  } catch (err) {
    return sendErr(res, err);
  }
};

const getCategory = async(req, res, next) =>{
  try {
    const { params:{categoryId} } = req;

    const category = await Category.findOne({
      _id: categoryId
    })
      .select('_id categoryName categoryDescription subCategories parentCategories otherDetails createdDate');

    // Category not found
    if (!category) {
      return sendErr(res, err, 'Error! Category not found, invalid id or unauthorized request', 404);
    }

    return res.status(200).json({
      message: `Category found!`,
      category
    });

  } catch (err) {
    return sendErr(res, err);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;
    const categoryData = req.body;

    delete req.body.categoryId

    const category = await Category.findOneAndUpdate({
      _id: categoryId
    }, {
      $set: categoryData
    }, {
      new: true
    });

    return res.status(200).json({
      message: 'Category updated!',
      category
    });

  } catch (err) {
    return sendErr(res, err);
  }
};

const removeCategory = async (req, res, next) => {
    try {
      const categoryId  = req.params.categoryId;
  
      // Get category data
      const category = await Category.findOne({
        _id: categoryId
      }).lean();
  
      const categoryRemoved = await Category.findByIdAndRemove(category);
  
      return res.status(200).json({
        message: 'Category deleted!',
        categoryRemoved
      });
    } catch (err) {
      return sendErr(res, err);
    }
  };

/*  =============
 *  -- EXPORTS --
 *  =============
 */

module.exports = {
  // User Main controllers
  addCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  removeCategory
};
