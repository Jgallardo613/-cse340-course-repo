import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Static middleware
app.use(express.static('public'));

// View engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Routes
app.get('/', (req, res) => {
  res.render('home', { title: 'Home' });
});

app.get('/organizations', (req, res) => {
  res.render('organizations', { title: 'Organizations' });
});

app.get('/projects', (req, res) => {
  res.render('projects', { title: 'Projects' });
});

app.get('/categories', (req, res) => {
  res.render('categories', { title: 'Categories' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).render('404');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});