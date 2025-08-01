// routes/LogRoutes.js
import express from 'express';
import { logUserAction } from '../controllers/logcontroller.js';

const logrouter = express.Router();

logrouter.post('/useractivity', logUserAction);

export default logrouter;
