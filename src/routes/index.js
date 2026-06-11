import express from 'express';
const router = express.Router();
import { buildOrganizationList, buildOrganizationDetail, organizationValidation, showNewOrganizationForm, processNewOrganizationForm, showEditOrganizationForm, processEditOrganizationForm } from '../controllers/organizationsController.js';
import { buildProjectList, buildProjectDetail, showNewProjectForm, processNewProjectForm, projectValidation, showEditProjectForm, processEditProjectForm } from '../controllers/projectsController.js';
import { buildCategoryList, buildCategoryDetail, categoryValidation, showNewCategoryForm, processNewCategoryForm, showEditCategoryForm, processEditCategoryForm, showAssignCategoriesForm, processAssignCategoriesForm } from '../controllers/categoriesController.js';
import { showUserRegistrationForm, processUserRegistrationForm, showLoginForm, processLoginForm, processLogout, requireLogin, requireRole, showDashboard, showUsersPage } from '../controllers/users.js';
import { processAddVolunteer, processRemoveVolunteer } from '../controllers/volunteersController.js';

router.get('/organizations', buildOrganizationList);
router.get('/organization/:id', buildOrganizationDetail);
router.get('/new-organization', requireRole('admin'), showNewOrganizationForm);
router.post('/new-organization', requireRole('admin'), organizationValidation, processNewOrganizationForm);
router.get('/edit-organization/:id', requireRole('admin'), showEditOrganizationForm);
router.post('/edit-organization/:id', requireRole('admin'), organizationValidation, processEditOrganizationForm);

router.get('/projects', buildProjectList);
router.get('/project/:id', buildProjectDetail);
router.get('/new-project', requireRole('admin'), showNewProjectForm);
router.post('/new-project', requireRole('admin'), projectValidation, processNewProjectForm);
router.get('/edit-project/:id', requireRole('admin'), showEditProjectForm);
router.post('/edit-project/:id', requireRole('admin'), projectValidation, processEditProjectForm);

router.get('/categories', buildCategoryList);
router.get('/category/:id', buildCategoryDetail);
router.get('/new-category', requireRole('admin'), showNewCategoryForm);
router.post('/new-category', requireRole('admin'), categoryValidation, processNewCategoryForm);
router.get('/edit-category/:id', requireRole('admin'), showEditCategoryForm);
router.post('/edit-category/:id', requireRole('admin'), categoryValidation, processEditCategoryForm);
router.get('/assign-categories/:id', requireRole('admin'), showAssignCategoriesForm);
router.post('/assign-categories/:id', requireRole('admin'), processAssignCategoriesForm);

router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);
router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);
router.get('/dashboard', requireLogin, showDashboard);
router.get('/users', requireLogin, requireRole('admin'), showUsersPage);

// W06: Volunteer routes – requireLogin protects both so only logged-in users can POST
router.post('/volunteer/add', requireLogin, processAddVolunteer);
router.post('/volunteer/remove', requireLogin, processRemoveVolunteer);

export default router;