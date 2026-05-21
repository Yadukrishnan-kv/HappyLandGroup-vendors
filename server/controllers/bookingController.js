const dbHelper = require('../utils/dbHelper');

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res, next) => {
  try {
    const { tourId, guests, bookingDate } = req.body;

    if (!tourId || !guests || !bookingDate) {
      res.status(400);
      throw new Error('Please provide tourId, guests count, and bookingDate');
    }

    const tour = await dbHelper.findTourById(tourId);
    if (!tour) {
      res.status(404);
      throw new Error('Selected tour package not found');
    }

    const totalPrice = tour.price * Number(guests);

    const booking = await dbHelper.createBooking({
      user: req.user._id,
      tour: tourId,
      guests: Number(guests),
      totalPrice,
      bookingDate: new Date(bookingDate).toISOString(),
      status: 'confirmed'
    });

    res.status(201).json({
      success: true,
      message: 'Luxury tour package successfully booked!',
      data: booking
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user bookings
// @route   GET /api/bookings/my-bookings
// @access  Private
const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await dbHelper.findBookings({ user: req.user._id });

    res.json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all bookings (Admin only)
// @route   GET /api/bookings
// @access  Private/Admin
const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await dbHelper.findBookings({});

    res.json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single booking details
// @route   GET /api/bookings/:id
// @access  Private
const getBookingById = async (req, res, next) => {
  try {
    const booking = await dbHelper.findBookingById(req.params.id);

    if (!booking) {
      res.status(404);
      throw new Error('Booking record not found');
    }

    // Allow only the booking owner or an admin to access
    if (booking.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      res.status(403);
      throw new Error('Not authorized to access this booking record');
    }

    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Cancel a booking
// @route   PUT /api/bookings/:id/cancel
// @access  Private
const cancelBooking = async (req, res, next) => {
  try {
    const booking = await dbHelper.findBookingById(req.params.id);

    if (!booking) {
      res.status(404);
      throw new Error('Booking record not found');
    }

    // Check ownership
    if (booking.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      res.status(403);
      throw new Error('Not authorized to modify this booking record');
    }

    const updatedBooking = await dbHelper.updateBookingStatus(req.params.id, 'cancelled');

    res.json({
      success: true,
      message: 'Booking cancelled successfully',
      data: updatedBooking
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a booking status (Admin only)
// @route   PUT /api/bookings/:id/status
// @access  Private/Admin
const updateBookingStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!status || !['confirmed', 'completed', 'cancelled'].includes(status)) {
      res.status(400);
      throw new Error('Please provide a valid booking status (confirmed, completed, or cancelled)');
    }

    const booking = await dbHelper.findBookingById(req.params.id);
    if (!booking) {
      res.status(404);
      throw new Error('Booking record not found');
    }

    const updatedBooking = await dbHelper.updateBookingStatus(req.params.id, status);

    res.json({
      success: true,
      message: `Booking status updated to ${status} successfully`,
      data: updatedBooking
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  getAllBookings,
  getBookingById,
  cancelBooking,
  updateBookingStatus
};
