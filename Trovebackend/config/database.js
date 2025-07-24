// import dotenv from 'dotenv';
// import mysql from 'mysql2/promise';

// dotenv.config();

// const isLocal = process.env.NODE_ENV === "development";

// const config = isLocal
//   ? {
//       host: process.env.DB_HOST,
//       user: process.env.DB_USER,
//       database: process.env.DB_NAME,
//       password: process.env.DB_PASSWORD,
//     }
//   : {
//       host: process.env.CLOUDHOST,
//       user: process.env.CLOUDUSER,
//       database: process.env.CLOUDDBNAME,
//       password: process.env.CLOUDDBPASSWORD,
//       ssl: {
//         rejectUnauthorized: false, // Important for cloud SSL connections
//       },
//     };

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


import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

const isLocal = process.env.NODE_ENV === "development";

// const config = isLocal
//   ? {
//       host: process.env.DB_HOST,
//       user: process.env.DB_USER,
//       database: process.env.DB_NAME,
//       password: process.env.DB_PASSWORD,
//     }
//   : {
//       host: process.env.CLOUDHOST,
//       user: process.env.CLOUDUSER,
//       database: process.env.CLOUDDBNAME,
//       password: process.env.CLOUDDBPASSWORD,
//       ssl: {
//         rejectUnauthorized: false, // Important for cloud SSL connections
//       },
//     };


const config={
  //  host:'10.64.176.3',
  host:"34.93.75.171",
  user:"datasolve",
  database:"mc",
  password:"datasolve@2025",
  port:"3306"
}

// Create a connection pool
const pool = mysql.createPool(config);

(async () => {
  try {
    // Establish a connection from the pool
    const connection = await pool.getConnection();
    console.log(`Connected to the ${isLocal ? "localhost" : "cloud"} database successfully!`);
    connection.release(); // Release the connection back to the pool
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
  }
})();

export default pool;