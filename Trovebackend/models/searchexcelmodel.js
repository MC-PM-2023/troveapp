// import pool from '../config/database.js';
// import path from 'path';
// import XLSX from 'xlsx';
// import fs from 'fs';

// const exceluploadsDir = path.resolve('exceluploads'); // Ensure this directory exists

// const searchexcelmodel = {
//     // Process the uploaded Excel file and perform database search
//     async searchWithExcel({ table, file }) {
//         try {
//             // Read the Excel file
//             const filepath = path.join(exceluploadsDir, file.filename);
        
//             const workbook = XLSX.readFile(filepath);
//             const sheetname = workbook.SheetNames[0];
//             const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetname]);

//             // Validate Excel data
//             if (!worksheet || worksheet.length === 0) {
//                 throw new Error("No data found in Excel");
//             }

//             // Extract columns and their values
//             const keys = Object.keys(worksheet[0]);
//             if (keys.length === 0) {
//                 throw new Error("No valid columns found in Excel");
//             }

//             const queryValues = keys.map((key) =>
//                 worksheet.map((row) => (row[key] || '').trim()).filter(value=>value)
//             );

//             // Construct the SQL query dynamically
//             const query = `
//                 SELECT * FROM ?? WHERE 
//                 ${keys.map((key) => `${key} IN (?)`).join(" OR ")}`;
//             const finalQuery = pool.format(query, [table, ...queryValues]);

//             console.log("Generated Query:", finalQuery);

//             // Execute the query
//             const [results] = await pool.query(finalQuery);

//             // Cleanup the uploaded file
//             fs.unlinkSync(filepath);

//             return results;
//         } catch (error) {
//             console.error("Error during Excel search:", error.message);
//             throw error;
//         }
//     },

//     // Generate and save results as an Excel file
//     async generateExcel(results) {
//         try {
//             const resultbook = XLSX.utils.book_new();
//             const resultsheet = XLSX.utils.json_to_sheet(results);
//             XLSX.utils.book_append_sheet(resultbook, resultsheet, 'Results');

//             const resultfilepath = path.join(exceluploadsDir, "Results.xlsx");
//             XLSX.writeFile(resultbook, resultfilepath);

//             return resultfilepath;
//         } catch (error) {
//             console.error("Error generating Excel file:", error.message);
//             throw error;
//         }
//     },
// };

// export default searchexcelmodel;



//allowed db table columns code
// import pool from '../config/database.js';
// import path from 'path';
// import XLSX from 'xlsx';
// import fs from 'fs';

// const exceluploadsDir = path.resolve('exceluploads'); // Ensure this directory exists

// // Allowed tables and their respective allowed columns
// const allowedTables = {
//   mcdb_dr_db: ['Project_Code', 'Therapeutic_Area', 'Project_Type', 'Geographic_Coverage', 'Activity_Type', 'Activity_Title', 'Activity_Country', 'Last_Update_Date'],
//   mcdb_nc_db: ['Project_Code', 'Therapeutic_Area', 'Project_Type', 'Geographic_Coverage', 'Activity_Type', 'Activity_Title', 'Activity_Country', 'Last_Update_Date','Full_Name'],
//   mcdb_kt_db: ['Project_Code', 'Therapeutic_Area', 'Project_Type', 'Geographic_Coverage', 'Keyterm_Type', 'Keyterm', 'Last_Update_Date'],
//   mcdb_ol_db: ['Project_Code', 'Therapeutic_Area', 'Project_Type', 'Geographic_Coverage', 'Country', 'Full_Name_Standardized_1', 'Full_Name_Standardized_2', 'Specialty', 'Last_Update_Date'],
//   mcdb_org_db: ['Project_Code', 'Therapeutic_Area', 'Project_Type', 'Geographic_Coverage', 'Activity_Title', 'Activity_Type', 'Activity_Country'],
//   mcdb_st_db: ['Project_Code', 'String_Type', 'Therapeutic_Area', 'Project_Type', 'Geographic_Coverage', 'Search_String']
// };

// const searchexcelmodel = {
//     // Process the uploaded Excel file and perform database search previous function
//     // async searchWithExcel({ table, file }) {
//     //     try {
//     //         // Check if table is allowed
//     //         if (!allowedTables[table]) {
//     //             throw new Error(`Table '${table}' is not allowed.`);
//     //         }

//     //         // Read the Excel file
//     //         const filepath = path.join(exceluploadsDir, file.filename);
//     //         const workbook = XLSX.readFile(filepath);
//     //         const sheetname = workbook.SheetNames[0];
//     //         const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetname]);

//     //         // Validate Excel data
//     //         if (!worksheet || worksheet.length === 0) {
//     //             throw new Error("No data found in Excel");
//     //         }

//     //         // Extract valid columns based on allowed tables
//     //         const validColumns = allowedTables[table];
//     //         const keys = Object.keys(worksheet[0]).filter(col => validColumns.includes(col));

//     //         if (keys.length === 0) {
//     //             throw new Error("No valid columns found in Excel.");
//     //         }

//     //         // Prepare query values
//     //         const queryValues = keys.map((key) =>
//     //             worksheet.map((row) => (row[key] || '').trim()).filter(value => value)
//     //         );

//     //         // Construct the SQL query dynamically
//     //         const query = `
//     //             SELECT ${validColumns.join(", ")} FROM ?? WHERE 
//     //             ${keys.map((key) => `${key} IN (?)`).join(" OR ")}`;
//     //         const finalQuery = pool.format(query, [table, ...queryValues]);

//     //         // console.log("Generated Query:", finalQuery);

//     //         // Execute the query
//     //         const [results] = await pool.query(finalQuery);

//     //         // Cleanup the uploaded file
//     //         fs.unlinkSync(filepath);

//     //         return results;
//     //     } catch (error) {
//     //         console.error("Error during Excel search:", error.message);
//     //         throw error;
//     //     }
//     // },


// //partial output and correct output
// async searchWithExcel({ table, file }) {
//     try {
//         // Check if table is allowed
//         if (!allowedTables[table]) {
//             throw new Error(`Table '${table}' is not allowed.`);
//         }

//         // Read the Excel file
//         const filepath = path.join(exceluploadsDir, file.filename);
//         const workbook = XLSX.readFile(filepath);
//         const sheetname = workbook.SheetNames[0];
//         const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetname]);

//         // Validate Excel data
//         if (!worksheet || worksheet.length === 0) {
//             throw new Error("No data found in Excel");
//         }

//         // Extract valid columns based on allowed tables
//         const validColumns = allowedTables[table];
//         const keys = Object.keys(worksheet[0]).filter(col => validColumns.includes(col));
// console.log("keys is:",validColumns)
//         if (keys.length === 0) {
//             throw new Error("No valid columns found in Excel.");
//         }

//         // Build WHERE conditions using LIKE for partial matches
//         const whereConditions = keys.map(key => {
//             // Collect non-empty values for this key
//             const values = worksheet.map(row => (row[key] || '').trim()).filter(v => v);
//             if (values.length === 0) return null;

//             // Build "key LIKE ? OR key LIKE ? ..." for this key
//             const likeClauses = values.map(() => `${key} LIKE ?`).join(" OR ");
//             return `(${likeClauses})`;
//         }).filter(Boolean);

//         if (whereConditions.length === 0) {
//             throw new Error("No search values provided.");
//         }

//         // Combine all keys with OR - you can change to AND if you want stricter matching
//         const whereClause = whereConditions.join(" OR ");

//         // Prepare values with wildcards for LIKE parameters
//         const queryParams = [];
//         keys.forEach(key => {
//             worksheet.forEach(row => {
//                 const val = (row[key] || '').trim();
//                 if (val) {
//                     queryParams.push(`%${val}%`);
//                 }
//             });
//         });

//         // Construct the final SQL query
//         const query = `
//             SELECT ${validColumns.join(", ")} FROM ?? WHERE ${whereClause}
//         `;
//         const finalQuery = pool.format(query, [table, ...queryParams]);

//         // Debug (optional)
//         console.log("Generated Query:", finalQuery);

//         // Execute the query
//         const [results] = await pool.query(finalQuery);
       

//         // Cleanup uploaded file
//         fs.unlinkSync(filepath);

//         return results;
//     } catch (error) {
//         console.error("Error during Excel search:", error.message);
//         throw error;
//     }
// },


//     // Generate and save results as an Excel file
//     async generateExcel(results) {
//         try {
//             const resultbook = XLSX.utils.book_new();
//             const resultsheet = XLSX.utils.json_to_sheet(results);
//             XLSX.utils.book_append_sheet(resultbook, resultsheet, 'Results');

//             const resultfilepath = path.join(exceluploadsDir, "Results.xlsx");
//             XLSX.writeFile(resultbook, resultfilepath);

//             return resultfilepath;
//         } catch (error) {
//             console.error("Error generating Excel file:", error.message);
//             throw error;
//         }
//     },
// };

// export default searchexcelmodel;


//it displayed all db columns
import pool from '../config/database.js';
import path from 'path';
import XLSX from 'xlsx';
import fs from 'fs';

const exceluploadsDir = path.resolve('exceluploads'); // Ensure this directory exists

const searchexcelmodel = {
  async searchWithExcel({ table, file }) {
    try {
      // Basic table name validation (prevent SQL injection)
      if (!/^[a-zA-Z0-9_]+$/.test(table)) {
        throw new Error("Invalid table name.");
      }

      // Read Excel file
      const filepath = path.join(exceluploadsDir, file.filename);
      const workbook = XLSX.readFile(filepath);
      const sheetname = workbook.SheetNames[0];
      const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetname]);

      if (!worksheet || worksheet.length === 0) {
        throw new Error("No data found in Excel");
      }

      // Dynamically use all non-empty keys from Excel
      const keys = Object.keys(worksheet[0]).filter(key => key && typeof key === 'string');
      if (keys.length === 0) {
        throw new Error("No valid columns found in Excel.");
      }

      const whereConditions = keys.map(key => {
        const values = worksheet.map(row => (row[key] || '').trim()).filter(v => v);
        if (values.length === 0) return null;
        const likeClauses = values.map(() => `${key} LIKE ?`).join(" OR ");
        return `(${likeClauses})`;
      }).filter(Boolean);

      if (whereConditions.length === 0) {
        throw new Error("No search values provided.");
      }

      const whereClause = whereConditions.join(" OR ");
      const queryParams = [];
      keys.forEach(key => {
        worksheet.forEach(row => {
          const val = (row[key] || '').trim();
          if (val) {
            queryParams.push(`%${val}%`);
          }
        });
      });

      // Build query (columns will be * to return all columns)
      const query = `SELECT * FROM ?? WHERE ${whereClause}`;
      const finalQuery = pool.format(query, [table, ...queryParams]);

    //   console.log("Generated Query:", finalQuery);

      const [results] = await pool.query(finalQuery);

      fs.unlinkSync(filepath);
      return results;
    } catch (error) {
    //   console.error("Error during Excel search:", error.message);
      throw error;
    }
  },

  async generateExcel(results) {
    try {
      const resultbook = XLSX.utils.book_new();
      const resultsheet = XLSX.utils.json_to_sheet(results);
      XLSX.utils.book_append_sheet(resultbook, resultsheet, 'Results');

      const resultfilepath = path.join(exceluploadsDir, "Results.xlsx");
      XLSX.writeFile(resultbook, resultfilepath);

      return resultfilepath;
    } catch (error) {
    //   console.error("Error generating Excel file:", error.message);
      throw error;
    }
  },
};

export default searchexcelmodel;
