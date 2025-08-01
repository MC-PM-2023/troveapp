// import pool from "../config/database.js";

// export const insertUserLog = async ({
//   user_id,
//   username,
//   action_type,
//   keyword_name,
//   downloaded_table_name,
//   message
// }) => {
//   try {
//     const sql = `
//       INSERT INTO useractivitylogs (
//         user_id, username, action_type,
//         keyword_name, downloaded_table_name, message
//       ) VALUES (?, ?, ?, ?, ?, ?)
//     `;

//     const values = [
//       user_id,
//       username,
//       action_type,
//       keyword_name || null,
//       downloaded_table_name || null,
//       message || null
//     ];

//     const [result] = await pool.query(sql, values);
//     return result;
//   } catch (err) {
//     console.error("DB ERROR:", err);  // log actual error to console
//     throw err;
//   }
// };

import pool from '../config/database.js';

export const insertUserLog = async ({
  user_id,
  username,
  action_type,
  keyword_name,
  downloaded_table_name,
  message,
}) => {
  const sql = `
    INSERT INTO mc.useractivitylogs (
      user_id, username, action_type,
      keyword_name, downloaded_table_name, message
    ) VALUES (?, ?, ?, ?, ?, ?)
  `;

  const values = [
    user_id,
    username,
    action_type,
    keyword_name || null,
    downloaded_table_name || null,
    message,
  ];

  await pool.query(sql, values);
};
