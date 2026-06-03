import express from 'express';
const router = express.Router();

import { buildOrganizationList, buildOrganizationDetail, organizationValidation, showNewOrganizationForm, processNewOrganizationForm, showEditOrganizationForm, processEditOrganizationForm } from '../controllers/organizationsController.js';
import { buildProjectList, buildProjectDetail, showNewProjectForm, processNewProjectForm, projectValidation, showEditProjectForm, processEditProjectForm } from '../controllers/projectsController.js';
import { buildCategoryList, buildCategoryDetail, categoryValidation, showNewCategoryForm, processNewCategoryForm, showEditCategoryForm, processEditCategoryForm, showAssignCategoriesForm, processAssignCategoriesForm } from '../controllers/categoriesController.js';
import { showUserRegistrationForm, processUserRegistrationForm, showLoginForm, processLoginForm, processLogout, requireLogin, showDashboard } from '../controllers/users.js';

router.get('/organizations', buildOrganizationList);
router.get('/organization/:id', buildOrganizationDetail);
router.get('/new-organization', showNewOrganizationForm);
router.post('/new-organization', organizationValidation, processNewOrganizationForm);
router.get('/edit-organization/:id', showEditOrganizationForm);
router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm);

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

router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);
router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);
router.get('/dashboard', requireLogin, showDashboard);

export default router;