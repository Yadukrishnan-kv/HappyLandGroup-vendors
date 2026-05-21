const app = require('./app');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const dbHelper = require('./utils/dbHelper');

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB().then(async () => {
  // Seed premium services if empty
  await dbHelper.seedPremiumServicesIfEmpty();
  
  app.listen(PORT, () => {
    console.log(`=================================================`);
    console.log(`HAPPY LAND GROUP VENTURES SERVER RUNNING IN ${process.env.NODE_ENV || 'development'} MODE`);
    console.log(`Port: http://localhost:${PORT}`);
    console.log(`=================================================`);
  });
}).catch(err => {
  console.error('Failed to connect to database', err);
});
