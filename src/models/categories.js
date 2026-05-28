import db from './db.js';

const getAllCategories = async () => {
    const query = `SELECT category_id, name FROM categories ORDER BY name`;
    const result = await db.query(query);
    return result.rows;
};

const getCategoryById = async (id) => {
    const query = `SELECT category_id, name FROM categories WHERE category_id = $1`;
    const result = await db.query(query, [id]);
    return result.rows[0];
};

const getCategoriesByProject = async (project_id) => {
    const query = `
        SELECT c.category_id, c.name
        FROM categories c
        JOIN project_categories pc ON c.category_id = pc.category_id
        WHERE pc.project_id = $1
        ORDER BY c.name ASC
    `;
    const result = await db.query(query, [project_id]);
    return result.rows;
};

const getProjectsByCategory = async (category_id) => {
    const query = `
        SELECT sp.project_id, sp.title, sp.project_date
        FROM service_projects sp
        JOIN project_categories pc ON sp.project_id = pc.project_id
        WHERE pc.category_id = $1
        ORDER BY sp.project_date ASC
    `;
    const result = await db.query(query, [category_id]);
    return result.rows;
};

const createCategory = async (name) => {
    const query = `
        INSERT INTO categories (name)
        VALUES ($1)
        RETURNING category_id
    `;
    const result = await db.query(query, [name]);
    return result.rows[0].category_id;
};

const updateCategory = async (id, name) => {
    const query = `
        UPDATE categories
        SET name = $1
        WHERE category_id = $2
        RETURNING category_id
    `;
    const result = await db.query(query, [name, id]);
    if (result.rows.length === 0) {
        throw new Error('Category not found or update failed');
    }
    return result.rows[0].category_id;
};

const updateProjectCategories = async (project_id, category_ids) => {
    await db.query(`DELETE FROM project_categories WHERE project_id = $1`, [project_id]);
    if (category_ids && category_ids.length > 0) {
        for (const category_id of category_ids) {
            await db.query(
                `INSERT INTO project_categories (project_id, category_id) VALUES ($1, $2)`,
                [project_id, category_id]
            );
        }
    }
};

export { getAllCategories, getCategoryById, getCategoriesByProject, getProjectsByCategory, createCategory, updateCategory, updateProjectCategories };