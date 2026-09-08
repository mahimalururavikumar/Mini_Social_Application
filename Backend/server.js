import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests

// Sample Test Route
app.get('/', (req, res) => {
  res.send('API is running smoothly...');
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
