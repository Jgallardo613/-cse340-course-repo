import db from './db.js';

const getAllProjects = async () => {
    const query = `
        SELECT sp.project_id, sp.title, sp.description, sp.location, sp.project_date,
               o.name AS organization_name
        FROM service_projects sp
        JOIN organization o ON sp.organization_id = o.organization_id
        ORDER BY sp.project_date ASC
    `;
    const result = await db.query(query);
    return result.rows;
};

const getUpcomingProjects = async (number_of_projects) => {
    const query = `
        SELECT sp.project_id, sp.title, sp.description, sp.location, sp.project_date,
               sp.organization_id, o.name AS organization_name
        FROM service_projects sp
        JOIN organization o ON sp.organization_id = o.organization_id
        WHERE sp.project_date >= CURRENT_DATE
        ORDER BY sp.project_date ASC
        LIMIT $1
    `;
    const result = await db.query(query, [number_of_projects]);
    return result.rows;
};

const getProjectDetails = async (id) => {
    const query = `
        SELECT sp.project_id, sp.title, sp.description, sp.location, sp.project_date,
               sp.organization_id, o.name AS organization_name
        FROM service_projects sp
        JOIN organization o ON sp.organization_id = o.organization_id
        WHERE sp.project_id = $1
    `;
    const result = await db.query(query, [id]);
    return result.rows[0];
};

const getProjectsByOrganization = async (organization_id) => {
    const query = `
        SELECT project_id, title, project_date
        FROM service_projects
        WHERE organization_id = $1
        ORDER BY project_date ASC
    `;
    const result = await db.query(query, [organization_id]);
    return result.rows;
};

export { getAllProjects, getUpcomingProjects, getProjectDetails, getProjectsByOrganization };
