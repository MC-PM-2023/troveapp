import Tablemodel from "../models/Tablemodel.js";

const tablecontroller = {
  // This method will be responsible for fetching the tables and sending the response
  async getTablesFromNav(req, res) {
    try {
      // Get the tables from the model
      const tables = await Tablemodel.getTables();
      
      // Log the filtered tables (optional, for debugging purposes)
      // console.log("Filtered tables:", tables);
      
      // Return the tables as a JSON response
      res.json({ tables });
    } catch (error) {
      // Catch and log any error that occurs
      console.error("Error in getTablesFromNav:", error.message);
      
      // Send a 500 error response if something goes wrong
      res.status(500).json({ error: "Database error" });
    }
  },


  async getColumnsFromTable(req, res) {
    const { table} = req.body; // Assume the table name is sent in the request body
    try {
      // Get the columns from the model
      const tablecolumns = await Tablemodel.getColumns(table);
      
      // Log the columns (optional, for debugging purposes)
      // console.log(`Columns for table ${tableName}:`, columns);
      
      // Return the columns as a JSON response
      res.json({ tablecolumns });
    } catch (error) {
      // Catch and log any error that occurs
      console.error(`Error in getColumnsFromTable for ${table}:`, error.message);
      
      // Send a 500 error response if something goes wrong
      res.status(500).json({ error: "Error fetching columns from table" });
    }
  },

};

export default tablecontroller;
