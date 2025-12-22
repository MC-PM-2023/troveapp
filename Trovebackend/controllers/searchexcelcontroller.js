// import searchexcelmodel from '../models/searchexcelmodel.js'; // Import the searchexcel model


// const searchexcelcontroller = async (req, res) => {
//     try {
//         // Ensure the file is uploaded
//         if (!req.file) {
//             return res.status(400).json({ error: 'Excel file is required' });
//         }

//         // Extract table name and file information from the request body
//         const { table } = req.body;
//         const { file } = req;

//         // Call the searchexcelmodel's searchWithExcel function to process the file and search the database
//         const results = await searchexcelmodel.searchWithExcel({ table, file });

//         // If no records are found
//         if (results.length === 0) {
//             return res.status(404).json({ message: 'No matching records found' });
//         }

//         // Generate an Excel file with the search results
//         const resultFilePath = await searchexcelmodel.generateExcel(results);

//         // Send the result Excel file back as a response
//         res.status(200).json({
//             message: 'Search completed successfully',
//             downloadUrl: resultFilePath,
//             results:results
//         });
//     } catch (error) {
//         // console.error('Error in searchWithExcel controller:', error.message);
//         res.status(500).json({ message:error.message});
//     }
// };

// export default  searchexcelcontroller ;


import searchexcelmodel from "../models/searchexcelmodel.js";

// Preview
// export const previewController = async (req, res) => {
//   try {
//     const { table } = req.body;
//     if (!table) return res.status(400).json({ success: false, message: "Table name is required" });
//     if (!req.file) return res.status(400).json({ success: false, message: "Excel file is required" });

//     const matchType = req.query.matchType === 'exact' ? 'exact' : 'partial';

//     const result = await searchexcelmodel.preview({
//       table,
//       file: req.file,
//       matchType
//     });

//     res.json({ success: true, ...result });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };
// export const previewController = async (req, res) => {
//   try {
//     const { table } = req.body;
//     if (!table) return res.status(400).json({ success: false, message: "Table name is required" });
//     if (!req.file) return res.status(400).json({ success: false, message: "Excel file is required" });

//     const matchType = req.query.matchType === 'exact' ? 'exact' : 'partial';

//     const result = await searchexcelmodel.preview({
//       table,
//       file: req.file,
//       matchType
//     });

//     // Include counts in response
//     res.json({ success: true, ...result });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

export const previewController = async (req, res) => {
  try {
    const { table } = req.body;
    if (!table) return res.status(400).json({ success: false, message: "Table name is required" });
    if (!req.file) return res.status(400).json({ success: false, message: "Excel file is required" });
    const result = await searchexcelmodel.preview({ table, file: req.file });
    return res.json({ success: true, ...result });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};


// Fetch full data


export const fetchFullController = async (req, res) => {
  try {
    const { table, activities } = req.body;

    if (!table || !Array.isArray(activities) || activities.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Table and activities are required"
      });
    }

    const result = await searchexcelmodel.fetchFull({
      table,
      activities
    });

    res.json({
      success: true,
      data: result.data,
      counts: result.count
    });

  } catch (err) {
    // console.error("fetchFullController error:", err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};
