import { getAllOrganizations, getOrganizationDetails } from '../models/organizations.js';
import { getProjectsByOrganization } from '../models/projects.js';

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

export { buildOrganizationList, buildOrganizationDetail };
