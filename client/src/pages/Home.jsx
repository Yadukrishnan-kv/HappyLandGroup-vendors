import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import API from '../api';
import Card from '../components/common/Card';
import Skeleton from '../components/common/Skeleton';
import LogoSlider from '../components/common/LogoSlider';
import { useMagnetic } from '../hooks/useMagnetic';
import { 
  FiMapPin, FiActivity, FiUsers, FiSearch, 
  FiGlobe, FiFileText, FiCompass, FiBriefcase, 
  FiSliders, FiHome, FiTrendingUp, FiUserCheck, 
  FiAnchor, FiLayers, FiChevronLeft, FiChevronRight, FiCheckCircle 
} from 'react-icons/fi';
import * as Icons from 'react-icons/fi';
import { getImageUrl, handleImageError } from '../utils/imageHelper';
import '../styles/pages/home.css';


export const Home = () => {
  const navigate = useNavigate();
  const [featuredTours, setFeaturedTours] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Blogs state
  const [blogs, setBlogs] = useState([]);
  const [blogsLoading, setBlogsLoading] = useState(true);

  // Why Travel Features state
  const [whyTravelFeatures, setWhyTravelFeatures] = useState([]);
  const [whyTravelLoading, setWhyTravelLoading] = useState(true);

  // Trust Logos state
  const [logos, setLogos] = useState([]);
  
  // Premium Services state
  const [services, setServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  
  // Search bar states
  const [search, setSearch] = useState('');
  const [distance, setDistance] = useState('');
  const [maxPeople, setMaxPeople] = useState('');

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // Magnetic refs
  const searchBtnRef = useMagnetic(0.25);
  const newsletterBtnRef = useMagnetic(0.25);

  // Load featured tours, blogs, & trust logos
  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await API.get('/tours?featured=true');
        if (res.data.success) {
          setFeaturedTours(res.data.data);
        }
      } catch (err) {
        console.error('Failed to load featured tours', err);
      } finally {
        setLoading(false);
      }
    };

    const fetchBlogs = async () => {
      try {
        const res = await API.get('/blogs');
        if (res.data.success) {
          setBlogs(res.data.data);
        }
      } catch (err) {
        console.error('Failed to load blogs', err);
      } finally {
        setBlogsLoading(false);
      }
    };

    const fetchLogos = async () => {
      try {
        const res = await API.get('/trust-logos');
        if (res.data.success) {
          setLogos(res.data.data);
        }
      } catch (err) {
        console.error('Failed to load trust logos', err);
      }
    };

    const fetchServices = async () => {
      try {
        const res = await API.get('/premium-services');
        if (res.data.success) {
          setServices(res.data.data);
        }
      } catch (err) {
        console.error('Failed to load premium services', err);
      } finally {
        setServicesLoading(false);
      }
    };

    const fetchWhyTravelFeatures = async () => {
      try {
        const res = await API.get('/why-travel');
        if (res.data.success) {
          setWhyTravelFeatures(res.data.data);
        }
      } catch (err) {
        console.error('Failed to load why travel features', err);
      } finally {
        setWhyTravelLoading(false);
      }
    };

    fetchFeatured();
    fetchBlogs();
    fetchLogos();
    fetchServices();
    fetchWhyTravelFeatures();
  }, []);

  const renderIcon = (iconName) => {
    const IconComponent = Icons[iconName] || Icons.FiGlobe;
    return <IconComponent size={28} />;
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    let query = '?';
    if (search) query += `search=${search}&`;
    if (distance) query += `distance=${distance}&`;
    if (maxPeople) query += `maxPeople=${maxPeople}&`;
    navigate(`/tours${query}`);
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    try {
      const res = await API.post('/newsletter/subscribe', { email: newsletterEmail });
      if (res.data.success) {
        setNewsletterSuccess(true);
        setNewsletterEmail('');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Testimonials custom sliding state
  const testimonials = [
    {
      id: 1,
      quote: "Happy Land Group Ventures didn't just book a desert safari; they crafted an absolute work of art. The premium dunes, twilight fire show, and private luxury Land Cruiser transfers were flawless.",
      name: "Marcus Aurelius",
      role: "Luxury Connoisseur",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: 2,
      quote: "The Qasr Al Watan Presidential Palace VIP transit was spectacular. Highly professional and seamless B2B corporate team handling. They are the true kings of UAE destination management.",
      name: "Eleanor Vance",
      role: "Premium Travel Director",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: 3,
      quote: "Our yacht charter cruising Dubai Marina and sunset champagne buffet was breathtaking. Exceptionally curated tours and fast-track VIP airport services.",
      name: "Sophia Traveler",
      role: "VVIP Guest",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: 4,
      quote: "The fast-track corporate resident visas for our entire executive board were processed in record time. Absolute excellence in destination management and legal coordination.",
      name: "Alexander Mercer",
      role: "Chief Operating Officer",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: 5,
      quote: "Private helicopter tours over the Palm Jumeirah followed by high tea at Burj Al Arab. Unmatched bespoke itinerary. A masterclass in luxury UAE hosting.",
      name: "Gabriella Dupont",
      role: "Elite Concierge Client",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    }
  ];
  
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <div className="home-wrapper">
      
      {/* 1. HERO SECTION */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-grid">
            
            {/* Left Info Column */}
            <div className="hero-info">
              <div className="hero-badge">
                <span className="luxury-badge">Elite UAE Destination Management</span>
              </div>
              <h1 className="hero-title">
                Traveling opens <br />
                the door to creating <br />
                <span>memories</span>
              </h1>
              <p className="hero-desc">
                Happy Land Group Ventures curates the UAE's most exquisite travel experiences. From spectacular desert dunes to Burj Khalifa lounges, we design bespoke itineraries and premium visa solutions.
              </p>

              {/* Glass search filter */}
              <form className="search-pill-container" onSubmit={handleSearchSubmit}>
                <div className="search-field">
                  <label><FiMapPin size={12} /> Excursion</label>
                  <input 
                    type="text" 
                    placeholder="Where in the UAE?" 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <div className="search-field">
                  <label><FiActivity size={12} /> Max Distance</label>
                  <input 
                    type="number" 
                    placeholder="Distance (km)" 
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                  />
                </div>
                <div className="search-field">
                  <label><FiUsers size={12} /> Guests</label>
                  <input 
                    type="number" 
                    placeholder="Max People" 
                    value={maxPeople}
                    onChange={(e) => setMaxPeople(e.target.value)}
                  />
                </div>
                <div className="magnetic-wrap" ref={searchBtnRef}>
                  <button type="submit" className="btn-search" title="Search UAE Excursions">
                    <FiSearch size={20} />
                  </button>
                </div>
              </form>
            </div>

            {/* Right Collage Column */}
            <div className="hero-collage-wrap">
              <div className="glow-circle"></div>
              
              <div className="collage-item collage-1 anim-float">
                <img 
                  src="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80" 
                  alt="UAE desert dunes" 
                  onError={handleImageError}
                />
              </div>
              <div className="collage-item collage-2 anim-float-slow" style={{ animationDelay: '1.5s' }}>
                <img 
                  src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80" 
                  alt="Burj Khalifa Skyline" 
                  onError={handleImageError}
                />
              </div>
              <div className="collage-item collage-3 anim-float" style={{ animationDelay: '3s' }}>
                <img 
                  src="https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=600&q=80" 
                  alt="Abu Dhabi Grand Mosque" 
                  onError={handleImageError}
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. SERVICES SECTION */}
      <section className="services-section section">
        <div className="container">
          <div className="services-header" style={{ marginBottom: '50px' }}>
            <span className="luxury-badge">Complete Travel Portfolio</span>
            <h2 className="editorial-title mt-20" style={{ fontSize: '3rem' }}>
              Our <em>specialized</em> premium services
            </h2>
            <p className="hero-desc" style={{ maxWidth: '800px', marginTop: '15px' }}>
              We offer standard-setting corporate, individual, and B2B agent models backed by over a decade of verified destination management in Ajman and Dubai.
            </p>
          </div>

          <div className="grid-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
            {servicesLoading ? (
              <>
                <Skeleton type="card" />
                <Skeleton type="card" />
                <Skeleton type="card" />
              </>
            ) : services.length > 0 ? (
              services.map((service) => (
                <motion.div 
                  key={service._id}
                  onClick={() => navigate(`/services/${service._id}`)}
                  className="service-card glass-hover" 
                  style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '15px', 
                    padding: '35px', 
                    borderRadius: '20px', 
                    border: '1px solid rgba(255,255,255,0.06)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  whileHover={{ y: -8, borderColor: 'rgba(212, 175, 55, 0.25)' }}
                >
                  <div className="service-icon-wrap" style={{ width: '60px', height: '60px', borderRadius: '15px', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {renderIcon(service.icon)}
                  </div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: '600' }}>{service.name}</h3>
                  <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>{service.shortDescription}</p>
                </motion.div>
              ))
            ) : (
              <p style={{ gridColumn: 'span 3', textAlign: 'center', color: 'var(--subtext)' }}>
                No premium services currently available.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* 3. FEATURED TOURS */}
      <section className="featured-section section">
        <div className="container">
          <div className="flex-between mb-40 flex-wrap gap-20">
            <div>
              <span className="luxury-badge">Signature Excursions</span>
              <h2 className="editorial-title mt-10" style={{ fontSize: '3rem' }}>
                Featured <em>UAE</em> itineraries
              </h2>
            </div>
            <button className="btn-premium" onClick={() => navigate('/tours')}>
              View All Excursions
            </button>
          </div>

          <div className="grid-3">
            {loading ? (
              <>
                <Skeleton type="card" />
                <Skeleton type="card" />
                <Skeleton type="card" />
              </>
            ) : featuredTours.length > 0 ? (
              featuredTours.slice(0, 3).map((tour, idx) => (
                <Card key={tour._id} tour={tour} delay={idx * 0.15} />
              ))
            ) : (
              <p style={{ gridColumn: 'span 3', textAlign: 'center', color: 'var(--subtext)' }}>
                No featured destinations found. Run server seeder.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* 4. EXPERIENCE SECTION */}
      <section className="experience-section section">
        <div className="container">
          <div className="experience-grid">
            
            {/* Left Counters Column */}
            <div className="experience-text">
              <span className="luxury-badge">Nearly Two Decades of Excellence</span>
              <h2 className="editorial-title mt-20" style={{ fontSize: '3rem', marginBottom: '24px' }}>
                With our <em>rich history</em>, we will serve you
              </h2>
              <p className="hero-desc" style={{ marginBottom: '30px', lineHeight: '1.7' }}>
                Since 2006, Happy Land Group Ventures has delivered outstanding visa processing and bespoke excursions. We coordinate flawless, end-to-end logistics so that your only focus is absorbing stunning landscapes and creating lasting memories.
              </p>

              <div className="experience-counters">
                <div className="counter-item">
                  <div className="counter-num">18k+</div>
                  <div className="counter-label">Clients Serviced</div>
                </div>
                <div className="counter-item">
                  <div className="counter-num">20+</div>
                  <div className="counter-label">Expert Coordinators</div>
                </div>
                <div className="counter-item">
                  <div className="counter-num">15+</div>
                  <div className="counter-label">Years of Experience</div>
                </div>
              </div>
            </div>

            {/* Right overlapping images */}
            <div className="experience-img-collage">
              <img 
                src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=700&q=80" 
                alt="Dubai skyline luxury view" 
                className="exp-img-1"
                onError={handleImageError}
              />
              <img 
                src="https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=500&q=80" 
                alt="Abu Dhabi Grand Mosque" 
                className="exp-img-2 animate-float"
                onError={handleImageError}
              />
            </div>

          </div>
        </div>
      </section>

      {/* 5. GALLERY MASONRY */}
      <section className="gallery-section section">
        <div className="container">
          <div className="text-center mb-60">
            <span className="luxury-badge">Visual Chronicles</span>
            <h2 className="editorial-title mt-20" style={{ fontSize: '3.2rem' }}>
              Our guests' <em>excursion</em> moments
            </h2>
          </div>

          <div className="gallery-grid">
            <div className="gallery-item gallery-tall">
              <img src="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80" alt="Desert safari" onError={handleImageError} />
              <div className="gallery-item-overlay">
                <div className="gallery-text">Bespoke Safari</div>
              </div>
            </div>

            <div className="gallery-item gallery-wide">
              <img src="https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1200&q=80" alt="Yacht marina" onError={handleImageError} />
              <div className="gallery-item-overlay">
                <div className="gallery-text">Yacht Marina Cruises</div>
              </div>
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80" alt="Burj Khalifa skyline" onError={handleImageError} />
              <div className="gallery-item-overlay">
                <div className="gallery-text">Skyline Access</div>
              </div>
            </div>
            <div className="gallery-item gallery-tall">
              <img src="https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=600&q=80" alt="Abu Dhabi Mosque" onError={handleImageError} />
              <div className="gallery-item-overlay">
                <div className="gallery-text">Royal Grand Mosque</div>
              </div>
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1508849789987-4e5333c12b78?auto=format&fit=crop&w=600&q=80" alt="Helicopter skyline ride" onError={handleImageError} />
              <div className="gallery-item-overlay">
                <div className="gallery-text">Helicopter Horizon</div>
              </div>
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1526401485004-2ea8b4b0fc7f?auto=format&fit=crop&w=600&q=80" alt="Cultural Tour" onError={handleImageError} />
              <div className="gallery-item-overlay">
                <div className="gallery-text">Cultural Tour</div>
              </div>
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1526401315065-8e5b86d4fe5e?auto=format&fit=crop&w=600&q=80" alt="Desert Sunset" onError={handleImageError} />
              <div className="gallery-item-overlay">
                <div className="gallery-text">Desert Sunset</div>
              </div>
            </div>
            <div className="gallery-item gallery-wide">
              <img src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80" alt="Marina Dhow cruise" onError={handleImageError} />
              <div className="gallery-item-overlay">
                <div className="gallery-text">Dhow Cruise Dining</div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* 6.5. BLOGS SECTION (JOURNAL) */}
      <section className="blogs-section section" style={{ background: 'var(--bg-soft)', position: 'relative' }}>
        <div className="container">
          <div className="flex-between mb-40 flex-wrap gap-20">
            <div>
              <span className="luxury-badge">Travel Journals</span>
              <h2 className="editorial-title mt-10" style={{ fontSize: '3rem' }}>
                Our Latest <em>Blogs</em>
              </h2>
            </div>
            <button className="btn-premium" onClick={() => navigate('/blogs')}>
              Explore All Blogs
            </button>
          </div>

          <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
            {blogsLoading ? (
              <>
                <Skeleton type="card" />
                <Skeleton type="card" />
                <Skeleton type="card" />
              </>
            ) : blogs.length > 0 ? (
              blogs.slice(0, 3).map((blog, idx) => (
                <motion.div
                  key={blog._id}
                  className="glass-panel"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  whileHover={{ y: -8, boxShadow: 'var(--shadow-gold)', borderColor: 'var(--primary-gold)' }}
                  style={{ 
                    borderRadius: 'var(--radius-lg)', 
                    overflow: 'hidden', 
                    cursor: 'default', 
                    transition: 'var(--transition-smooth)',
                    background: 'var(--card-bg)',
                    border: '1px solid var(--border-light)',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%'
                  }}
                >
                  <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                    <img 
                      src={getImageUrl(blog.coverImage)} 
                      alt={blog.title} 
                      onError={handleImageError}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s var(--transition-smooth)' }}
                      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
                      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    />
                    <div style={{ position: 'absolute', top: '15px', left: '15px', display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                      {blog.tags && blog.tags.slice(0, 2).map(tag => (
                        <span key={tag} style={{ fontSize: '0.7rem', background: 'var(--primary-gradient)', color: 'var(--bg-main)', padding: '4px 10px', borderRadius: '20px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div style={{ padding: '25px', display: 'flex', flexDirection: 'column', flexGrow: 1, alignItems: 'center', textAlign: 'center' }}>
                    <div>
                      <h3 style={{ fontSize: '1.25rem', color: 'var(--dark)', marginBottom: '12px', fontFamily: 'var(--font-serif)', fontWeight: '500', lineHeight: '1.4' }}>
                        {blog.title}
                      </h3>
                      <p style={{ color: 'var(--subtext)', fontSize: '0.88rem', lineHeight: '1.6', marginBottom: '0px' }}>
                        {blog.excerpt && blog.excerpt.length > 120 ? blog.excerpt.substring(0, 120) + '...' : blog.excerpt}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <p style={{ gridColumn: 'span 3', textAlign: 'center', color: 'var(--subtext)', padding: '40px 0' }}>
                No travel journals available at the moment.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* 6.65. WHY TRAVEL FEATURES SECTION */}
      {whyTravelFeatures && whyTravelFeatures.length > 0 && (
        <section className="why-travel-features-section section" style={{ background: 'var(--bg-main)', paddingTop: '80px', paddingBottom: '80px' }}>
          <div className="container">
            <div className="text-center mb-60">
              <span className="luxury-badge">Why Choose Us</span>
              <h2 className="editorial-title mt-20" style={{ fontSize: '3rem' }}>
                Why Travel <em>With Us</em>
              </h2>
            </div>

            <div className="why-travel-grid" style={{ padding: '20px 0' }}>
              {whyTravelLoading ? (
                <>
                  <Skeleton type="card" />
                  <Skeleton type="card" />
                  <Skeleton type="card" />
                </>
              ) : (
                whyTravelFeatures.map((feature, idx) => (
                  <motion.div
                    key={feature._id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.6 }}
                    className="why-travel-feature-card"
                    whileHover={{ 
                      borderColor: 'rgba(212, 175, 55, 0.65)',
                      background: 'rgba(255, 255, 255, 0.04)',
                      y: -5
                    }}
                  >
                    {/* Centered Feature Icon Box */}
                    <div className="feature-icon" style={{
                      width: '75px',
                      height: '75px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(212, 175, 55, 0.03) 100%)',
                      border: '1px solid rgba(212, 175, 55, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                      marginBottom: '5px'
                    }}>
                      {feature.icon ? (
                        <img 
                          src={getImageUrl(feature.icon)} 
                          alt={feature.title} 
                          onError={handleImageError}
                          style={{ width: '38px', height: '38px', objectFit: 'contain' }}
                        />
                      ) : (
                        <FiCompass size={30} style={{ color: 'var(--primary-gold)' }} />
                      )}
                    </div>

                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-white)', lineHeight: '1.4', margin: '0' }}>
                      {feature.title}
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: '0', width: '100%', whiteSpace: 'pre-line' }}>
                      {feature.description}
                    </p>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </section>
      )}

      {/* 6.6. PARTNERS (TRUST LOGOS) */}
      {logos && logos.length > 0 && (
        <section className="partners-section section" style={{ padding: '60px 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}>
          <div className="container">
            <div className="text-center mb-40">
              <span className="luxury-badge">Our Trusted Partners</span>
              <h2 className="editorial-title mt-10" style={{ fontSize: '2.5rem' }}>
                Colleague brands we <em>collaborate</em> with
              </h2>
            </div>
            <LogoSlider logos={logos} />
          </div>
        </section>
      )}

      {/* 6.7. TESTIMONIALS SLIDER (CLIENT CHRONICLES) */}
      <section className="testimonials-section section" style={{ background: 'var(--bg-soft)', position: 'relative' }}>
        <div className="container">
          <div className="text-center mb-60">
            <span className="luxury-badge">Client Chronicles</span>
            <h2 className="editorial-title mt-20" style={{ fontSize: '3rem' }}>
              What our <em>esteemed</em> guests say
            </h2>
          </div>

          <div style={{ position: 'relative', overflow: 'hidden', padding: '15px 0' }}>
            <div className="testimonials-carousel-wrapper">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div 
                  className="testimonials-grid"
                  layout
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  {[0, 1, 2].map((offset) => {
                    const idx = (activeTestimonial + offset) % testimonials.length;
                    const testimonial = testimonials[idx];
                    return (
                      <motion.div
                        key={testimonial.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9, x: 80 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9, x: -80 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="testimonial-card-v2"
                        whileHover={{ y: -6, borderColor: 'var(--primary-gold)', boxShadow: 'var(--shadow-gold)' }}
                      >
                        <div className="testimonial-quote-v2">
                          "{testimonial.quote}"
                        </div>
                        <div className="testimonial-user-v2">
                          <img 
                            src={testimonial.avatar} 
                            alt={testimonial.name} 
                            className="testimonial-avatar-v2"
                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://api.dicebear.com/7.x/adventurer/svg?seed=GuestUser'; }}
                          />
                          <div>
                            <div className="testimonial-name-v2">{testimonial.name}</div>
                            <div className="testimonial-role-v2">{testimonial.role}</div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slider arrows */}
            <div className="flex-center mt-40 gap-20">
              <button 
                onClick={() => setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                className="footer-social-icon" 
                style={{ cursor: 'pointer', background: 'var(--white)', border: '1px solid var(--border-light)', color: 'var(--dark)', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-glass)', transition: 'all 0.3s' }}
                onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--primary-gold)'; e.currentTarget.style.transform = 'scale(1.1)'; }}
                onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--border-light)'; e.currentTarget.style.transform = 'scale(1)'; }}
              >
                <FiChevronLeft size={22} />
              </button>
              <button 
                onClick={() => setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                className="footer-social-icon" 
                style={{ cursor: 'pointer', background: 'var(--white)', border: '1px solid var(--border-light)', color: 'var(--dark)', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-glass)', transition: 'all 0.3s' }}
                onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--primary-gold)'; e.currentTarget.style.transform = 'scale(1.1)'; }}
                onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--border-light)'; e.currentTarget.style.transform = 'scale(1)'; }}
              >
                <FiChevronRight size={22} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. NEWSLETTER SECTION */}
      <section className="newsletter-section section" style={{ paddingBottom: '0' }}>
        <div className="container" style={{ paddingBottom: '80px' }}>
          <div className="newsletter-card">
            <div className="newsletter-content">
              <h2>Subscribe to our <br />Private Registry</h2>
              <p>Unlock seasonal private island invitations, bespoke villa upgrades, and members-only luxury rates direct to your inbox.</p>
            </div>

            <div className="newsletter-action">
              {newsletterSuccess ? (
                <motion.div 
                  className="flex-col gap-10 flex-center text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <FiCheckCircle size={44} style={{ color: 'var(--primary)' }} />
                  <h3 style={{ fontSize: '1.4rem' }}>Welcome to the Club</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--subtext)' }}>Bespoke seasonal catalogs are headed your way.</p>
                </motion.div>
              ) : (
                <form className="newsletter-input-group" onSubmit={handleNewsletterSubmit}>
                  <input 
                    type="email" 
                    placeholder="Enter your email address" 
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    required
                  />
                  <div className="magnetic-wrap" ref={newsletterBtnRef}>
                    <button type="submit" className="btn-premium" style={{ padding: '12px 28px', fontSize: '0.85rem' }}>
                      Subscribe
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
