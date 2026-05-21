import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as Icons from 'react-icons/fi';
import API from '../api';
import { getImageUrl } from '../utils/imageHelper';
import Skeleton from '../components/common/Skeleton';
import '../styles/pages/inner.css';

const PremiumServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServiceDetail = async () => {
      try {
        const res = await API.get(`/premium-services/${id}`);
        if (res.data.success) {
          setService(res.data.data);
        } else {
          setError('Could not retrieve service details.');
        }
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || 'Premium Service detail retrieval failed.');
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetail();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const renderIcon = (iconName) => {
    const IconComponent = Icons[iconName] || Icons.FiGlobe;
    return <IconComponent size={32} className="text-gold animate-glow" />;
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: '120px 20px', minHeight: '80vh' }}>
        <Skeleton type="card" style={{ height: '350px', marginBottom: '30px' }} />
        <Skeleton type="title" />
        <Skeleton type="list" />
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="container text-center" style={{ padding: '150px 20px', minHeight: '80vh' }}>
        <div className="glass-panel" style={{ padding: '40px', maxWidth: '500px', margin: '0 auto', borderRadius: 'var(--radius-lg)' }}>
          <Icons.FiAlertTriangle size={50} style={{ color: '#ff6b6b', marginBottom: '20px' }} />
          <h2 style={{ color: '#fff', marginBottom: '10px' }}>Exquisite Detail Offline</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>{error || 'The requested premium service does not exist in our bespoke inventory.'}</p>
          <button className="btn-premium" onClick={() => navigate('/')}>
            Return to Grand Lobby
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="premium-service-detail-view" style={{ background: '#050b18', minHeight: '100vh', color: '#fff', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background ambient lighting */}
      <div className="ambient-sphere sphere-1" style={{ top: '-10%', left: '10%', opacity: 0.15 }}></div>
      <div className="ambient-sphere sphere-3" style={{ bottom: '10%', right: '5%', opacity: 0.1 }}></div>

      {/* Editorial Hero Banner */}
      <div className="hero-banner-full" style={{ position: 'relative', height: '380px', width: '100%', overflow: 'hidden', marginTop: 'var(--header-height, 90px)' }}>
        <div 
          className="hero-banner-image" 
          style={{ 
            backgroundImage: `url(${getImageUrl(service.image)})`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center', 
            height: '100%', 
            width: '100%'
          }}
        />
      </div>

      {/* Main Editorial Content Container */}
      <div className="container" style={{ marginTop: '30px', paddingBottom: '120px', position: 'relative', zIndex: 5 }}>
        
        {/* Floating Back Navigation Button */}
        <div style={{ marginBottom: '40px' }}>
          <Link to="/" className="back-concierge-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--primary-gold)', fontWeight: 600, textDecoration: 'none', background: 'rgba(255, 255, 255, 0.04)', padding: '10px 24px', borderRadius: '40px', border: '1px solid rgba(212, 175, 55, 0.25)', backdropFilter: 'blur(8px)', transition: 'all 0.3s' }}>
            <Icons.FiArrowLeft size={16} />
            <span>Return to Main Lobby</span>
          </Link>
        </div>
        
        {/* Editorial Header Section (Open, No Box) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ 
            marginBottom: '60px',
            borderBottom: '1px solid rgba(212, 175, 55, 0.15)',
            paddingBottom: '40px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
            <div className="service-icon-wrapper" style={{ width: '55px', height: '55px', borderRadius: '50%', background: 'rgba(212, 175, 55, 0.08)', border: '1px solid rgba(212, 175, 55, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {renderIcon(service.icon)}
            </div>
            <span className="editorial-subtitle" style={{ color: 'var(--primary-gold)', letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: '0.85rem', fontWeight: 600 }}>
              Bespoke VVIP Concierge Services
            </span>
          </div>
          
          <h1 className="editorial-title" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', color: '#fff', fontWeight: 700, fontFamily: 'var(--font-serif)', lineHeight: '1.2', marginBottom: '20px' }}>
            {service.name}
          </h1>

          <p style={{ color: 'var(--text-light)', fontSize: '1.2rem', lineHeight: '1.7', fontStyle: 'italic', maxWidth: '850px' }}>
            "{service.shortDescription}"
          </p>
        </motion.div>

        {/* Dynamic Dual-Column Split Layout */}
        <div className="premium-service-detail-grid">
          
          {/* Main Narrative Column (Open, No Box) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 style={{ fontSize: '1.7rem', color: '#fff', fontFamily: 'var(--font-serif)', marginBottom: '30px', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '15px' }}>
              {service.title || "Elite Service Overview"}
            </h3>
            
            {/* Split description paragraphs */}
            <div style={{ color: 'var(--text-light)', fontSize: '1.1rem', lineHeight: '1.9', letterSpacing: '0.01em', marginBottom: '50px' }}>
              {service.about.split('\n\n').map((paragraph, index) => (
                <p key={index} style={{ marginBottom: '24px' }}>
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Premium Guarantee Badges (Integrated seamlessly) */}
            <div className="premium-guarantee-badges-grid">
              <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                <Icons.FiShield size={26} style={{ color: 'var(--primary-gold)', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <h5 style={{ margin: 0, color: '#fff', fontSize: '1.1rem', fontWeight: 600 }}>Exclusive Security</h5>
                  <p style={{ margin: '6px 0 0', color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>Bespoke protection and absolute security logs.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                <Icons.FiAward size={26} style={{ color: 'var(--primary-gold)', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <h5 style={{ margin: 0, color: '#fff', fontSize: '1.1rem', fontWeight: 600 }}>Ultra-VVIP Concierge</h5>
                  <p style={{ margin: '6px 0 0', color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>Personal butler support and round-the-clock service.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Luxury Sidebar Reservation Widget (Clean Glass Integration) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="premium-service-sidebar-widget"
          >
            <h4 style={{ color: '#fff', fontSize: '1.3rem', marginBottom: '12px', fontWeight: 600, fontFamily: 'var(--font-serif)' }}>
              Tailor Your Experience
            </h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '30px', lineHeight: '1.6' }}>
              Arrange bespoke booking, scheduling and customization details for this specialized service with our elite curators.
            </p>

            <form onSubmit={(e) => { e.preventDefault(); alert("Our luxury travel curation team has been notified. An executive specialist will contact you in under 15 minutes."); }} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="booking-form-group" style={{ marginBottom: '0' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-light)', fontWeight: 500, display: 'block', marginBottom: '8px' }}>Full Name Coordinate</label>
                <input 
                  type="text" 
                  className="auth-input" 
                  placeholder="e.g. John Doe"
                  required 
                  style={{ background: 'rgba(5, 11, 24, 0.5)', border: '1px solid rgba(255, 255, 255, 0.08)', color: '#fff', padding: '12px 16px', borderRadius: '8px' }}
                />
              </div>

              <div className="booking-form-group" style={{ marginBottom: '0' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-light)', fontWeight: 500, display: 'block', marginBottom: '8px' }}>Digital Mail address</label>
                <input 
                  type="email" 
                  className="auth-input" 
                  placeholder="e.g. john@example.com"
                  required 
                  style={{ background: 'rgba(5, 11, 24, 0.5)', border: '1px solid rgba(255, 255, 255, 0.08)', color: '#fff', padding: '12px 16px', borderRadius: '8px' }}
                />
              </div>

              <div className="booking-form-group" style={{ marginBottom: '0' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-light)', fontWeight: 500, display: 'block', marginBottom: '8px' }}>Custom Inquiry Notes</label>
                <textarea 
                  className="auth-input" 
                  placeholder="Describe your bespoke requirements..."
                  style={{ minHeight: '100px', background: 'rgba(5, 11, 24, 0.5)', border: '1px solid rgba(255, 255, 255, 0.08)', color: '#fff', resize: 'vertical', padding: '12px 16px', borderRadius: '8px' }}
                />
              </div>

              <button type="submit" className="btn-premium" style={{ border: 'none', cursor: 'pointer', width: '100%', padding: '16px', borderRadius: '30px', fontWeight: 700, letterSpacing: '0.05em', background: 'var(--primary-gradient)', color: '#fff', fontSize: '0.95rem' }}>
                Initiate VVIP Request
              </button>
            </form>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default PremiumServiceDetail;
