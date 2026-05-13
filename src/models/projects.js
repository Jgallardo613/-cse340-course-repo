import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new pg.Pool({ 
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }  // ADD THIS LINE
});

export const getAllProjects = async () => {
  try {
    const query = `
      SELECT sp.project_id, sp.title, sp.description, sp.location, sp.project_date,
             o.name AS organization_name
      FROM service_projects sp
      JOIN organization o ON sp.organization_id = o.organization_id
      ORDER BY sp.project_date ASC
    `;
    const result = await pool.query(query);
    return result.rows;
  } catch (err) {
    console.error('Error fetching projects:', err);
    throw err;
  }
};