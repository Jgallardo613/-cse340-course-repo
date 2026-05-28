import { getAllCategories, getCategoryById, getProjectsByCategory, createCategory, updateCategory, updateProjectCategories } from '../models/categories.js';
import { getProjectDetails } from '../models/projects.js';
import { body, validationResult } from 'express-validator';

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

const categoryValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Category name is required')
    .isLength({ min: 3 }).withMessage('Category name must be at least 3 characters')
    .isLength({ max: 100 }).withMessage('Category name must be less than 100 characters'),
];

const showNewCategoryForm = async (req, res, next) => {
  try {
    res.render('new-category', { title: 'New Category' });
  } catch (err) {
    next(err);
  }
};

const processNewCategoryForm = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash('error', errors.array().map(e => e.msg).join(', '));
      return res.redirect('/new-category');
    }
    const { name } = req.body;
    await createCategory(name);
    req.flash('success', 'Category created successfully!');
    res.redirect('/categories');
  } catch (err) {
    next(err);
  }
};

const showEditCategoryForm = async (req, res, next) => {
  try {
    const category = await getCategoryById(req.params.id);
    if (!category) {
      const err = new Error('Category not found');
      err.status = 404;
      return next(err);
    }
    res.render('edit-category', { title: 'Edit Category', category });
  } catch (err) {
    next(err);
  }
};

const processEditCategoryForm = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash('error', errors.array().map(e => e.msg).join(', '));
      return res.redirect(`/edit-category/${req.params.id}`);
    }
    const { name } = req.body;
    await updateCategory(req.params.id, name);
    req.flash('success', 'Category updated successfully!');
    res.redirect(`/category/${req.params.id}`);
  } catch (err) {
    next(err);
  }
};

const showAssignCategoriesForm = async (req, res, next) => {
  try {
    const project = await getProjectDetails(req.params.id);
    if (!project) {
      const err = new Error('Project not found');
      err.status = 404;
      return next(err);
    }
    const allCategories = await getAllCategories();
    const { getCategoriesByProject } = await import('../models/categories.js');
    const assignedCategories = await getCategoriesByProject(req.params.id);
    const assignedIds = assignedCategories.map(c => c.category_id);
    res.render('assign-categories', {
      title: 'Assign Categories',
      project,
      allCategories,
      assignedIds
    });
  } catch (err) {
    next(err);
  }
};

const processAssignCategoriesForm = async (req, res, next) => {
  try {
    const project_id = req.params.id;
    const category_ids = req.body.categories
      ? (Array.isArray(req.body.categories) ? req.body.categories : [req.body.categories])
      : [];
    await updateProjectCategories(project_id, category_ids);
    req.flash('success', 'Categories updated successfully!');
    res.redirect(`/project/${project_id}`);
  } catch (err) {
    next(err);
  }
};

export {
  buildCategoryList,
  buildCategoryDetail,
  categoryValidation,
  showNewCategoryForm,
  processNewCategoryForm,
  showEditCategoryForm,
  processEditCategoryForm,
  showAssignCategoriesForm,
  processAssignCategoriesForm
};