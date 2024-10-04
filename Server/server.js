const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const truckLoadingRoutes = require('./routes/truckLoadingRoutes');
const authRoutes = require('./routes/authRoutes')
dotenv.config();
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Database connection
mongoose.connect('mongodb://localhost:27017/truckSystem', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/loadings', truckLoadingRoutes);
app.use('/',authRoutes)
// Start Server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
