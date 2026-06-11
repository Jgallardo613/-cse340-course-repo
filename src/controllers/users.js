import bcrypt from 'bcrypt';
import { createUser, authenticateUser, getAllUsers } from '../models/users.js';
import { getVolunteerProjectsByUser } from '../models/volunteers.js';

const showUserRegistrationForm = (req, res) => {
    res.render('register', { title: 'Register' });
};

const processUserRegistrationForm = async (req, res) => {
    const { name, email, password } = req.body;
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    await createUser(name, email, passwordHash);
    req.flash('success', 'Account created successfully!');
    res.redirect('/login');
};

const showLoginForm = (req, res) => {
    res.render('login', { title: 'Login' });
};

const processLoginForm = async (req, res) => {
    const { email, password } = req.body;
    const user = await authenticateUser(email, password);
    if (user) {
        req.session.user = user;
        req.flash('success', 'Login successful!');
        res.redirect('/dashboard');
    } else {
        req.flash('error', 'Invalid email or password.');
        res.redirect('/login');
    }
};

const processLogout = (req, res) => {
    req.session.user = null;
    req.flash('success', 'You have been logged out.');
    res.redirect('/login');
};

const requireLogin = (req, res, next) => {
    if (!req.session.user) {
        req.flash('error', 'You must be logged in to view this page.');
        return res.redirect('/login');
    }
    next();
};

const requireRole = (role) => {
    return (req, res, next) => {
        if (!req.session.user || req.session.user.role_name !== role) {
            req.flash('error', 'You do not have permission to access this page.');
            return res.redirect('/dashboard');
        }
        next();
    };
};

const showDashboard = async (req, res, next) => {
    try {
        const { user_id, name, email, role_name } = req.session.user;
        const volunteerProjects = await getVolunteerProjectsByUser(user_id);
        res.render('dashboard', { title: 'Dashboard', name, email, role_name, volunteerProjects });
    } catch (err) {
        next(err);
    }
};

const showUsersPage = async (req, res) => {
    const users = await getAllUsers();
    res.render('users', { title: 'All Users', users });
};

export { showUserRegistrationForm, processUserRegistrationForm, showLoginForm, processLoginForm, processLogout, requireLogin, requireRole, showDashboard, showUsersPage };