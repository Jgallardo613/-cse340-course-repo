import { addVolunteer, removeVolunteer } from '../models/volunteers.js';

const processAddVolunteer = async (req, res, next) => {
    try {
        const user_id = req.session.user.user_id;
        const project_id = parseInt(req.body.project_id);
        await addVolunteer(user_id, project_id);
        req.flash('success', 'You have signed up to volunteer for this project!');
        res.redirect(`/project/${project_id}`);
    } catch (err) {
        next(err);
    }
};

const processRemoveVolunteer = async (req, res, next) => {
    try {
        const user_id = req.session.user.user_id;
        const project_id = parseInt(req.body.project_id);
        const source = req.body.source;
        await removeVolunteer(user_id, project_id);
        req.flash('success', 'You have been removed as a volunteer.');
        if (source === 'dashboard') {
            res.redirect('/dashboard');
        } else {
            res.redirect(`/project/${project_id}`);
        }
    } catch (err) {
        next(err);
    }
};

export { processAddVolunteer, processRemoveVolunteer };