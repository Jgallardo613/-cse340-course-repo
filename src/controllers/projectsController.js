import { getUpcomingProjects, getProjectDetails, createProject, updateProject } from '../models/projects.js';
import { getCategoriesByProject } from '../models/categories.js';
import { getAllOrganizations } from '../models/organizations.js';
import { checkVolunteer } from '../models/volunteers.js';
import { body, validationResult } from 'express-validator';

const NUMBER_OF_UPCOMING_PROJECTS = 5;

const buildProjectList = async (req, res, next) => {
  try {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    res.render('projects', { title: 'Upcoming Service Projects', projects });
  } catch (err) {
    next(err);
  }
};

const buildProjectDetail = async (req, res, next) => {
  try {
    const project = await getProjectDetails(req.params.id);
    if (!project) {
      const err = new Error('Project not found');
      err.status = 404;
      return next(err);
    }
    const categories = await getCategoriesByProject(req.params.id);

    // W06: check if the logged-in user is already a volunteer for this project
    let isVolunteer = false;
    if (req.session.user) {
      isVolunteer = await checkVolunteer(req.session.user.user_id, req.params.id);
    }

    res.render('project', { title: project.title, project, categories, isVolunteer });
  } catch (err) {
    next(err);
  }
};

const projectValidation = [
  body('title').trim().notEmpty().withMessage('Title is required').isLength({ min: 3, max: 200 }).withMessage('Title must be between 3 and 200 characters'),
  body('description').trim().notEmpty().withMessage('Description is required').isLength({ max: 1000 }).withMessage('Description must be less than 1000 characters'),
  body('location').trim().notEmpty().withMessage('Location is required').isLength({ max: 200 }).withMessage('Location must be less than 200 characters'),
  body('date').notEmpty().withMessage('Date is required').isDate().withMessage('Invalid date format'),
  body('organizationId').notEmpty().withMessage('Organization is required').isInt().withMessage('Invalid organization'),
];

const showNewProjectForm = async (req, res, next) => {
  try {
    const organizations = await getAllOrganizations();
    res.render('new-project', { title: 'New Service Project', organizations });
  } catch (err) {
    next(err);
  }
};

const processNewProjectForm = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash('error', errors.array().map(e => e.msg).join(', '));
      return res.redirect('/new-project');
    }
    const { organizationId, title, description, location, date } = req.body;
    await createProject(title, description, location, date, organizationId);
    req.flash('success', 'Service project created successfully!');
    res.redirect('/projects');
  } catch (err) {
    next(err);
  }
};

const showEditProjectForm = async (req, res, next) => {
  try {
    const project = await getProjectDetails(req.params.id);
    if (!project) {
      const err = new Error('Project not found');
      err.status = 404;
      return next(err);
    }
    const organizations = await getAllOrganizations();
    res.render('edit-project', { title: 'Edit Service Project', project, organizations });
  } catch (err) {
    next(err);
  }
};

const processEditProjectForm = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash('error', errors.array().map(e => e.msg).join(', '));
      return res.redirect(`/edit-project/${req.params.id}`);
    }
    const { title, description, location, date, organizationId } = req.body;
    await updateProject(req.params.id, title, description, location, date, organizationId);
    req.flash('success', 'Project updated successfully!');
    res.redirect(`/project/${req.params.id}`);
  } catch (err) {
    next(err);
  }
};

export { buildProjectList, buildProjectDetail, showNewProjectForm, processNewProjectForm, projectValidation, showEditProjectForm, processEditProjectForm };