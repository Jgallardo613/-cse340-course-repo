import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import { getAllOrganizations } from './src/models/organizations.js';
import { getAllProjects } from './src/models/projects.js';
import { getAllCategories } from './src/models/categories.js';

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('home', { title: 'Home' });
});

app.get('/organizations', async (req, res) => {
  try {
    const organizations = await getAllOrganizations();
    res.render('organizations', { title: 'Organizations', organizations });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading organizations');
  }
});

app.get('/projects', async (req, res) => {
  try {
    const projects = await getAllProjects();
    res.render('projects', { title: 'Projects', projects });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading projects');
  }
});

app.get('/categories', async (req, res) => {
  try {
    const categories = await getAllCategories();
    res.render('categories', { title: 'Categories', categories });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading categories');
  }
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
