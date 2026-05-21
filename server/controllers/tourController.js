const dbHelper = require('../utils/dbHelper');

// @desc    Get all tours with search, filtering, and pagination
// @route   GET /api/tours
// @access  Public
const getTours = async (req, res, next) => {
  try {
    const { 
      search, 
      featured, 
      minPrice, 
      maxPrice, 
      maxPeople, 
      distance, 
      sort,
      tourType,
      page = 1, 
      limit = 8 
    } = req.query;

    const filters = {};

    if (search) filters.search = search;
    if (featured !== undefined) filters.featured = featured === 'true';
    if (minPrice) filters.minPrice = minPrice;
    if (maxPrice) filters.maxPrice = maxPrice;
    if (maxPeople) filters.maxPeople = maxPeople;
    if (distance) filters.distance = distance;
    if (tourType) filters.tourType = tourType;

    let tours = await dbHelper.findTours(filters);

    // Sorting implementation
    if (sort) {
      if (sort === 'priceAsc') {
        tours.sort((a, b) => a.price - b.price);
      } else if (sort === 'priceDesc') {
        tours.sort((a, b) => b.price - a.price);
      } else if (sort === 'rating') {
        tours.sort((a, b) => b.rating - a.rating);
      }
    } else {
      // Default: featured first, then rating
      tours.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return b.rating - a.rating;
      });
    }

    // Pagination slice
    const total = tours.length;
    const skip = (Number(page) - 1) * Number(limit);
    const paginatedTours = tours.slice(skip, skip + Number(limit));

    res.json({
      success: true,
      count: paginatedTours.length,
      total,
      pages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
      data: paginatedTours
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get a single tour by ID
// @route   GET /api/tours/:id
// @access  Public
const getTourById = async (req, res, next) => {
  try {
    const tour = await dbHelper.findTourById(req.params.id);

    if (!tour) {
      res.status(404);
      throw new Error('Tour package not found');
    }

    res.json({
      success: true,
      data: tour
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new tour
// @route   POST /api/tours
// @access  Private/Admin
const createTour = async (req, res, next) => {
  try {
    const { title, country, city, description, price, maxPeople, distance, featured, images, startDates, tourType, duration, includes } = req.body;

    if (!title || !country || !city || !description || !price) {
      res.status(400);
      throw new Error('Please fill in all core fields: title, country, city, description, price');
    }

    const allTours = await dbHelper.findTours({});
    const tourExists = allTours.find(t => t.title.toLowerCase() === title.toLowerCase());
    if (tourExists) {
      res.status(400);
      throw new Error('A tour package with this title already exists');
    }

    const tour = await dbHelper.createTour({
      title,
      country,
      city,
      description,
      price: Number(price),
      maxPeople: Number(maxPeople) || 10,
      distance: Number(distance) || 500,
      tourType: tourType || 'UAE Tours',
      duration: duration || '1 Day',
      includes: includes || [],
      featured: featured || false,
      images: images || ['/uploads/default-tour.png'],
      startDates: startDates || []
    });

    res.status(201).json({
      success: true,
      message: 'Tour package created successfully',
      data: tour
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a tour
// @route   PUT /api/tours/:id
// @access  Private/Admin
const updateTour = async (req, res, next) => {
  try {
    const tour = await dbHelper.findTourById(req.params.id);

    if (!tour) {
      res.status(404);
      throw new Error('Tour package not found');
    }

    const updatedTour = await dbHelper.updateTour(req.params.id, req.body);

    res.json({
      success: true,
      message: 'Tour package updated successfully',
      data: updatedTour
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a tour
// @route   DELETE /api/tours/:id
// @access  Private/Admin
const deleteTour = async (req, res, next) => {
  try {
    const tour = await dbHelper.findTourById(req.params.id);

    if (!tour) {
      res.status(404);
      throw new Error('Tour package not found');
    }

    await dbHelper.deleteTour(req.params.id);

    res.json({
      success: true,
      message: 'Tour package successfully deleted'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour
};
