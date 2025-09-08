<<<<<<< HEAD
require("dotenv").config();
=======
require('dotenv').config();
>>>>>>> 8140b6f28f289c65685ff80cc460c89b6372b74b
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

<<<<<<< HEAD


app.use(express.static(path.join(__dirname, "frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from backend!" });
});
app.use('/api/auth',authregister);
app.use('/api/data',authMiddleware,resumeData);
=======
app.use('/api/auth', authregister);
app.use('/api/data', authMiddleware, resumeData);
>>>>>>> 8140b6f28f289c65685ff80cc460c89b6372b74b


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
