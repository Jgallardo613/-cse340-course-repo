import express from 'express';
const router = express.Router();

import { buildOrganizationList, buildOrganizationDetail } from '../controllers/organizationsController.js';
import { buildProjectList, buildProjectDetail, showNewProjectForm, processNewProjectForm, projectValidation, showEditProjectForm, processEditProjectForm } from '../controllers/projectsController.js';
import { buildCategoryList, buildCategoryDetail, categoryValidation, showNewCategoryForm, processNewCategoryForm, showEditCategoryForm, processEditCategoryForm, showAssignCategoriesForm, processAssignCategoriesForm } from '../controllers/categoriesController.js';

router.get('/organizations', buildOrganizationList);
router.get('/organization/:id', buildOrganizationDetail);

router.get('/projects', buildProjectList);
router.get('/project/:id', buildProjectDetail);
router.get('/new-project', showNewProjectForm);
router.post('/new-project', projectValidation, processNewProjectForm);
router.get('/edit-project/:id', showEditProjectForm);
router.post('/edit-project/:id', projectValidation, processEditProjectForm);

router.get('/categories', buildCategoryList);
router.get('/category/:id', buildCategoryDetail);
router.get('/new-category', showNewCategoryForm);
router.post('/new-category', categoryValidation, processNewCategoryForm);
router.get('/edit-category/:id', showEditCategoryForm);
router.post('/edit-category/:id', categoryValidation, processEditCategoryForm);

router.get('/assign-categories/:id', showAssignCategoriesForm);
router.post('/assign-categories/:id', processAssignCategoriesForm);

export default router;