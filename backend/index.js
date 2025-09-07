require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const authregister = require('./routes/auth');
const resumeData = require('./routes/Data');
const authMiddleware = require('./middleware/authmiddleware');

const app = express();
connectDB();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authregister);
app.use('/api/data', authMiddleware, resumeData);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
