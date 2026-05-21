import { getUpcomingProjects, getProjectDetails } from '../models/projects.js';
import { getCategoriesByProject } from '../models/categories.js';

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
    res.render('project', { title: project.title, project, categories });
  } catch (err) {
    next(err);
  }
};

export { buildProjectList, buildProjectDetail };
