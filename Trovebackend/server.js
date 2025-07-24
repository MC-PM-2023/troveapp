import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './config/database.js'; // Import the pool for database connection
import Authroutes from './routes/Authroutes.js'
import Tableroutes from './routes/Tableroutes.js'
import Searchroutes from './routes/Searchroutes.js';
import Searchexcelroutes from './routes/Searchexcelroutes.js'
dotenv.config(); // Load environment variables from .env file

const app = express();

// Middleware
app.use(cors());
app.use(express.json())

app.use('/auth',Authroutes)
app.use('/gettables',Tableroutes)
app.use('/searchinput',Searchroutes)
app.use('/searchexcel',Searchexcelroutes) 




app.get('/test',(req,res)=>{
    res.send("Hi i am express")
})

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port: ${process.env.PORT}`);
});
