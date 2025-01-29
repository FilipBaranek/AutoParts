const Category = require('../models/categoryModel.js');


exports.partCategories = async (categoryData) => {
    const categories = await Category.getCategories(categoryData.catName);

    return categories;
}
