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
import {DateTime} from 'luxon'

// export const insertUserLog = async ({
//   user_id,
//   username,
//   action_type,
//   keyword_name,
//   downloaded_table_name,
//   message,
//   row_count
// }) => {

//   const istTime = DateTime.now();
//   console.log(istTime)
//   const sql = `
//     INSERT INTO mc.useractivitylogs (
//       user_id, username, action_type,
//       keyword_name, downloaded_table_name, message,row_count,created_at
//     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
//   `;

  
//   const values = [
//     user_id,
//     username,
//     action_type,
//     keyword_name || null,
//     downloaded_table_name || null,
//     message,
//     row_count ||null,
//     istTime
//   ];

//   await pool.query(sql, values);
// };



export const insertUserLog = async ({
  user_id,
  username,
  action_type,
  keyword_name,
  downloaded_table_name,
  message,
  row_count
}) => {
  const sql = `
    INSERT INTO mc.useractivitylogs (
      user_id, username, action_type,
      keyword_name, downloaded_table_name, message, row_count
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    user_id,
    username,
    action_type,
    keyword_name || null,
    downloaded_table_name || null,
    message,
    row_count || null
  ];

  await pool.query(sql, values);
};




export const showLog=async()=>{
  const conn=await pool.getConnection();
  try{
const sql=`select * from mc.useractivitylogs`;
const [rows]=await conn.execute(sql)
return rows;
  }
  finally{
    conn.release();
  }
}


