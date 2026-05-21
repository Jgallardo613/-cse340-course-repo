import express from 'express';
const router = express.Router();

import { buildOrganizationList, buildOrganizationDetail } from '../controllers/organizationsController.js';
import { buildProjectList, buildProjectDetail } from '../controllers/projectsController.js';
import { buildCategoryList, buildCategoryDetail } from '../controllers/categoriesController.js';

router.get('/organizations', buildOrganizationList);
router.get('/organization/:id', buildOrganizationDetail);

router.get('/projects', buildProjectList);
router.get('/project/:id', buildProjectDetail);

router.get('/categories', buildCategoryList);
router.get('/category/:id', buildCategoryDetail);

export default router;
