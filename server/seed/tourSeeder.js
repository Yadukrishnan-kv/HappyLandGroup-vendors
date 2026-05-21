const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../models/Tour');
const User = require('../models/User');
const Review = require('../models/Review');
const Booking = require('../models/Booking');

dotenv.config();

const tours = [
  {
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
    startDates: [new Date('2026-06-15'), new Date('2026-07-20')]
  },
  {
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
    startDates: [new Date('2026-06-01'), new Date('2026-07-05')]
  },
  {
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
    startDates: [new Date('2026-10-10')]
  },
  {
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
    startDates: [new Date('2026-05-18')]
  },
  {
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
    startDates: [new Date('2026-06-25')]
  },
  {
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
    startDates: [new Date('2026-11-20')]
  },
  {
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
    startDates: [new Date('2026-09-01')]
  },
  {
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
    startDates: [new Date('2026-06-20')]
  }
];

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/happylandtours';
    await mongoose.connect(mongoUri);
    console.log('MongoDB Connected for seeding...');

    // Clear existing data
    await Tour.deleteMany();
    console.log('Cleared existing tours.');
    
    // Clear reviews & bookings if any
    await Review.deleteMany();
    await Booking.deleteMany();
    console.log('Cleared old reviews and bookings.');

    // Seed tours
    const seededTours = await Tour.insertMany(tours);
    console.log('Tours successfully seeded!');

    // Create a default admin & user account for easier sandbox testing
    await User.deleteMany();
    console.log('Cleared existing users.');

    // Seed default administrator
    const adminUser = new User({
      firstName: 'Alen',
      lastName: 'Happy',
      email: 'admin@happygroupventures.com',
      password: 'password123',
      phone: '+971 4 123 4567',
      avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Jack',
      role: 'admin'
    });
    await adminUser.save();
    console.log('Admin user seeded: admin@happygroupventures.com / password123');

    // Seed default guest user
    const guestUser = new User({
      firstName: 'Sophia',
      lastName: 'Traveler',
      email: 'guest@happygroupventures.com',
      password: 'password123',
      phone: '+971 50 987 6543',
      avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Sophia',
      role: 'user'
    });
    await guestUser.save();
    console.log('Guest user seeded: guest@happygroupventures.com / password123');

    // Seed some reviews for tours
    const safariTour = seededTours.find(t => t.title === 'Bespoke Desert Safari & Dune Dinner');
    if (safariTour) {
      await Review.create({
        user: guestUser._id,
        tour: safariTour._id,
        rating: 5,
        comment: 'Absolutely breathtaking! The premium desert safari with dune bashing was amazing and the sunset photos with falcons were spectacular. Highly professional travel management.'
      });
      await Review.create({
        user: adminUser._id,
        tour: safariTour._id,
        rating: 5,
        comment: 'Superb camp buffer quality and luxury transfers. An absolute must-do for any executive team looking for authentic experiences.'
      });
    }

    const burjTour = seededTours.find(t => t.title === 'Burj Khalifa Skyline & Aquarium Access');
    if (burjTour) {
      await Review.create({
        user: guestUser._id,
        tour: burjTour._id,
        rating: 4,
        comment: 'Incredible views from Burj Khalifa observation deck. Quick queue bypass and the aquarium tour was brilliant for our family group!'
      });
    }

    console.log('Reviews successfully seeded!');
    process.exit();
  } catch (error) {
    console.error(`Error seeding data: ${error.message}`);
    process.exit(1);
  }
};

seedData();
