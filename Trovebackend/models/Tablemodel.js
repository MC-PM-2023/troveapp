// models/TableModel.js
import pool from "../config/database.js";

const Tablemodel = {
  getTables: async () => {
    const allowedTables = ['mcdb_dr_db', 'mcdb_kt_db', 'mcdb_nc_db', 'mcdb_ol_db', 'mcdb_org_db','mcdb_st_db'];
    const query = "SHOW TABLES FROM mc";

    try {
      const [results] = await pool.execute(query);
      // console.log(results);
      
      // Extract table names from the result and filter by allowed tables
      const tables = results
        .map((row) => Object.values(row)[0])  // Extract table name
        .filter((table) => allowedTables.includes(table));  // Filter allowed tables
      return tables;
    } catch (error) {
      console.error("Error fetching tables in TableModel:", error);
      throw new Error("Database error");
    }
  },


  getColumns: async (table) => {
    const query = `SHOW COLUMNS FROM ${table}`;
    
    try {
      const [columns] = await pool.execute(query);
      // console.log("columns:",columns)
      // Extract column names from the result
      const columnNames = columns.map((column) => column.Field);
      return columnNames;
    } catch (error) {
      console.error(`Error fetching columns for table ${table} in TableModel:`, error);
      throw new Error(`Error fetching columns for table ${table}`);
    }
  }
};

export default Tablemodel;
