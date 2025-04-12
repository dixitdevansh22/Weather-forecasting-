import express from 'express';
import path from 'path';
import cors from 'cors';
import 'dotenv/config';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import {insertData, getAllData} from './database.js';
// import App from '../src/App.jsx';

console.log(process.env.DATABASE_URI);
const app = express();


const __dirname = dirname(dirname(fileURLToPath(import.meta.url)));
// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.json());
app.use(cors());


//GETting response
app.get('/', (req, res) => {
  console.log('called');
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

//POSTing weather data
app.post('/', (req, res) => {
  console.log('called');
  console.log(req.body);
  insertData(req.body);   //updating database
});


//app listening to port 5173
app.listen(3000, () => console.log(`Listening to port 3000 -> http://localhost:3000`));
