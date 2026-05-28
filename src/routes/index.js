import express from 'express';
const router = express.Router();

import { buildOrganizationList, buildOrganizationDetail } from '../controllers/organizationsController.js';
import { buildProjectList, buildProjectDetail, showNewProjectForm, processNewProjectForm, projectValidation, showEditProjectForm, processEditProjectForm } from '../controllers/projectsController.js';
import { buildCategoryList, buildCategoryDetail } from '../controllers/categoriesController.js';

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

export default router;