// routes/LogRoutes.js
import express from 'express';
import { logUserAction, showLogResponses } from '../controllers/logcontroller.js';

const logrouter = express.Router();

logrouter.post('/useractivity', logUserAction);
logrouter.get('/showuserlogs',showLogResponses)

export default logrouter;
