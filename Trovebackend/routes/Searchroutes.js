import express from 'express';
import searchinputcontroller from '../controllers/searchinputcontroller.js';

const router=express.Router()

router.post('/searchfields',searchinputcontroller)


export default router;