import { getAllOrganizations, getOrganizationDetails, createOrganization, updateOrganization } from '../models/organizations.js';
import { getProjectsByOrganization } from '../models/projects.js';
import { body, validationResult } from 'express-validator';

const buildOrganizationList = async (req, res, next) => {
  try {
    const organizations = await getAllOrganizations();
    res.render('organizations', { title: 'Organizations', organizations });
  } catch (err) {
    next(err);
  }
};

const buildOrganizationDetail = async (req, res, next) => {
  try {
    const organization = await getOrganizationDetails(req.params.id);
    if (!organization) {
      const err = new Error('Organization not found');
      err.status = 404;
      return next(err);
    }
    const projects = await getProjectsByOrganization(req.params.id);
    res.render('organization', { title: organization.name, organization, projects });
  } catch (err) {
    next(err);
  }
};

const organizationValidation = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ min: 3, max: 255 }).withMessage('Name must be between 3 and 255 characters'),
  body('description').trim().notEmpty().withMessage('Description is required').isLength({ max: 1000 }).withMessage('Description must be less than 1000 characters'),
  body('contactEmail').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email address'),
];

const showNewOrganizationForm = async (req, res, next) => {
  try {
    res.render('new-organization', { title: 'New Organization' });
  } catch (err) {
    next(err);
  }
};

const processNewOrganizationForm = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash('error', errors.array().map(e => e.msg).join(', '));
      return res.redirect('/new-organization');
    }
    const { name, description, contactEmail } = req.body;
    const organizationId = await createOrganization(name, description, contactEmail);
    req.flash('success', 'Organization created successfully!');
    res.redirect(`/organization/${organizationId}`);
  } catch (err) {
    next(err);
  }
};

const showEditOrganizationForm = async (req, res, next) => {
  try {
    const organization = await getOrganizationDetails(req.params.id);
    if (!organization) {
      const err = new Error('Organization not found');
      err.status = 404;
      return next(err);
    }
    res.render('edit-organization', { title: 'Edit Organization', organization });
  } catch (err) {
    next(err);
  }
};

const processEditOrganizationForm = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash('error', errors.array().map(e => e.msg).join(', '));
      return res.redirect(`/edit-organization/${req.params.id}`);
    }
    const { name, description, contactEmail } = req.body;
    await updateOrganization(req.params.id, name, description, contactEmail);
    req.flash('success', 'Organization updated successfully!');
    res.redirect(`/organization/${req.params.id}`);
  } catch (err) {
    next(err);
  }
};

export { buildOrganizationList, buildOrganizationDetail, organizationValidation, showNewOrganizationForm, processNewOrganizationForm, showEditOrganizationForm, processEditOrganizationForm };
