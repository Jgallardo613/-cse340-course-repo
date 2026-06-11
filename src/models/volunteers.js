import db from './db.js';

const addVolunteer = async (user_id, project_id) => {
    const query = `
        INSERT INTO volunteers (user_id, project_id)
        VALUES ($1, $2)
        ON CONFLICT (user_id, project_id) DO NOTHING
    `;
    const result = await db.query(query, [user_id, project_id]);
    return result.rowCount;
};

const removeVolunteer = async (user_id, project_id) => {
    const query = `
        DELETE FROM volunteers
        WHERE user_id = $1
          AND project_id = $2
    `;
    const result = await db.query(query, [user_id, project_id]);
    return result.rowCount;
};

const checkVolunteer = async (user_id, project_id) => {
    const query = `
        SELECT 1 FROM volunteers
        WHERE user_id = $1
          AND project_id = $2
    `;
    const result = await db.query(query, [user_id, project_id]);
    return result.rowCount > 0;
};

const getVolunteerProjectsByUser = async (user_id) => {
    const query = `
        SELECT sp.project_id, sp.title, sp.location, sp.project_date, v.created_at AS signup_date
        FROM volunteers v
        JOIN service_projects sp ON sp.project_id = v.project_id
        WHERE v.user_id = $1
        ORDER BY v.created_at DESC
    `;
    const result = await db.query(query, [user_id]);
    return result.rows;
};

export { addVolunteer, removeVolunteer, checkVolunteer, getVolunteerProjectsByUser };