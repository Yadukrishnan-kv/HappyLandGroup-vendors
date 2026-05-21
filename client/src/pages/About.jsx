import React from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiTarget, FiEye } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { handleImageError } from '../utils/imageHelper';
import '../styles/pages/inner.css';

export const About = () => {
  const navigate = useNavigate();

  const points = [
    "UAE Tourist, Resident, and Work Visas",
    "Tailored Corporate & B2B Travel Solutions",
    "Bespoke Excursion & Desert Tour Packages",
    "Premium Hotel & Yacht Accommodations",
    "Serving Globally from Dubai/Ajman Since 2006"
  ];

  return (
    <div className="about-wrapper">
      
      {/* Hero Header */}
      <section 
        className="about-hero"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1920&q=80')` }}
      >
        <div className="about-hero-overlay"></div>
        <div className="about-hero-content">
          <motion.span 
            className="luxury-badge about-hero-badge"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Established 2006
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            Happy Land Group
          </motion.h1>
          <motion.p
            className="about-hero-desc"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Leading Destination Management Services & Luxury Travel in the UAE
          </motion.p>
        </div>
      </section>

      {/* About Us Narrative */}
      <section className="section container">
        <div className="about-grid">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="about-img-wrap"
          >
            <img 
              src="https://images.unsplash.com/photo-1582672060674-bc2bd808a83a?auto=format&fit=crop&w=800&q=80" 
              alt="Dubai skyline luxury view" 
              onError={handleImageError}
            />
          </motion.div>

          <div>
            <span className="luxury-badge">Who We Are</span>
            <h2 className="editorial-title mt-20 mb-20 about-section-title">
              Over a decade of <em>outstanding travel services</em>
            </h2>
            <p className="hero-desc about-paragraph mb-20">
              <strong>Happy Land Group Ventures</strong> is a renowned travel agency based in UAE, Dubai, founded in the year 2006. For nearly two decades, we have served as a leading destination management company, offering elite travel and tourism services across both corporate and individual tiers.
            </p>
            <p className="hero-desc about-paragraph mb-30">
              We specialize in UAE tourist visas, resident visas, work visas, flight arrangements, boutique accommodations, and breathtaking excursions. We take pride in building robust, long-term B2B relationships and crafting highly customized luxury travel experiences.
            </p>
            <button className="btn-premium" onClick={() => navigate('/tours')}>
              Explore UAE Excursions
            </button>
          </div>

        </div>
      </section>

      {/* Mission & Vision Split Grid */}
      <section className="section" style={{ backgroundColor: 'var(--bg-soft)' }}>
        <div className="container">
          <div className="about-grid about-choose-grid">
            
            {/* Left Column: List and Achievements */}
            <div className="flex-col about-col-content">
              <span className="luxury-badge">Why Choose Us</span>
              <h2 className="editorial-title mt-20 mb-20 about-section-subtitle">
                Dedicated to <em>flawless execution</em>
              </h2>
              <p className="hero-desc about-paragraph mb-30">
                Whether managing complex corporate visa services, multi-city group operations, or curating high-end bespoke holiday itineraries, our expert Ajman-based operations ensure seamless reliability.
              </p>
              
              <ul className="about-list">
                {points.map((pt, idx) => (
                  <motion.li 
                    key={idx}
                    className="about-list-item"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                  >
                    <div className="about-list-icon">
                      <FiCheck size={14} />
                    </div>
                    {pt}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Right Column: Mission and Vision Cards */}
            <div className="flex-col about-cards-col">
              {/* Mission Card */}
              <motion.div 
                className="about-glass-card"
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="about-card-header">
                  <div className="about-card-icon">
                    <FiTarget size={22} />
                  </div>
                  <h3 className="about-card-title">Our Mission</h3>
                </div>
                <p className="about-card-desc">
                  Our mission is to offer fast, hassle-free, and one-stop destination management services. We thrive to lead destination management in the UAE by delivering unmatched travel and tourism experiences.
                </p>
              </motion.div>

              {/* Vision Card */}
              <motion.div 
                className="about-glass-card"
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="about-card-header">
                  <div className="about-card-icon">
                    <FiEye size={22} />
                  </div>
                  <h3 className="about-card-title">Our Vision</h3>
                </div>
                <p className="about-card-desc">
                  Our vision is to provide quality services and build reliable relationships with B2B and B2C clients in order to offer outstanding services in the global travel industry.
                </p>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
