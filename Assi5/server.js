const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const expressLayouts = require('express-ejs-layouts');

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(expressLayouts);
app.set('layout', 'layout');
app.set('view engine', 'ejs');
app.use(express.static('public'));
// Middleware to parse form data (MANDATORY)
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
// Routes
const pageRoutes = require('./routes/pages');
app.use('/', pageRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`));