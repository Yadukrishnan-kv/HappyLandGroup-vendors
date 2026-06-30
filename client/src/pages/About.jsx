import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiTarget, FiEye, FiCheckCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import Subscribe from '../components/home/Subscribe';
import Services from '../components/home/Services';
import '../styles/pages/inner.css';

const About = () => {
  const navigate = useNavigate();

  const points = [
    "UAE Tourist, Resident, and Work Visas",
    "Tailored Corporate & B2B Travel Solutions",
    "Bespoke Excursion & Desert Tour Packages",
    "Premium Hotel & Yacht Accommodations",
    "Serving Globally from Dubai/Ajman Since 2006"
  ];

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

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

  return (
    <div>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroOverlay}></div>
        <h1 style={styles.heroTitle}>About <span style={{color: 'var(--primary)'}}>Us</span></h1>
      </section>

      {/* Info Section (New Layout with Old Text) */}
      <section className="container" style={styles.infoSection}>
        <div style={styles.infoContent}>
          <div style={styles.infoBlock}>
            <h2 style={styles.infoTitle}>Who <span style={{color: 'var(--primary)'}}>We Are?</span></h2>
            <p style={styles.infoDesc}>
              <strong>Happy Land Group Ventures</strong> is a renowned travel agency based in UAE, Dubai, founded in the year 2006. For nearly two decades, we have served as a leading destination management company, offering elite travel and tourism services across both corporate and individual tiers. We specialize in UAE tourist visas, resident visas, work visas, flight arrangements, boutique accommodations, and breathtaking excursions. We take pride in building robust, long-term B2B relationships and crafting highly customized luxury travel experiences.
            </p>
          </div>
          <div style={styles.infoBlock}>
            <h2 style={styles.infoTitle}>Our <span style={{color: 'var(--primary)'}}>Mission</span></h2>
            <p style={styles.infoDesc}>
              Our mission is to offer fast, hassle-free, and one-stop destination management services. We thrive to lead destination management in the UAE by delivering unmatched travel and tourism experiences. Our vision is to provide quality services and build reliable relationships with B2B and B2C clients in order to offer outstanding services in the global travel industry.
            </p>
          </div>
        </div>
        <div style={styles.infoImageWrapper}>
          <img 
            src="https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?q=80&w=2080&auto=format&fit=crop" 
            alt="Travel group" 
            style={styles.infoImage} 
          />
        </div>
      </section>

      {/* Why Choose Us Section (Old layout kept) */}
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

      {/* Services Section */}
      <div style={{ backgroundColor: '#f9fafb', padding: '40px 0' }}>
        <Services />
      </div>

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
              <form onSubmit={handleNewsletterSubmit} style={styles.subscribeForm}>
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
  hero: {
    height: '400px',
    backgroundImage: 'url("https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  heroTitle: {
    fontSize: '4rem',
    fontWeight: '800',
    color: 'white',
    position: 'relative',
    zIndex: 1,
  },
  infoSection: {
    display: 'flex',
    padding: '80px 20px',
    gap: '60px',
    alignItems: 'center',
  },
  infoContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
  },
  infoBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  infoTitle: {
    fontSize: '2.5rem',
    fontWeight: '700',
  },
  infoDesc: {
    color: 'var(--text-light)',
    fontSize: '1.1rem',
    lineHeight: '1.6',
  },
  infoImageWrapper: {
    flex: 1,
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  },
  infoImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
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
  subscribeForm: {
    width: '100%',
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

export default About;
