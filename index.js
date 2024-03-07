const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const app = express();

// Constants
import { LOGIN_ENDPOINT, DATA_ENDPOINT, LOGOUT_ENDPOINT } from './config/apiConfig';

// Routes
const apiRoutes = require('./routes/routes');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve static files

app.use('/api', apiRoutes);

const port = 3000;
app.listen(port, () => {
    console.log(`Proxy server listening on port ${port}`);
});
