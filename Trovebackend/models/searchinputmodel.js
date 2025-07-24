// import pool from '../config/database.js'; // Assuming the database connection is set up

// const searchDefinition = {
//     async getrecords(fields, tablename) {
//         try {
//           let whereConditions = [];
      
//           // Loop through the fields to build WHERE conditions
//           fields.forEach(field => {
//             if (field.key && field.value) {
//               // Escape single quotes in string values
//               let escapedValue = field.value.replace(/'/g, "''");

//               // Ensure values are wrapped in quotes for string matching
//               whereConditions.push(`${field.key} = '${escapedValue}'`);
//             }
//           });
      
//           // Join the conditions with OR (to match either of the values)
//           const whereClause = whereConditions.length ? `WHERE ${whereConditions.join(' OR ')}` : '';
      
//           // Use the table name and the dynamically generated WHERE clause
//           const sql = `SELECT * FROM ${tablename} ${whereClause}`;
      
//           console.log("Generated SQL Query: ", sql);  // Log the query for debugging
      
//           const [results] = await pool.execute(sql); // Execute the query
//           console.log("Fetched records:", results);  // Log the results
//           return results; // Return the fetched results
//         } catch (error) {
//           console.error("Error in searchmodel:", error);
//           throw new Error('Internal server error', error.message);
//         }
//       }
// };

// export default searchDefinition;


import pool from '../config/database.js'; // Assuming database connection is set up

const searchDefinition = {
  async getrecords(fields, tablename) {
    try {
      let whereConditions = [];

      // Loop through fields to build WHERE conditions
      fields.forEach(field => {
        if (field.key && field.value) {
          // Convert search term and column data to lowercase for case-insensitive search
          let escapedValue = field.value.replace(/'/g, "''"); // Escape single quotes to prevent SQL errors
          whereConditions.push(`LOWER(${field.key}) LIKE LOWER('%${escapedValue}%')`);
        }
      });

      // Construct the WHERE clause
      const whereClause = whereConditions.length ? `WHERE ${whereConditions.join(' OR ')}` : '';

      // Generate the final SQL query
      const sql = `SELECT * FROM ${tablename} ${whereClause}`;
      
      // console.log("Generated SQL Query: ", sql);  // Debugging

      const [results] = await pool.execute(sql); // Execute the query
      // console.log("Fetched records:", results);  // Log fetched data
      return results; // Return search results
    } catch (error) {
      // console.error("Error in search model:", error);
      throw new Error('Internal server error');
    }
  }
};

export default searchDefinition;


// import pool from '../config/database.js'; // Assuming database connection is set up

// // Define allowed tables and their corresponding columns
// const allowedTables = {
//   mcdb_dr_db: ['Project_Code', 'Therapeutic_Area', 'Project_Type', 'Geographic_Coverage', 'Activity_Type', 'Activity_Title', 'Activity_Country', 'Last_Update_Date'],
//   mcdb_nc_db: ['Project_Code', 'Therapeutic_Area', 'Project_Type', 'Geographic_Coverage', 'Activity_Type', 'Activity_Title', 'Activity_Country', 'Last_Update_Date'],
//   mcdb_kt_db: ['Project_Code', 'Therapeutic_Area', 'Project_Type', 'Geographic_Coverage', 'Keyterm_Type', 'Keyterm', 'Last_Update_Date'],
//   mcdb_ol_db: ['Project_Code', 'Therapeutic_Area', 'Project_Type', 'Geographic_Coverage', 'Country', 'Full_Name_Standardized_1', 'Full_Name_Standardized_2', 'Specialty', 'Last_Update_Date'],
//   mcdb_org_db: ['Project_Code', 'Therapeutic_Area', 'Project_Type', 'Geographic_Coverage', 'Activity_Title', 'Activity_Type', 'Activity_Country'],
//   mcdb_st_db: ['Project_Code', 'String_Type', 'Therapeutic_Area', 'Project_Type', 'Geographic_Coverage', 'Search_String']
// };

// const searchDefinition = {
//   async getrecords(fields, tablename) {
//     try {
//       // Check if the provided table name is allowed
//       if (!allowedTables[tablename]) {
//         throw new Error('Access denied: Invalid table name');
//       }

//       const allowedColumns = allowedTables[tablename];

//       let whereConditions = [];

//       // Loop through fields to build WHERE conditions
//       fields.forEach(field => {
//         if (allowedColumns.includes(field.key) && field.value) {
//           let escapedValue = field.value.replace(/'/g, "''"); // Escape single quotes
//           whereConditions.push(`LOWER(${field.key}) LIKE LOWER('%${escapedValue}%')`);
//         }
//       });

//       const whereClause = whereConditions.length ? `WHERE ${whereConditions.join(' OR ')}` : '';

//       // Construct SQL query with only allowed columns
//       const sql = `SELECT ${allowedColumns.join(', ')} FROM ${tablename} ${whereClause}`;

//       // console.log("Generated SQL Query: ", sql); // Debugging

//       const [results] = await pool.execute(sql);
//       // console.log("Fetched records:", results);
//       return results;
//     } catch (error) {
//       console.error("Error in search model:", error);
//       throw new Error('Internal server error');
//     }
//   }
// };

// export default searchDefinition;
