import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

export const getAllOrganizations = async () => {
  try {
    const result = await pool.query('SELECT * FROM organization');
    return result.rows;
  } catch (err) {
    console.error('Error fetching organizations:', err);
    throw err;
  }
};