import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiPhone, FiMapPin, FiSend, 
  FiFacebook, FiInstagram, FiTwitter, FiLinkedin,
  FiCheckCircle, FiAlertCircle 
} from 'react-icons/fi';
import API from '../api';
import '../styles/pages/inner.css'; // Leverage existing inner.css for baseline styles

export const Contact = () => {
  const [contactInfo, setContactInfo] = useState({
    title: 'Contact Our Elite Concierge',
    description: 'Reach out to our premium support team to tailor your dream luxury vacation or corporate excursion.',
    phone: '+971 4 123 4567',
    location: 'Happy Land Premium Building, Office 302, Ajman, UAE',
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com'
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Fetch dynamic contact coordinates
  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        const res = await API.get('/contact');
        if (res.data.success && res.data.data) {
          setContactInfo(res.data.data);
        }
      } catch (err) {
        console.warn('Offline fallback or error loading contact settings.');
      }
    };
    fetchContactDetails();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMsg(null);
    setErrorMsg(null);

    try {
      const res = await API.post('/contact/messages', formData);
      if (res.data.success) {
        setSuccessMsg(res.data.message || 'Your inquiry has been successfully transmitted!');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(err.response?.data?.message || 'Failed to submit inquiry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  

  return (
    <div className="contact-wrapper">
      
      {/* Hero Section */}
      <section className="banner-hero" style={styles.hero}>
        <div style={styles.heroOverlay}></div>
        <h1 className="banner-title" style={styles.heroTitle}>Contact <span style={{color: 'var(--primary)'}}>Us</span></h1>
      </section>

      {/* Main Content Layout */}
      <div className="container contact-container">

        {/* 2-Column Responsive Layout */}
        <div className="contact-grid">
          
          {/* Column 1: Dynamic Contact Cards */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            
            {/* Coordinate: Phone */}
            <div className="glass-panel contact-coordinate-card">
              <div className="contact-icon-wrap">
                <FiPhone size={22} />
              </div>
              <div>
                <h4 className="contact-card-label">Direct Phone Log</h4>
                <a href={`tel:${contactInfo.phone}`} className="contact-card-link contact-link-hover">
                  {contactInfo.phone}
                </a>
              </div>
            </div>

            {/* Coordinate: Location */}
            <div className="glass-panel contact-coordinate-card">
              <div className="contact-icon-wrap">
                <FiMapPin size={22} />
              </div>
              <div>
                <h4 className="contact-card-label">Headquarters Address</h4>
                <p className="contact-card-text">
                  {contactInfo.location}
                </p>
              </div>
            </div>

            {/* Premium Dynamic Map Display Graphic */}
            <div className="glass-panel contact-map-card">
              {/* Dynamic Abstract Blueprint overlay to mimic luxury mapping */}
              <div className="contact-map-overlay" />
              <div className="contact-map-ping ping-animation" />
              
              <span className="admin-flat-badge warning" style={{ width: 'fit-content', marginBottom: '8px' }}>
                Ajman & Dubai Operations
              </span>
              <h4 style={{ margin: '0 0 4px', fontSize: '1.2rem', color: 'var(--text-white)' }}>Elite Concierge Center</h4>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Secure executive planning corridors are open 24/7.</p>
            </div>

            {/* Social Coordinates Block */}
            <div className="glass-panel contact-social-card">
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '500' }}>Social Coordinates:</span>
              <div style={{ display: 'flex', gap: '15px' }}>
                {contactInfo.facebook && (
                  <a href={contactInfo.facebook} target="_blank" rel="noopener noreferrer" className="social-btn-premium" style={{ color: 'var(--text-light)', transition: 'all 0.2s' }}>
                    <FiFacebook size={20} />
                  </a>
                )}
                {contactInfo.instagram && (
                  <a href={contactInfo.instagram} target="_blank" rel="noopener noreferrer" className="social-btn-premium" style={{ color: 'var(--text-light)', transition: 'all 0.2s' }}>
                    <FiInstagram size={20} />
                  </a>
                )}
                {contactInfo.twitter && (
                  <a href={contactInfo.twitter} target="_blank" rel="noopener noreferrer" className="social-btn-premium" style={{ color: 'var(--text-light)', transition: 'all 0.2s' }}>
                    <FiTwitter size={20} />
                  </a>
                )}
                {contactInfo.linkedin && (
                  <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className="social-btn-premium" style={{ color: 'var(--text-light)', transition: 'all 0.2s' }}>
                    <FiLinkedin size={20} />
                  </a>
                )}
              </div>
            </div>

          </motion.div>

          {/* Column 2: Customer Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="glass-panel contact-form-card">
              <h3 className="contact-form-title">
                Establish Connection
              </h3>
              <p className="contact-form-desc">
                Please fill in the secure transmission form below. Our managers will review and respond.
              </p>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                {/* Form Group: Name */}
                <div className="booking-form-group" style={{ marginBottom: '0' }}>
                  <label htmlFor="name" className="contact-card-label">Full Name</label>
                  <input 
                    type="text" 
                    id="name"
                    name="name"
                    className="auth-input" 
                    value={formData.name} 
                    onChange={handleChange}
                    placeholder="e.g. Alen Smith" 
                    required 
                  />
                </div>

                {/* Form Group: Email */}
                <div className="booking-form-group" style={{ marginBottom: '0' }}>
                  <label htmlFor="email" className="contact-card-label">Email Coordinates</label>
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    className="auth-input" 
                    value={formData.email} 
                    onChange={handleChange}
                    placeholder="e.g. smith@luxtravel.com" 
                    required 
                  />
                </div>

                {/* Form Group: Subject */}
                <div className="booking-form-group" style={{ marginBottom: '0' }}>
                  <label htmlFor="subject" className="contact-card-label">Subject Context</label>
                  <input 
                    type="text" 
                    id="subject"
                    name="subject"
                    className="auth-input" 
                    value={formData.subject} 
                    onChange={handleChange}
                    placeholder="e.g. UAE Luxury Tour Package Booking Inquiry" 
                  />
                </div>

                {/* Form Group: Message */}
                <div className="booking-form-group" style={{ marginBottom: '0' }}>
                  <label htmlFor="message" className="contact-card-label">Message Details</label>
                  <textarea 
                    id="message"
                    name="message"
                    className="auth-input contact-textarea" 
                    value={formData.message} 
                    onChange={handleChange}
                    placeholder="Describe your bespoke vacation plans, specific preferences, or questions..."
                    required 
                  />
                </div>

                {/* Feedback Alerts */}
                <AnimatePresence>
                  {errorMsg && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex" 
                      style={{ color: '#ff6b6b', gap: '8px', alignItems: 'center', fontSize: '0.9rem', marginTop: '10px' }}
                    >
                      <FiAlertCircle style={{ flexShrink: 0 }} />
                      <span>{errorMsg}</span>
                    </motion.div>
                  )}

                  {successMsg && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex" 
                      style={{ color: '#2ecc71', gap: '8px', alignItems: 'center', fontSize: '0.9rem', marginTop: '10px' }}
                    >
                      <FiCheckCircle style={{ flexShrink: 0 }} />
                      <span>{successMsg}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Action */}
                <div style={{ marginTop: '10px' }}>
                  <button 
                    type="submit" 
                    className="btn-premium contact-submit-btn" 
                    disabled={submitting}
                  >
                    {submitting ? (
                      'Securing Connection...'
                    ) : (
                      <>
                        <span>Send Secure Message</span>
                        <FiSend />
                      </>
                    )}
                  </button>
                </div>

              </form>
            </div>
          </motion.div>

        </div>

      </div>
    </div>
  );
};


const styles = {
  hero: {
    height: '400px',
    backgroundImage: 'url("https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=2070&q=80")',
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
  }
};

export default Contact;
