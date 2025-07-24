import searchexcelmodel from '../models/searchexcelmodel.js'; // Import the searchexcel model


const searchexcelcontroller = async (req, res) => {
    try {
        // Ensure the file is uploaded
        if (!req.file) {
            return res.status(400).json({ error: 'Excel file is required' });
        }

        // Extract table name and file information from the request body
        const { table } = req.body;
        const { file } = req;

        // Call the searchexcelmodel's searchWithExcel function to process the file and search the database
        const results = await searchexcelmodel.searchWithExcel({ table, file });

        // If no records are found
        if (results.length === 0) {
            return res.status(404).json({ message: 'No matching records found' });
        }

        // Generate an Excel file with the search results
        const resultFilePath = await searchexcelmodel.generateExcel(results);

        // Send the result Excel file back as a response
        res.status(200).json({
            message: 'Search completed successfully',
            downloadUrl: resultFilePath,
            results:results
        });
    } catch (error) {
        // console.error('Error in searchWithExcel controller:', error.message);
        res.status(500).json({ message:error.message});
    }
};

export default  searchexcelcontroller ;
