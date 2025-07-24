// import searchDefinition from '../models/searchinputmodel.js'; // Import the model

// const searchrecords = async (req, res) => {
//   const { tablename, fields } = req.body;

//   try {
//     // Validate input
//     if (!tablename || !fields || fields.length === 0) {
//       return res.status(400).json({ error: 'Table name and fields are required' });
//     }

//     // Call the model method to fetch records
//     const records = await searchDefinition.getrecords(fields, tablename);

//     if (records.length === 0) {
//       return res.status(404).json({ message: 'No records found matching the search criteria' });
    
//     }

//     // Send back the found records
//     return res.status(200).json({ keywordsearch: records });

//   } catch (error) {
//     console.error('Error in search controller:', error);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// };

// export default searchrecords;


import searchDefinition from '../models/searchinputmodel.js'; // Import model

const searchrecords = async (req, res) => {
  const { tablename, fields } = req.body;

  try {
    // Validate input
    if (!tablename || !fields || fields.length === 0) {
      return res.status(400).json({ error: 'Table name and fields are required' });
    }

    // Fetch records using the updated case-insensitive search
    const records = await searchDefinition.getrecords(fields, tablename);

    if (records.length === 0) {
      return res.status(404).json({ message: 'No records found matching the search criteria' });
    }

    // Send back the found records
    return res.status(200).json({ keywordsearch: records });

  } catch (error) {
    // console.error('Error in search controller:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export default searchrecords;
