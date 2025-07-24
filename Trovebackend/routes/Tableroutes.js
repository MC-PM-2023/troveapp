import express from 'express';
import tablecontroller from '../controllers/tablecontroller.js';

const router=express.Router();

router.get("/gettablesbutton",tablecontroller.getTablesFromNav)
router.post('/getcolumns',tablecontroller.getColumnsFromTable)

export default router;