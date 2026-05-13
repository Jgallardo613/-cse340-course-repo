import express from 'express';
import dotenv from 'dotenv';
import { getAllOrganizations } from './src/models/organizations.js';
import { getAllProjects } from './src/models/projects.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => {
  res.render('home', { title: 'Home' });
});

app.get('/organizations', async (req, res) => {
  try {
    const organizations = await getAllOrganizations();
    res.render('organizations', { title: 'Organizations', organizations });
  } catch (err) {
    res.status(500).send('Error loading organizations');
  }
});

app.get('/projects', async (req, res) => {
  try {
    const projects = await getAllProjects();
    console.log(projects); // verify in console
    res.render('projects', { title: 'Projects', projects });
  } catch (err) {
    res.status(500).send('Error loading projects');
  }
});

app.get('/categories', (req, res) => {
  res.render('categories', { title: 'Categories' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});