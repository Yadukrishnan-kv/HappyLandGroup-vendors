const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/benetstours');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`=================================================`);
    console.warn(`WARNING: LOCAL MONGODB INSTANCE IS OFFLINE`);
    console.warn(`Error: ${error.message}`);
    console.warn(`Transparently running in LOCAL JSON DATABASE mode.`);
    console.warn(`=================================================`);
    // Resolve the promise instead of calling process.exit(1) to allow fallback mode to run
    return;
  }
};

module.exports = connectDB;
