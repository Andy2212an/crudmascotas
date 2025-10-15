import sql from "mssql";
import dotenv from "dotenv";

dotenv.config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME || process.env.DB_DATABASE,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 1433,
  options: {
    encrypt: true,
    trustServerCertificate: false,
  },
};

let pool;

export async function getConnection() {
  if (pool) return pool;
  try {
    pool = await sql.connect(config);
    return pool;
  } catch (error) {
    console.error("Error de conexión a SQL Server:", error);
    throw error;
  }
}

export { sql };
