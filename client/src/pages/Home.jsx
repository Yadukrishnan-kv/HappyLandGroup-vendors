import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
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
import { Globe2 } from 'lucide-react';
import SearchBox from '../components/home/SearchBox';
import TourCard from '../components/home/TourCard';
import '../index.css'; // ensure global styles for .btn etc



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

  const handleCategorySelect = (slug) => {
    navigate(`/tours/category/${slug}`);
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
    <div className="home-wrapper" style={{ backgroundColor: 'var(--bg-white)', color: 'var(--text-dark)' }}>
      {/* Hero Section */}
      <section className="container" style={styles.heroSection}>
        <div style={styles.heroContent}>
          <div style={{...styles.tag, marginTop: '30px'}}>
            <span style={styles.tagText}>Know Before You Go</span>
            <Globe2 size={16} color="white" fill="white" style={styles.tagIcon} />
          </div>
          <h1 style={styles.heroTitle}>
            Traveling opens the door to creating <span style={{color: 'var(--primary)'}}>memories</span>
          </h1>
          <p style={styles.heroDesc}>
            Happy Land Group Ventures curates the UAE's finest bespoke travel experiences, offering elite destination management, visa processing, and breathtaking excursions since 2006.
          </p>
        </div>
        <div style={styles.heroImages}>
          <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop" alt="Travel 1" style={{...styles.heroImg, marginTop: '40px'}} />
          <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop" alt="Travel 2" style={{...styles.heroImg, marginTop: '20px'}} />
          <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop" alt="Travel 3" style={styles.heroImg} />
        </div>
      </section>

      {/* Search Box */}
      <SearchBox />

      {/* Services Section */}
      <section className="container" style={styles.servicesSection}>
        <div style={styles.servicesHeader}>
          <span style={styles.servicesTagline}>What we serve</span>
          <h2 style={styles.servicesTitle}>We offer our best services</h2>
        </div>
        <div style={{...styles.servicesCards, display: 'block', minWidth: 0}}>
          {servicesLoading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
              <Skeleton type="card" />
              <Skeleton type="card" />
              <Skeleton type="card" />
            </div>
          ) : services.length > 0 ? (
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
              loop={true}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              style={{ paddingBottom: '40px' }} // Space for pagination
            >
              {services.map(service => (
                <SwiperSlide key={service._id}>
                  <div className="service-card-hover" style={styles.serviceCard} onClick={() => navigate(`/services/${service._id}`)}>
                    <div style={styles.serviceIconWrapper}>
                      {renderIcon(service.icon)}
                    </div>
                    <h3 style={styles.serviceCardTitle}>{service.name}</h3>
                    <p style={styles.serviceCardDesc}>{service.shortDescription}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
              loop={true}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              style={{ paddingBottom: '40px' }}
            >
              {[
                { id: 's1', icon: 'FiMapPin', name: 'Tour Packages', desc: 'Curated luxury tours across UAE and beyond, tailored for every traveller.' },
                { id: 's2', icon: 'FiFileText', name: 'Visa Services', desc: 'Fast, hassle-free UAE tourist, resident and work visa processing.' },
                { id: 's3', icon: 'FiBriefcase', name: 'Corporate Travel', desc: 'Tailored B2B travel and destination management solutions for businesses.' },
              ].map(service => (
                <SwiperSlide key={service.id}>
                  <div className="service-card-hover" style={styles.serviceCard}>
                    <div style={styles.serviceIconWrapper}>
                      {renderIcon(service.icon)}
                    </div>
                    <h3 style={styles.serviceCardTitle}>{service.name}</h3>
                    <p style={styles.serviceCardDesc}>{service.desc}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </section>
      {/* 3. FEATURED TOURS SECTION */}
      <section className="featured-tours-section section" style={{ background: 'var(--white)', position: 'relative' }}>
        <div className="container">
          <div className="flex-between mb-50 flex-wrap gap-20">
            <div>
              <span className="luxury-badge">Signature Excursions</span>
              <h2 className="editorial-title mt-10" style={{ fontSize: '3.2rem' }}>
                Featured <em>UAE</em> itineraries
              </h2>
            </div>
            <button className="btn-premium" onClick={() => navigate('/tours')}>
              View All Excursions
            </button>
          </div>

          <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px', marginTop: '30px' }}>
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


      {/* Experience Section */}
      <section className="container" style={{...styles.section, ...styles.experienceSection}}>
        <div style={styles.expContent}>
          <span style={styles.sectionTag}>Experience</span>
          <h2 style={styles.sectionTitle}>With our all experience we will serve you</h2>
          <p style={styles.expDesc}>
            Whether managing complex corporate visa services, multi-city group operations, or curating high-end bespoke holiday itineraries, our expert Ajman-based operations ensure seamless reliability.
          </p>
          <div style={styles.stats}>
            <div style={styles.statItem}>
              <div style={styles.statBox}>18k+</div>
              <div style={styles.statLabel}>Clients Serviced</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statBox}>20+</div>
              <div style={styles.statLabel}>Expert Coordinators</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statBox}>15+</div>
              <div style={styles.statLabel}>Years of Experience</div>
            </div>
          </div>
        </div>
        <div style={styles.expImageWrapper}>
          <div className="experience-img-collage" style={{ width: '100%', maxWidth: '600px', height: '480px' }}>
            <img 
              src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070&auto=format&fit=crop" 
              alt="Dubai Skyline" 
              className="exp-img-1"
            />
            <img 
              src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=2070&auto=format&fit=crop" 
              alt="Traveler Experience" 
              className="exp-img-2"
            />
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="container" style={styles.section}>
        <div style={styles.sectionHeader}>
          <span style={styles.sectionTag}>Gallery</span>
          <h2 style={styles.sectionTitle}>Visit our customers tour gallery</h2>
        </div>

        {/* Row 1: 1 large left (50%), 2 right side-by-side (25% each) */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '14px', marginBottom: '14px' }}>
          
          <div style={{ height: '320px', borderRadius: '16px', overflow: 'hidden' }}>
            <img
              src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop"
              alt="Gallery 1"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
              onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
            />
          </div>

          <div style={{ height: '320px', borderRadius: '16px', overflow: 'hidden' }}>
            <img
              src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop"
              alt="Gallery 2"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
              onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
            />
          </div>

          <div style={{ height: '320px', borderRadius: '16px', overflow: 'hidden' }}>
            <img
              src="https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1974&auto=format&fit=crop"
              alt="Gallery 3"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
              onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
            />
          </div>

        </div>

        {/* Row 2: 3 equal images */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
          
          <div style={{ height: '260px', borderRadius: '16px', overflow: 'hidden' }}>
            <img
              src="https://images.unsplash.com/photo-1504150558240-0b4fd8946624?q=80&w=1964&auto=format&fit=crop"
              alt="Gallery 4"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
              onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
            />
          </div>

          <div style={{ height: '260px', borderRadius: '16px', overflow: 'hidden' }}>
            <img
              src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop"
              alt="Gallery 5"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
              onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
            />
          </div>

          <div style={{ height: '260px', borderRadius: '16px', overflow: 'hidden' }}>
            <img
              src="https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?q=80&w=2080&auto=format&fit=crop"
              alt="Gallery 6"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
              onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
            />
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

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '28px' }}>
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
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -10 }}
                  style={{
                    borderRadius: '24px',
                    overflow: 'hidden',
                    background: '#ffffff',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.04)',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    transition: 'transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), box-shadow 0.4s ease',
                    position: 'relative'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.12)';
                    const img = e.currentTarget.querySelector('.blog-img');
                    if (img) img.style.transform = 'scale(1.08)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.04)';
                    const img = e.currentTarget.querySelector('.blog-img');
                    if (img) img.style.transform = 'scale(1)';
                  }}
                  onClick={() => navigate(`/blogs/${blog._id}`)}
                >
                  {/* Image */}
                  <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                    <img
                      className="blog-img"
                      src={getImageUrl(blog.coverImage)}
                      alt={blog.title}
                      onError={handleImageError}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)' }}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 60%)' }} />
                  </div>
                  {/* Content */}
                  <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px', flexGrow: 1, position: 'relative', overflow: 'hidden' }}>
                    <h3 style={{ 
                      fontSize: '1.15rem', 
                      fontWeight: '700', 
                      color: '#1a1a1a', 
                      lineHeight: '1.4', 
                      margin: 0,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      wordBreak: 'break-word'
                    }}>
                      {blog.title}
                    </h3>
                    <p style={{ 
                      fontSize: '0.9rem', 
                      color: 'var(--text-light)', 
                      lineHeight: '1.6', 
                      margin: 0,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      wordBreak: 'break-word'
                    }}>
                      {blog.excerpt}
                    </p>
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


      {/* Subscribe Section */}
      <section style={styles.subscribeSection}>
        <div className="container" style={styles.subscribeContainer}>
          {/* Left: Text + Form */}
          <div style={styles.subscribeContent}>
            <span style={styles.subscribeTagline}>Newsletter</span>
            <h2 style={styles.subscribeTitle}>
              Subscribe now to get useful<br />traveling information
            </h2>
            <p style={styles.subscribeDesc}>
              Get inspiration, trip ideas, exclusive deals and travel tips delivered straight to your inbox.
            </p>
            {newsletterSuccess ? (
              <motion.div
                className="flex-col gap-10 flex-center text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <FiCheckCircle size={44} style={{ color: 'var(--primary)' }} />
                <h3 style={{ fontSize: '1.4rem' }}>You're subscribed!</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>Travel inspiration is on its way to your inbox.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} style={{ width: '100%' }}>
                <div style={styles.subscribeInputPill}>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    style={styles.subscribeInput}
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    required
                  />
                  <button type="submit" style={styles.subscribeBtn}>Subscribe</button>
                </div>
              </form>
            )}
          </div>
          {/* Right: Image */}
          <div style={styles.subscribeImageWrapper}>
            <img
              src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=2070&auto=format&fit=crop"
              alt="Traveler"
              style={styles.subscribeImage}
            />
          </div>
        </div>
      </section>
    </div>
  );
};


const styles = {
  heroSection: {
    display: 'flex',
    alignItems: 'center',
    padding: '80px 20px',
    gap: '40px',
  },
  heroContent: {
    flex: 1,
  },
  tag: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: 'white',
    padding: '8px 20px',
    borderRadius: '50px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
    marginBottom: '20px',
  },
  tagText: {
    fontFamily: '"Great Vibes", cursive',
    fontSize: '1.2rem',
    color: 'var(--primary)',
    fontWeight: '600',
  },
  tagIcon: {
    backgroundColor: 'var(--primary)',
    borderRadius: '50%',
    padding: '2px',
  },
  heroTitle: {
    fontSize: '3.5rem',
    fontWeight: '700',
    lineHeight: '1.2',
    marginBottom: '20px',
  },
  heroDesc: {
    color: 'var(--text-light)',
    fontSize: '1.1rem',
    lineHeight: '1.6',
    maxWidth: '450px',
  },
  heroImages: {
    flex: 1,
    display: 'flex',
    gap: '15px',
    justifyContent: 'flex-end',
  },
  heroImg: {
    width: '180px',
    height: '350px',
    objectFit: 'cover',
    borderRadius: '20px',
    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
  },
  section: {
    padding: '60px 20px',
  },
  sectionHeader: {
    marginBottom: '30px',
  },
  sectionTag: {
    fontFamily: '"Great Vibes", cursive',
    fontSize: '1.8rem',
    color: 'var(--primary)',
    display: 'block',
    marginBottom: '5px',
  },
  sectionTitle: {
    fontSize: '2.5rem',
    fontWeight: '700',
  },
  toursGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  toursRow: {
    display: 'grid',
    gap: '20px',
  },
  experienceSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '60px',
  },
  expContent: {
    flex: 1,
  },
  expDesc: {
    color: 'var(--text-light)',
    fontSize: '1.1rem',
    marginBottom: '30px',
    marginTop: '20px',
  },
  stats: {
    display: 'flex',
    gap: '30px',
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  statBox: {
    backgroundColor: 'var(--primary)',
    color: 'white',
    width: '80px',
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    fontWeight: '700',
    borderRadius: '15px 15px 15px 0',
  },
  statLabel: {
    color: 'var(--text-light)',
    fontSize: '0.9rem',
    fontWeight: '600',
  },
  expImageWrapper: {
    flex: 1,
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
  },
  expImage: {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '20px',
  },
  masonryGrid: {
    columnCount: 4,
    columnGap: '20px',
  },
  masonryItem: {
    marginBottom: '20px',
    breakInside: 'avoid',
  },
  masonryImg: {
    width: '100%',
    borderRadius: '15px',
    display: 'block',
  },
  testimonialsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '30px',
  },
  testimonialCard: {
    padding: '30px',
    backgroundColor: 'white',
    borderRadius: '15px',
    boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
  },
  testimonialText: {
    color: 'var(--text-light)',
    fontStyle: 'italic',
    marginBottom: '20px',
    lineHeight: '1.6',
  },
  testimonialAuthor: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  authorImg: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
  },
  authorName: {
    fontWeight: '700',
    fontSize: '1rem',
  },
  authorRole: {
    color: 'var(--text-light)',
    fontSize: '0.8rem',
  },
  servicesSection: {
    padding: '60px 20px',
    display: 'flex',
    alignItems: 'center',
    gap: '40px',
  },
  servicesHeader: {
    flex: '1',
    maxWidth: '300px',
  },
  servicesTagline: {
    color: 'var(--primary)',
    fontStyle: 'italic',
    fontWeight: '600',
    fontSize: '1.2rem',
    marginBottom: '10px',
    display: 'block',
  },
  servicesTitle: {
    fontSize: '2.5rem',
    fontWeight: '700',
    lineHeight: '1.2',
  },
  servicesCards: {
    flex: '2',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
  },
  serviceCard: {
    padding: '30px 20px',
    backgroundColor: 'white',
    borderRadius: '15px',
    boxShadow: '4px 4px 0px 0px rgba(0,0,0,0.12), 0 10px 30px rgba(0,0,0,0.06)',
    border: '1px solid #e8eaf0',
    borderRight: '2px solid var(--primary)',
    borderBottom: '2px solid var(--primary)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    minHeight: '280px',
  },
  serviceIconWrapper: {
    width: '60px',
    height: '60px',
    backgroundColor: 'var(--primary)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
    color: '#ffffff',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  },
  serviceCardTitle: {
    fontSize: '1.2rem',
    fontWeight: '700',
    marginBottom: '10px',
  },
  serviceCardDesc: {
    color: 'var(--text-light)',
    fontSize: '0.9rem',
    lineHeight: '1.5',
  },
  subscribeSection: {
    backgroundColor: 'var(--bg-blue, #e0f2fe)',
    padding: '70px 0',
    position: 'relative',
    overflow: 'hidden',
  },
  subscribeContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '60px',
  },
  subscribeContent: {
    flex: 1,
    maxWidth: '540px',
  },
  subscribeTagline: {
    display: 'inline-block',
    color: 'var(--primary)',
    fontWeight: '600',
    fontSize: '0.95rem',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    marginBottom: '14px',
  },
  subscribeTitle: {
    fontSize: '2.1rem',
    fontWeight: '800',
    lineHeight: '1.25',
    color: '#000000',
    marginBottom: '16px',
  },
  subscribeDesc: {
    color: 'var(--text-light)',
    fontSize: '0.95rem',
    lineHeight: '1.7',
    marginBottom: '28px',
  },
  subscribeInputPill: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: '50px',
    padding: '6px 6px 6px 22px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.10)',
    border: '1.5px solid #e2e8f0',
    overflow: 'hidden',
  },
  subscribeInput: {
    flex: 1,
    border: 'none',
    outline: 'none',
    fontSize: '0.97rem',
    color: '#333',
    backgroundColor: 'transparent',
    padding: '10px 0',
    minWidth: 0,
  },
  subscribeBtn: {
    flexShrink: 0,
    backgroundColor: 'var(--primary)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '50px',
    padding: '12px 26px',
    fontSize: '0.95rem',
    fontWeight: '700',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'opacity 0.2s ease, transform 0.15s ease',
    letterSpacing: '0.3px',
  },
  subscribeImageWrapper: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    position: 'relative',
    minHeight: '320px',
  },
  subscribeImage: {
    width: '100%',
    maxWidth: '420px',
    height: 'auto',
    objectFit: 'cover',
    borderRadius: '16px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
  }
};


export default Home;
