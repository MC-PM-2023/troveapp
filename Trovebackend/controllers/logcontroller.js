import pool from '../config/database.js';
import { insertUserLog } from '../models/logmodel.js';

export const logUserAction = async (req, res) => {
  const { username, action, searchText, tableName } = req.body;

  if (!username || !action) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }

  try {
    // Get user_id using username (FK constraint requires valid ID)
    const [rows] = await pool.query(
      'SELECT userid FROM mc.troveusers WHERE username = ?',
      [username]
    );

    if (rows.length === 0) {
      return res.status(400).json({ error: 'User not found' });
    }

    const user_id = rows[0].userid;

    // Compose log entry
    const logEntry = {
      user_id,
      username,
      action_type: action,
      keyword_name: action === 'input' || action === 'search' ? searchText : null,
      downloaded_table_name: action === 'download' ? tableName : null,
      message: ''
    };

    
    switch (action) {
      case 'input':
        logEntry.message = `User typed input: ${searchText}`;
        break;
      case 'search':
        logEntry.message = `User searched for: ${searchText} from  ${tableName}`;
        break;
      case 'download':
        logEntry.message = `User downloaded data from: ${tableName}`;
        break;
      case 'process':
        logEntry.message = `User processed data from ${tableName}`;
        break;
      case 'error':
        logEntry.message = 'An error occurred';
        break;
      default:
        logEntry.message = 'Unknown action';
    }

    await insertUserLog(logEntry);
    res.status(200).json({ success: true, message: 'User activity logged successfully' });

  } catch (error) {
    console.error('Logging error:', error.stack);
    res.status(500).json({ success: false, error: 'Failed to log user activity' });
  }
};
