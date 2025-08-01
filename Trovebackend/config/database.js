

// import dotenv from 'dotenv';
// import mysql from 'mysql2/promise';

// dotenv.config();

// const isLocal = process.env.NODE_ENV === "development";

// const config={
//   //  host:'10.64.176.3',
//   host:"34.93.75.171",
//   user:"datasolve",
//   database:"mc",
//   password:"datasolve@2025",
//   port:"3306"
// }

// // Create a connection pool
// const pool = mysql.createPool(config);

// (async () => {
//   try {
//     // Establish a connection from the pool
//     const connection = await pool.getConnection();
//     console.log(`Connected to the ${isLocal ? "localhost" : "cloud"} database successfully!`);
//     connection.release(); // Release the connection back to the pool
//   } catch (error) {
//     console.error("Error connecting to the database:", error.message);
//   }
// })();

// export default pool;

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const config = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'mc',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

const pool = mysql.createPool(config);

(async () => {
  try {
    const connection = await pool.getConnection();
    console.log(`✅ Connected to the ${config.host} database successfully!`);
    connection.release();
  } catch (error) {
    console.error('❌ Error connecting to the database:', error.message);
  }
})();

export default pool;
