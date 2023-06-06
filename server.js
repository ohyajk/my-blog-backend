import express from 'express';
import userRoute from './routes/userRoute.js';
import postRoute from './routes/postRoute.js'
import authRoute from './routes/authRoute.js'
import commentRoute from './routes/commentRoute.js'
import mongoose from 'mongoose';
import cors from 'cors'
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const apiBase = process.env.BASE_URL

// env
const DB_URL = process.env.DB_URL

// Connect MongoDB 
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.log('Error connecting to MongoDB:', error);
});

// MiddleWares Here...
app.use(cors());
app.use(express.json());

// Routes
app.use(apiBase, userRoute)
app.use(apiBase, postRoute)
app.use(apiBase, authRoute)
app.use(apiBase, commentRoute)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Running on PORT http://localhost:${PORT}`);
})