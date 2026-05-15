import db from './db.js';

const getAllOrganizations = async () => {
    const query = `SELECT organization_id, name, description FROM organization ORDER BY name`;
    const result = await db.query(query);
    return result.rows;
};

export { getAllOrganizations };