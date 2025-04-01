const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user'); 
const setupSwagger = require('./swagger');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const app = express();

// app.use(cors());
app.use(cors({
    // origin: 'http://localhost:3000', // Allow requests from react frontend
    origin : '*', // Allow requests from all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true // Allow cookies if needed
  }));
  

// Middleware
app.use(express.json());
app.use(morgan('dev')); // Logs requests in a concise format
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));



// Connect to MongoDB cluster
connectDB();

// Setup Swagger
setupSwagger(app); 

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes); 

const PORT = process.env.PORT || 8304;
// Start the server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
