const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const tourRoutes = require('./routes/tourRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');
const settingRoutes = require('./routes/settingRoutes');
const blogRoutes = require('./routes/blogRoutes');
const trustLogoRoutes = require('./routes/trustLogoRoutes');
const whyTravelRoutes = require('./routes/whyTravelRoutes');
const premiumServiceRoutes = require('./routes/premiumServiceRoutes');
const contactRoutes = require('./routes/contactRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

// 1. Security Middlewares
app.use(helmet({
  crossOriginResourcePolicy: false // Allows loading local uploaded images in the client easily
}));

// 2. CORS configuration (allowing local CRA client port 3000 and 3001)
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:3001', 'http://127.0.0.1:3001'],
  credentials: true
}));

// 3. Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 4. Rate Limiter (Brute force & DDoS prevention)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // Limit each IP to 200 requests per window
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again after 15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false
});
app.use('/api/', limiter);

// 5. Serve static files from Uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 6. API Route Registrations
app.use('/api/auth', authRoutes);
app.use('/api/tours', tourRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/trust-logos', trustLogoRoutes);
app.use('/api/why-travel', whyTravelRoutes);
app.use('/api/premium-services', premiumServiceRoutes);
app.use('/api/contact', contactRoutes);

// Base route check
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Benets Tours Premium Luxury Travel API is running.'
  });
});

// 7. Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

module.exports = app;
