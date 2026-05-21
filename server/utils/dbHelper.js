const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

// File path for the JSON database fallback
const dbFilePath = path.join(__dirname, '..', 'uploads', 'local_db.json');

// Ensure uploads folder exists
const ensureUploadsExist = () => {
  const dir = path.dirname(dbFilePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Default seed data to initialize local DB file if MongoDB is down
const getInitialSeedData = () => {
  const adminId = new mongoose.Types.ObjectId().toString();
  const guestId = new mongoose.Types.ObjectId().toString();
  
  const tours = [
    {
      _id: new mongoose.Types.ObjectId().toString(),
      title: 'Bespoke Desert Safari & Dune Dinner',
      country: 'UAE',
      city: 'Dubai',
      description: 'Experience a premium dune bashing drive in a luxury 4x4 land cruiser, sunset falconry capture photography, private camel riding tours, and a five-star traditional Arabian camp buffet dinner with live fire shows under the stars.',
      images: [
        'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80'
      ],
      price: 150,
      rating: 4.9,
      reviewsCount: 2,
      maxPeople: 6,
      distance: 80,
      featured: true,
      startDates: [new Date('2026-06-15').toISOString(), new Date('2026-07-20').toISOString()]
    },
    {
      _id: new mongoose.Types.ObjectId().toString(),
      title: 'Burj Khalifa Skyline & Aquarium Access',
      country: 'UAE',
      city: 'Dubai',
      description: 'Step onto the highest observation deck at Burj Khalifa (At the Top Level 148) with private lounge access, coupled with an intimate walkthrough of the Dubai Aquarium & Underwater Zoo.',
      images: [
        'https://images.unsplash.com/photo-1582672060674-bc2bd808a83a?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80'
      ],
      price: 180,
      rating: 4.8,
      reviewsCount: 1,
      maxPeople: 4,
      distance: 5,
      featured: true,
      startDates: [new Date('2026-06-01').toISOString(), new Date('2026-07-05').toISOString()]
    },
    {
      _id: new mongoose.Types.ObjectId().toString(),
      title: 'Abu Dhabi Royal Palace & Grand Mosque',
      country: 'UAE',
      city: 'Abu Dhabi',
      description: 'Take a private chauffeured luxury transit to the capital. Explore the majestic Sheikh Zayed Grand Mosque, the lavish halls of Qasr Al Watan Presidential Palace, and enjoy high tea at Emirates Palace hotel.',
      images: [
        'https://images.unsplash.com/photo-1542856391-010fb87dcfed?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80'
      ],
      price: 220,
      rating: 4.95,
      reviewsCount: 0,
      maxPeople: 8,
      distance: 140,
      featured: true,
      startDates: [new Date('2026-10-10').toISOString()]
    },
    {
      _id: new mongoose.Types.ObjectId().toString(),
      title: 'Scenic Yacht Cruise & Marina Horizon',
      country: 'UAE',
      city: 'Dubai',
      description: 'Private charter cruise along Dubai Marina, Blue Waters Island, Ain Dubai, Atlantis the Palm, and Burj Al Arab. Complete with a personal captain, custom gourmet seafood grills, and sunset champagne.',
      images: [
        'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
      ],
      price: 650,
      rating: 5.0,
      reviewsCount: 0,
      maxPeople: 12,
      distance: 25,
      featured: true,
      startDates: [new Date('2026-05-18').toISOString()]
    },
    {
      _id: new mongoose.Types.ObjectId().toString(),
      title: 'Aesthetic Helicopter Horizon Ride',
      country: 'UAE',
      city: 'Dubai',
      description: 'Experience a thrilling aerial helicopter tour soaring over the iconic Palm Jumeirah, World Islands, the pristine coastline of Jumeirah beach, and the towering silhouette of Burj Khalifa.',
      images: [
        'https://images.unsplash.com/photo-1508849789987-4e5333c12b78?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80'
      ],
      price: 450,
      rating: 4.85,
      reviewsCount: 0,
      maxPeople: 6,
      distance: 50,
      featured: false,
      startDates: [new Date('2026-06-25').toISOString()]
    },
    {
      _id: new mongoose.Types.ObjectId().toString(),
      title: 'Yas Island Thrills & Ferrari World',
      country: 'UAE',
      city: 'Abu Dhabi',
      description: 'An exhilarating action package featuring fast-track entrance to Ferrari World (home of the world\'s fastest rollercoaster), Yas Waterworld, and Warner Bros. World, including executive transfers.',
      images: [
        'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80'
      ],
      price: 280,
      rating: 4.9,
      reviewsCount: 0,
      maxPeople: 8,
      distance: 120,
      featured: false,
      startDates: [new Date('2026-11-20').toISOString()]
    },
    {
      _id: new mongoose.Types.ObjectId().toString(),
      title: 'Dhow Cruise Marina Gala Dinner',
      country: 'UAE',
      city: 'Dubai',
      description: 'Glide along the glowing waters of Dubai Marina in a glass-walled luxury traditional dhow. Features an international 5-star buffet dinner, tanoura folklore dances, and dynamic views of towering skyscrapers.',
      images: [
        'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=1200&q=80'
      ],
      price: 120,
      rating: 4.75,
      reviewsCount: 0,
      maxPeople: 15,
      distance: 15,
      featured: false,
      startDates: [new Date('2026-09-01').toISOString()]
    },
    {
      _id: new mongoose.Types.ObjectId().toString(),
      title: 'Atlantis Aquaventure & Dolphin Bay',
      country: 'UAE',
      city: 'Dubai',
      description: 'Plunge into the world\'s largest waterpark at Atlantis The Palm. Enjoy fast-pass access to all major high-speed water slides, private beach loungers, and close-up encounters at Dolphin Bay.',
      images: [
        'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
      ],
      price: 250,
      rating: 4.8,
      reviewsCount: 0,
      maxPeople: 10,
      distance: 30,
      featured: false,
      startDates: [new Date('2026-06-20').toISOString()]
    }
  ].map(tour => ({ ...tour, tourType: 'UAE Tours', duration: '1 Day', includes: ['Luxury Transit', 'Professional Guide'] }));

  const bcrypt = require('bcryptjs');
  const salt = bcrypt.genSaltSync(10);
  
  const users = [
    {
      _id: adminId,
      firstName: 'Alen',
      lastName: 'Happy',
      email: 'admin@happygroupventures.com',
      password: bcrypt.hashSync('password123', salt),
      phone: '+971 4 123 4567',
      avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Jack',
      role: 'admin',
      createdAt: new Date().toISOString()
    },
    {
      _id: guestId,
      firstName: 'Sophia',
      lastName: 'Traveler',
      email: 'guest@happygroupventures.com',
      password: bcrypt.hashSync('password123', salt),
      phone: '+971 50 987 6543',
      avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Sophia',
      role: 'user',
      createdAt: new Date().toISOString()
    }
  ];

  const reviews = [
    {
      _id: new mongoose.Types.ObjectId().toString(),
      user: guestId,
      tour: tours[0]._id,
      rating: 5,
      comment: 'Absolutely breathtaking! The premium desert safari with dune bashing was amazing and the sunset photos with falcons were spectacular. Highly professional travel management.',
      createdAt: new Date().toISOString()
    },
    {
      _id: new mongoose.Types.ObjectId().toString(),
      user: adminId,
      tour: tours[0]._id,
      rating: 5,
      comment: 'Superb camp buffer quality and luxury transfers. An absolute must-do for any executive team looking for authentic experiences.',
      createdAt: new Date().toISOString()
    },
    {
      _id: new mongoose.Types.ObjectId().toString(),
      user: guestId,
      tour: tours[1]._id,
      rating: 4,
      comment: 'Incredible views from Burj Khalifa observation deck. Quick queue bypass and the aquarium tour was brilliant for our family group!',
      createdAt: new Date().toISOString()
    }
  ];

  const bookings = [];
  const subscribers = [];

  const premiumServices = [
    {
      _id: new mongoose.Types.ObjectId().toString(),
      name: "Global Visa Services",
      shortDescription: "Professional, swift international visa processing for corporate personnel and leisure groups worldwide.",
      title: "Global Visa Services: Unrestricted Worldwide Mobility",
      about: "Happy Land Group Ventures offers standard-setting, highly secure global visa processing for high-net-worth individuals, business executives, and leisure groups. Our dedicated visa officers maintain active relations with major consulates, managing everything from documentation to VIP fast-track appointments globally.",
      icon: "FiGlobe",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80",
      order: 1,
      status: "active"
    },
    {
      _id: new mongoose.Types.ObjectId().toString(),
      name: "UAE Tourist & Resident Visas",
      shortDescription: "Streamlined processing for tourist entry visas, resident visas, and official work authorization filings in Ajman & Dubai.",
      title: "UAE Tourist & Resident Visas: Golden Visa & Corporate Authorizations",
      about: "Navigate the complex landscape of UAE immigration effortlessly. We process VIP tourist visas, long-term multi-entry visas, and the exclusive UAE Golden Visa program for global investors. Our Ajman and Dubai headquarters handle corporate work permissions and family residency sponsor files in record time.",
      icon: "FiFileText",
      image: "https://images.unsplash.com/photo-1582672060674-bc2bd808a83a?auto=format&fit=crop&w=1200&q=80",
      order: 2,
      status: "active"
    },
    {
      _id: new mongoose.Types.ObjectId().toString(),
      name: "Luxury Excursions",
      shortDescription: "Bespoke premium itineraries featuring private desert dunes, helicopter flights, and cultural encounters across the UAE.",
      title: "Luxury Excursions: Bespoke Curated UAE Adventures",
      about: "Experience the UAE in its most sublime form. From private dune bashing in custom Land Cruisers and sunset falconry to fast-pass luxury access at Qasr Al Watan, our excursions are hand-tailored. Each trip includes dedicated guest relations and elite access guarantees.",
      icon: "FiCompass",
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80",
      order: 3,
      status: "active"
    },
    {
      _id: new mongoose.Types.ObjectId().toString(),
      name: "MICE & Corporate Events",
      shortDescription: "World-class management of executive meetings, incentive corporate travels, summits, and grand exhibitions.",
      title: "MICE & Corporate Events: Elite Corporate Summit Organizing",
      about: "We specialize in corporate Meetings, Incentives, Conferences, and Exhibitions (MICE). Our coordinators deliver end-to-end event logistics for international delegations, board meetings, and product launches in five-star Dubai venues. This includes high-profile VIP security, VIP transits, and luxury banqueting.",
      icon: "FiBriefcase",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
      order: 4,
      status: "active"
    },
    {
      _id: new mongoose.Types.ObjectId().toString(),
      name: "FIT Custom Leisure",
      shortDescription: "Bespoke arrangements for Free Independent Travelers, creating personalized luxury vacations that match specific needs.",
      title: "FIT Custom Leisure: Personal Luxury Tailoring",
      about: "For Free Independent Travelers (FIT) who seek individualistic discovery without structural constraints, we offer complete vacation personalization. Our lifestyle curators program custom daily schedules, select rare dining tables, and assemble bespoke experiences matching your design aesthetics.",
      icon: "FiSliders",
      image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1200&q=80",
      order: 5,
      status: "active"
    },
    {
      _id: new mongoose.Types.ObjectId().toString(),
      name: "Boutique Accommodations",
      shortDescription: "Curated list of 5-star hotels, luxury resort suites, and boutique private villa rentals with VIP privileges.",
      title: "Boutique Accommodations: Ultra-Luxury Villas & Penthouse Rentals",
      about: "Through our private network, we secure bookings in the UAE's most exclusive five-star luxury resorts, presidential penthouse suites, and gated private island villas (e.g. Palm Jumeirah). Our partnerships guarantee priority check-ins, custom Butler services, and complimentary VVIP upgrades.",
      icon: "FiHome",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
      order: 6,
      status: "active"
    },
    {
      _id: new mongoose.Types.ObjectId().toString(),
      name: "Executive Transfers",
      shortDescription: "Luxury ground transits, helicopter charters, and private yacht transfers ensuring ultimate comfort and style.",
      title: "Executive Transfers: Elite Land, Sea, and Air Transits",
      about: "Arrive in ultimate comfort and safety. We maintain a stellar fleet of Rolls-Royce, Mercedes-Maybach, and luxury SUVs driven by professional bilingual security chauffeurs. We also arrange private helicopter transits and speedboat harbor transfers across Dubai Marina.",
      icon: "FiTrendingUp",
      image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
      order: 7,
      status: "active"
    },
    {
      _id: new mongoose.Types.ObjectId().toString(),
      name: "Meet & Greet",
      shortDescription: "Elite fast-track airport concierge services guiding you through passport controls and luxury lounge access.",
      title: "Meet & Greet: Fast-Track Airport VVIP Concierge",
      about: "Skip the queues completely. Our airport agents greet you directly at the aircraft gate, bypass you through priority immigration and luggage handling, and usher you into private first-class airport lounges before transitioning you to your chauffeur.",
      icon: "FiUserCheck",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80",
      order: 8,
      status: "active"
    },
    {
      _id: new mongoose.Types.ObjectId().toString(),
      name: "Cruises & Yacht Charters",
      shortDescription: "Private charters on premium yachts and traditional dhow cruises complete with gourmet live catering.",
      title: "Cruises & Yacht Charters: Ocean Splendors & Private Yacht Sailing",
      about: "Charter a private superyacht with a dedicated captain and crew. Sail past Ain Dubai and Palm Jumeirah with luxury champagne flows, a custom live chef grill, and custom jetski attachments. We also host grand events on traditional glass-walled dhows.",
      icon: "FiAnchor",
      image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1200&q=80",
      order: 9,
      status: "active"
    },
    {
      _id: new mongoose.Types.ObjectId().toString(),
      name: "B2B Portal model",
      shortDescription: "State-of-the-art booking portals for wholesale agencies, providing real-time inventories and global solutions.",
      title: "B2B Portal Model: High-Velocity Global Agency Booking",
      about: "For international wholesale travel companies and B2B agents, we offer API-integrated booking systems. Gain immediate access to real-time UAE room inventories, visa queues, private excursion availabilities, and competitive wholesale pricing matrices.",
      icon: "FiLayers",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      order: 10,
      status: "active"
    }
  ];

  return { users, tours, reviews, bookings, subscribers, premiumServices };
};

// Initialize file-based DB
const getLocalData = () => {
  ensureUploadsExist();
  if (!fs.existsSync(dbFilePath)) {
    const defaultData = getInitialSeedData();
    fs.writeFileSync(dbFilePath, JSON.stringify(defaultData, null, 2));
    return defaultData;
  }
  try {
    const data = JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));
    // If premiumServices is missing or empty, seed it automatically
    if (!data.premiumServices || data.premiumServices.length === 0) {
      const defaultData = getInitialSeedData();
      data.premiumServices = defaultData.premiumServices;
      fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
    }
    return data;
  } catch (error) {
    const defaultData = getInitialSeedData();
    fs.writeFileSync(dbFilePath, JSON.stringify(defaultData, null, 2));
    return defaultData;
  }
};

const saveLocalData = (data) => {
  ensureUploadsExist();
  fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
};

// Checking Mongoose active connection
const isMongoConnected = () => {
  return mongoose.connection.readyState === 1;
};

// DB Helper exports
const dbHelper = {
  // --- TOURS INTERFACE ---
  findTours: async (filters = {}) => {
    if (isMongoConnected()) {
      const Tour = require('../models/Tour');
      const mongoFilters = {};

      if (filters.search) {
        const reg = new RegExp(filters.search, 'i');
        mongoFilters.$or = [
          { title: reg },
          { country: reg },
          { city: reg }
        ];
      }
      
      if (filters.featured !== undefined) {
        mongoFilters.featured = filters.featured;
      }
      
      if (filters.minPrice || filters.maxPrice) {
        mongoFilters.price = {};
        if (filters.minPrice) mongoFilters.price.$gte = Number(filters.minPrice);
        if (filters.maxPrice) mongoFilters.price.$lte = Number(filters.maxPrice);
      }
      
      if (filters.maxPeople) {
        mongoFilters.maxPeople = { $gte: Number(filters.maxPeople) };
      }
      
      if (filters.distance) {
        mongoFilters.distance = { $lte: Number(filters.distance) };
      }
      
      if (filters.tourType) {
        mongoFilters.tourType = filters.tourType;
      }

      return await Tour.find(mongoFilters);
    }
    
    // Fallback mode
    const db = getLocalData();
    let result = [...db.tours];

    // Search filter (Matches city, country, or title)
    if (filters.search) {
      const reg = new RegExp(filters.search, 'i');
      result = result.filter(t => reg.test(t.title) || reg.test(t.country) || reg.test(t.city));
    }

    if (filters.featured !== undefined) {
      result = result.filter(t => t.featured === filters.featured);
    }

    if (filters.minPrice) {
      result = result.filter(t => t.price >= Number(filters.minPrice));
    }

    if (filters.maxPrice) {
      result = result.filter(t => t.price <= Number(filters.maxPrice));
    }

    if (filters.maxPeople) {
      result = result.filter(t => t.maxPeople >= Number(filters.maxPeople));
    }

    if (filters.distance) {
      result = result.filter(t => t.distance <= Number(filters.distance));
    }

    if (filters.tourType) {
      result = result.filter(t => t.tourType === filters.tourType);
    }

    return result;
  },

  findTourById: async (id) => {
    if (isMongoConnected()) {
      const Tour = require('../models/Tour');
      return await Tour.findById(id);
    }
    const db = getLocalData();
    return db.tours.find(t => t._id === id.toString()) || null;
  },

  createTour: async (tourData) => {
    if (isMongoConnected()) {
      const Tour = require('../models/Tour');
      return await Tour.create(tourData);
    }
    const db = getLocalData();
    const newTour = {
      _id: new mongoose.Types.ObjectId().toString(),
      rating: 5.0,
      reviewsCount: 0,
      featured: false,
      images: ['/uploads/default-tour.png'],
      startDates: [],
      tourType: 'UAE Tours',
      duration: '1 Day',
      includes: [],
      ...tourData
    };
    db.tours.push(newTour);
    saveLocalData(db);
    return newTour;
  },

  updateTour: async (id, tourData) => {
    if (isMongoConnected()) {
      const Tour = require('../models/Tour');
      return await Tour.findByIdAndUpdate(id, { $set: tourData }, { new: true });
    }
    const db = getLocalData();
    const index = db.tours.findIndex(t => t._id === id.toString());
    if (index === -1) return null;
    db.tours[index] = { ...db.tours[index], ...tourData };
    saveLocalData(db);
    return db.tours[index];
  },

  deleteTour: async (id) => {
    if (isMongoConnected()) {
      const Tour = require('../models/Tour');
      return await Tour.findByIdAndDelete(id);
    }
    const db = getLocalData();
    db.tours = db.tours.filter(t => t._id !== id.toString());
    saveLocalData(db);
    return true;
  },

  // --- USERS INTERFACE ---
  findUserByEmail: async (email) => {
    if (isMongoConnected()) {
      const User = require('../models/User');
      // Force select password for comparisons
      return await User.findOne({ email }).select('+password');
    }
    const db = getLocalData();
    const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    return user || null;
  },

  findUserById: async (id) => {
    if (isMongoConnected()) {
      const User = require('../models/User');
      return await User.findById(id);
    }
    const db = getLocalData();
    return db.users.find(u => u._id === id.toString()) || null;
  },

  findUsers: async (filters = {}) => {
    if (isMongoConnected()) {
      const User = require('../models/User');
      return await User.find(filters);
    }
    const db = getLocalData();
    let result = [...db.users];
    if (filters.role) {
      result = result.filter(u => u.role === filters.role);
    }
    return result;
  },

  createUser: async (userData) => {
    if (isMongoConnected()) {
      const User = require('../models/User');
      return await User.create(userData);
    }
    const db = getLocalData();
    const bcrypt = require('bcryptjs');
    const salt = bcrypt.genSaltSync(10);
    const newUser = {
      _id: new mongoose.Types.ObjectId().toString(),
      avatar: '/uploads/default-avatar.png',
      role: 'user',
      createdAt: new Date().toISOString(),
      ...userData,
      password: bcrypt.hashSync(userData.password, salt)
    };
    db.users.push(newUser);
    saveLocalData(db);
    return newUser;
  },

  updateUser: async (id, userData) => {
    if (isMongoConnected()) {
      const User = require('../models/User');
      return await User.findByIdAndUpdate(id, { $set: userData }, { new: true });
    }
    const db = getLocalData();
    const index = db.users.findIndex(u => u._id === id.toString());
    if (index === -1) return null;
    
    if (userData.password) {
      const bcrypt = require('bcryptjs');
      const salt = bcrypt.genSaltSync(10);
      userData.password = bcrypt.hashSync(userData.password, salt);
    }
    
    db.users[index] = { ...db.users[index], ...userData };
    saveLocalData(db);
    return db.users[index];
  },

  deleteUser: async (id) => {
    if (isMongoConnected()) {
      const User = require('../models/User');
      return await User.findByIdAndDelete(id);
    }
    const db = getLocalData();
    db.users = db.users.filter(u => u._id !== id.toString());
    saveLocalData(db);
    return true;
  },

  // --- BOOKINGS INTERFACE ---
  findBookings: async (filters = {}) => {
    if (isMongoConnected()) {
      const Booking = require('../models/Booking');
      return await Booking.find(filters).populate('tour').populate('user', 'firstName lastName email');
    }
    const db = getLocalData();
    let result = [...db.bookings];
    
    if (filters.user) {
      result = result.filter(b => b.user === filters.user.toString());
    }
    
    // Resolve references (populate)
    return result.map(booking => {
      const tour = db.tours.find(t => t._id === booking.tour) || null;
      const user = db.users.find(u => u._id === booking.user) || null;
      return {
        ...booking,
        tour,
        user: user ? { _id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email } : null
      };
    });
  },

  findBookingById: async (id) => {
    if (isMongoConnected()) {
      const Booking = require('../models/Booking');
      return await Booking.findById(id).populate('tour').populate('user', 'firstName lastName email phone');
    }
    const db = getLocalData();
    const booking = db.bookings.find(b => b._id === id.toString());
    if (!booking) return null;
    
    const tour = db.tours.find(t => t._id === booking.tour) || null;
    const user = db.users.find(u => u._id === booking.user) || null;
    return {
      ...booking,
      tour,
      user
    };
  },

  createBooking: async (bookingData) => {
    if (isMongoConnected()) {
      const Booking = require('../models/Booking');
      return await Booking.create(bookingData);
    }
    const db = getLocalData();
    const newBooking = {
      _id: new mongoose.Types.ObjectId().toString(),
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      ...bookingData
    };
    db.bookings.push(newBooking);
    saveLocalData(db);
    return newBooking;
  },

  updateBookingStatus: async (id, status) => {
    if (isMongoConnected()) {
      const Booking = require('../models/Booking');
      return await Booking.findByIdAndUpdate(id, { status }, { new: true });
    }
    const db = getLocalData();
    const index = db.bookings.findIndex(b => b._id === id.toString());
    if (index === -1) return null;
    db.bookings[index].status = status;
    saveLocalData(db);
    return db.bookings[index];
  },

  // --- REVIEWS INTERFACE ---
  findReviewsByTour: async (tourId) => {
    if (isMongoConnected()) {
      const Review = require('../models/Review');
      return await Review.find({ tour: tourId }).populate('user', 'firstName lastName avatar');
    }
    const db = getLocalData();
    const list = db.reviews.filter(r => r.tour === tourId.toString());
    return list.map(review => {
      const user = db.users.find(u => u._id === review.user) || null;
      return {
        ...review,
        user: user ? { _id: user._id, firstName: user.firstName, lastName: user.lastName, avatar: user.avatar } : null
      };
    });
  },

  createReview: async (reviewData) => {
    if (isMongoConnected()) {
      const Review = require('../models/Review');
      return await Review.create(reviewData);
    }
    const db = getLocalData();
    const newReview = {
      _id: new mongoose.Types.ObjectId().toString(),
      createdAt: new Date().toISOString(),
      ...reviewData
    };
    db.reviews.push(newReview);
    
    // Recompute average rating and reviewsCount in the tour
    const tourReviews = db.reviews.filter(r => r.tour === reviewData.tour);
    const avg = tourReviews.reduce((sum, r) => sum + r.rating, 0) / tourReviews.length;
    const roundedAvg = Math.round(avg * 10) / 10;
    
    const tourIndex = db.tours.findIndex(t => t._id === reviewData.tour);
    if (tourIndex !== -1) {
      db.tours[tourIndex].rating = roundedAvg;
      db.tours[tourIndex].reviewsCount = tourReviews.length;
    }
    
    saveLocalData(db);
    return newReview;
  },

  checkIfReviewed: async (userId, tourId) => {
    if (isMongoConnected()) {
      const Review = require('../models/Review');
      return await Review.findOne({ user: userId, tour: tourId });
    }
    const db = getLocalData();
    return db.reviews.find(r => r.user === userId.toString() && r.tour === tourId.toString()) || null;
  },

  // --- NEWSLETTER INTERFACE ---
  createSubscriber: async (email) => {
    if (isMongoConnected()) {
      const NewsletterSubscriber = require('../models/NewsletterSubscriber');
      const exists = await NewsletterSubscriber.findOne({ email });
      if (exists) return exists;
      return await NewsletterSubscriber.create({ email });
    }
    const db = getLocalData();
    const exists = db.subscribers.find(s => s.email.toLowerCase() === email.toLowerCase());
    if (exists) return exists;
    
    const newSub = {
      _id: new mongoose.Types.ObjectId().toString(),
      email,
      subscribedAt: new Date().toISOString()
    };
    db.subscribers.push(newSub);
    saveLocalData(db);
    return newSub;
  },

  // --- SETTINGS INTERFACE ---
  getSettings: async () => {
    if (isMongoConnected()) {
      const Setting = mongoose.models.Setting || mongoose.model('Setting', new mongoose.Schema({
        logoUrl: String,
        logoText: String,
        logoTextSpan: String
      }, { strict: false }));
      let setting = await Setting.findOne();
      if (!setting) {
        setting = await Setting.create({ logoUrl: '', logoText: 'Happy Land', logoTextSpan: 'Group' });
      }
      return setting;
    }
    const db = getLocalData();
    if (!db.settings) {
      db.settings = {
        logoUrl: '',
        logoText: 'Happy Land',
        logoTextSpan: 'Group'
      };
      saveLocalData(db);
    }
    return db.settings;
  },

  updateSettings: async (settingsData) => {
    if (isMongoConnected()) {
      const Setting = mongoose.models.Setting || mongoose.model('Setting', new mongoose.Schema({
        logoUrl: String,
        logoText: String,
        logoTextSpan: String
      }, { strict: false }));
      let setting = await Setting.findOne();
      if (!setting) {
        return await Setting.create(settingsData);
      }
      return await Setting.findByIdAndUpdate(setting._id, settingsData, { new: true });
    }
    const db = getLocalData();
    db.settings = {
      ...db.settings,
      ...settingsData
    };
    saveLocalData(db);
    return db.settings;
  },

  // --- PREMIUM SERVICES INTERFACE ---
  findPremiumServices: async (filters = {}) => {
    if (isMongoConnected()) {
      const PremiumService = require('../models/PremiumService');
      return await PremiumService.find(filters).sort({ order: 1 });
    }
    const db = getLocalData();
    let result = [...(db.premiumServices || [])];
    if (filters.status) {
      result = result.filter(s => s.status === filters.status);
    }
    return result.sort((a, b) => (a.order || 0) - (b.order || 0));
  },

  findPremiumServiceById: async (id) => {
    if (isMongoConnected()) {
      const PremiumService = require('../models/PremiumService');
      return await PremiumService.findById(id);
    }
    const db = getLocalData();
    return (db.premiumServices || []).find(s => s._id === id.toString()) || null;
  },

  createPremiumService: async (serviceData) => {
    if (isMongoConnected()) {
      const PremiumService = require('../models/PremiumService');
      return await PremiumService.create(serviceData);
    }
    const db = getLocalData();
    if (!db.premiumServices) db.premiumServices = [];
    const newService = {
      _id: new mongoose.Types.ObjectId().toString(),
      order: 0,
      status: 'active',
      ...serviceData
    };
    db.premiumServices.push(newService);
    saveLocalData(db);
    return newService;
  },

  updatePremiumService: async (id, serviceData) => {
    if (isMongoConnected()) {
      const PremiumService = require('../models/PremiumService');
      return await PremiumService.findByIdAndUpdate(id, { $set: serviceData }, { new: true });
    }
    const db = getLocalData();
    if (!db.premiumServices) return null;
    const index = db.premiumServices.findIndex(s => s._id === id.toString());
    if (index === -1) return null;
    db.premiumServices[index] = { ...db.premiumServices[index], ...serviceData };
    saveLocalData(db);
    return db.premiumServices[index];
  },

  deletePremiumService: async (id) => {
    if (isMongoConnected()) {
      const PremiumService = require('../models/PremiumService');
      return await PremiumService.findByIdAndDelete(id);
    }
    const db = getLocalData();
    if (!db.premiumServices) return false;
    db.premiumServices = db.premiumServices.filter(s => s._id !== id.toString());
    saveLocalData(db);
    return true;
  },

  seedPremiumServicesIfEmpty: async () => {
    if (isMongoConnected()) {
      const PremiumService = require('../models/PremiumService');
      const count = await PremiumService.countDocuments();
      if (count === 0) {
        console.log('MongoDB: PremiumService collection is empty. Seeding initial services...');
        const initialData = getInitialSeedData();
        await PremiumService.insertMany(initialData.premiumServices);
        console.log('MongoDB: PremiumService collection successfully seeded.');
      }
    } else {
      console.log('Local JSON DB: Checking premium services...');
      const db = getLocalData();
      if (!db.premiumServices || db.premiumServices.length === 0) {
        console.log('Local JSON DB: Seeding initial premium services...');
        const initialData = getInitialSeedData();
        db.premiumServices = initialData.premiumServices;
        saveLocalData(db);
        console.log('Local JSON DB: Premium services successfully seeded.');
      }
    }
  },

  // --- CONTACT INFO & MESSAGES INTERFACE ---
  getContactInfo: async () => {
    if (isMongoConnected()) {
      const ContactInfo = require('../models/ContactInfo');
      let info = await ContactInfo.findOne();
      if (!info) {
        info = await ContactInfo.create({});
      }
      return info;
    }
    const db = getLocalData();
    if (!db.contactInfo) {
      db.contactInfo = {
        title: 'Contact Our Elite Concierge',
        description: 'Reach out to our premium support team to tailor your dream luxury vacation or corporate excursion.',
        phone: '+971 4 123 4567',
        location: 'Happy Land Premium Building, Office 302, Ajman, UAE',
        facebook: 'https://facebook.com',
        instagram: 'https://instagram.com',
        twitter: 'https://twitter.com',
        linkedin: 'https://linkedin.com'
      };
      saveLocalData(db);
    }
    return db.contactInfo;
  },

  updateContactInfo: async (infoData) => {
    if (isMongoConnected()) {
      const ContactInfo = require('../models/ContactInfo');
      let info = await ContactInfo.findOne();
      if (!info) {
        return await ContactInfo.create(infoData);
      }
      return await ContactInfo.findByIdAndUpdate(info._id, infoData, { new: true });
    }
    const db = getLocalData();
    db.contactInfo = {
      ...(db.contactInfo || {
        title: 'Contact Our Elite Concierge',
        description: 'Reach out to our premium support team to tailor your dream luxury vacation or corporate excursion.',
        phone: '+971 4 123 4567',
        location: 'Happy Land Premium Building, Office 302, Ajman, UAE',
        facebook: 'https://facebook.com',
        instagram: 'https://instagram.com',
        twitter: 'https://twitter.com',
        linkedin: 'https://linkedin.com'
      }),
      ...infoData
    };
    saveLocalData(db);
    return db.contactInfo;
  },

  createContactMessage: async (messageData) => {
    if (isMongoConnected()) {
      const ContactMessage = require('../models/ContactMessage');
      return await ContactMessage.create(messageData);
    }
    const db = getLocalData();
    if (!db.contactMessages) db.contactMessages = [];
    const newMessage = {
      _id: new mongoose.Types.ObjectId().toString(),
      status: 'unread',
      createdAt: new Date().toISOString(),
      ...messageData
    };
    db.contactMessages.push(newMessage);
    saveLocalData(db);
    return newMessage;
  },

  findContactMessages: async () => {
    if (isMongoConnected()) {
      const ContactMessage = require('../models/ContactMessage');
      return await ContactMessage.find({}).sort({ createdAt: -1 });
    }
    const db = getLocalData();
    return [...(db.contactMessages || [])].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  updateContactMessageStatus: async (id, status) => {
    if (isMongoConnected()) {
      const ContactMessage = require('../models/ContactMessage');
      return await ContactMessage.findByIdAndUpdate(id, { status }, { new: true });
    }
    const db = getLocalData();
    if (!db.contactMessages) return null;
    const index = db.contactMessages.findIndex(m => m._id === id.toString());
    if (index === -1) return null;
    db.contactMessages[index].status = status;
    saveLocalData(db);
    return db.contactMessages[index];
  },

  deleteContactMessage: async (id) => {
    if (isMongoConnected()) {
      const ContactMessage = require('../models/ContactMessage');
      return await ContactMessage.findByIdAndDelete(id);
    }
    const db = getLocalData();
    if (!db.contactMessages) return false;
    db.contactMessages = db.contactMessages.filter(m => m._id !== id.toString());
    saveLocalData(db);
    return true;
  }
};

// Initialize right away if in fallback mode
getLocalData();

module.exports = dbHelper;
