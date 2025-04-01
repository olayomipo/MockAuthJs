const mongoose = require('mongoose');

const connectDB = async () => {
  try {    
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error('MongoDB URI not provided in environment variables.');
    }
    // Connect to MongoDB cluster
    await mongoose.connect(uri, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true
    });

    console.log('✅ MongoDB Cluster Connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
