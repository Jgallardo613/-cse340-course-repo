import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import flash from 'connect-flash';
dotenv.config();

import router from './src/routes/index.js';

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: true
}));

app.use(flash());

app.use((req, res, next) => {
  res.locals.messages = req.flash();
  next();
});

app.get('/', (req, res) => {
  res.render('home', { title: 'Home' });
});

app.use(router);

app.get('/test-error', (req, res, next) => {
  const err = new Error('This is a test error');
  err.status = 500;
  next(err);
});

app.use((req, res, next) => {
  const err = new Error('Page Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.error('Error occurred:', err.message);
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