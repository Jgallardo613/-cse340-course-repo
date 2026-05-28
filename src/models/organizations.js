import db from './db.js';

const getAllOrganizations = async () => {
    const query = `SELECT organization_id, name, description, contact_email, logo_filename FROM organization ORDER BY name`;
    const result = await db.query(query);
    return result.rows;
};

const getOrganizationDetails = async (id) => {
    const query = `SELECT organization_id, name, description, contact_email, logo_filename FROM organization WHERE organization_id = $1`;
    const result = await db.query(query, [id]);
    return result.rows[0];
};

const createOrganization = async (name, description, contactEmail) => {
    const query = `
        INSERT INTO organization (name, description, contact_email, logo_filename)
        VALUES ($1, $2, $3, $4)
        RETURNING organization_id
    `;
    const result = await db.query(query, [name, description, contactEmail, 'placeholder-logo.png']);
    if (result.rows.length === 0) {
        throw new Error('Failed to create organization');
    }
    return result.rows[0].organization_id;
};

const updateOrganization = async (id, name, description, contactEmail) => {
    const query = `
        UPDATE organization
        SET name = $1, description = $2, contact_email = $3
        WHERE organization_id = $4
        RETURNING organization_id
    `;
    const result = await db.query(query, [name, description, contactEmail, id]);
    if (result.rows.length === 0) {
        throw new Error('Organization not found or update failed');
    }
    return result.rows[0].organization_id;
};

export { getAllOrganizations, getOrganizationDetails, createOrganization, updateOrganization };
