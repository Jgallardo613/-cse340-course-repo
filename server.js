import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import { getAllOrganizations, getOrganizationDetails } from './src/models/organizations.js';
import { getAllProjects, getUpcomingProjects, getProjectDetails } from './src/models/projects.js';
import { getAllCategories } from './src/models/categories.js';

const app = express();
const PORT = 3000;
const NUMBER_OF_UPCOMING_PROJECTS = 5;

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('home', { title: 'Home' });
});

app.get('/organizations', async (req, res, next) => {
  try {
    const organizations = await getAllOrganizations();
    res.render('organizations', { title: 'Organizations', organizations });
  } catch (err) {
    next(err);
  }
});

app.get('/organization/:id', async (req, res, next) => {
  try {
    const organization = await getOrganizationDetails(req.params.id);
    res.render('organization', { title: organization.name, organization });
  } catch (err) {
    next(err);
  }
});

app.get('/projects', async (req, res, next) => {
  try {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    res.render('projects', { title: 'Upcoming Service Projects', projects });
  } catch (err) {
    next(err);
  }
});

app.get('/project/:id', async (req, res, next) => {
  try {
    const project = await getProjectDetails(req.params.id);
    res.render('project', { title: project.title, project });
  } catch (err) {
    next(err);
  }
});

app.get('/categories', async (req, res, next) => {
  try {
    const categories = await getAllCategories();
    res.render('categories', { title: 'Categories', categories });
  } catch (err) {
    next(err);
  }
});

// Test route for 500 errors
app.get('/test-error', (req, res, next) => {
  const err = new Error('This is a test error');
  err.status = 500;
  next(err);
});

// Catch-all for 404s
app.use((req, res, next) => {
  const err = new Error('Page Not Found');
  err.status = 404;
  next(err);
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error occurred:', err.message);
  console.error('Stack trace:', err.stack);

  const status = err.status || 500;
  const template = status === 404 ? '404' : '500';

  res.status(status).render(`errors/${template}`, {
    title: status === 404 ? 'Page Not Found' : 'Server Error',
    error: err.message,
    stack: err.stack,
    NODE_ENV: process.env.NODE_ENV
  });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));