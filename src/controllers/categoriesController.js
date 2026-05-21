import { getAllCategories, getCategoryById, getProjectsByCategory } from '../models/categories.js';

const buildCategoryList = async (req, res, next) => {
  try {
    const categories = await getAllCategories();
    res.render('categories', { title: 'Categories', categories });
  } catch (err) {
    next(err);
  }
};

const buildCategoryDetail = async (req, res, next) => {
  try {
    const category = await getCategoryById(req.params.id);
    if (!category) {
      const err = new Error('Category not found');
      err.status = 404;
      return next(err);
    }
    const projects = await getProjectsByCategory(req.params.id);
    res.render('category', { title: category.name, category, projects });
  } catch (err) {
    next(err);
  }
};

export { buildCategoryList, buildCategoryDetail };
