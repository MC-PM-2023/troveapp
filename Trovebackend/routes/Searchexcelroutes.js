import express from 'express';
import { fileURLToPath } from 'url';
import searchexcelcontroller from '../controllers/searchexcelcontroller.js';
import multer from 'multer';
import fs from 'fs'
import path from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const exceluploadsDir=path.join(__dirname,'../','exceluploads')


if (!fs.existsSync(exceluploadsDir)) {
    fs.mkdirSync(exceluploadsDir, { recursive: true });
}


const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
cb(null,exceluploadsDir)
    },
    filename:(req,file,cb)=>{
cb(null,Date.now()+path.extname(file.originalname))
    }
})

const exceluploads=multer({storage:storage})


const router =express.Router();



router.post('/searchwithexcel', exceluploads.single('file'), searchexcelcontroller);

export default router;