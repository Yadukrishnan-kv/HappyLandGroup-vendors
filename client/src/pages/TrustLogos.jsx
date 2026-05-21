import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import API from '../api';
import LogoSlider from '../components/common/LogoSlider';

const TrustLogos = () => {
  const [logos, setLogos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const res = await API.get('/trust-logos');
        if (res.data.success) {
          setLogos(res.data.data);
        }
      } catch (err) {
        console.error('Failed to fetch trust logos', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLogos();
  }, []);

  return (
    <div className="inner-page-container">
      <div className="container" style={{ textAlign: 'center', marginBottom: '40px' }}>
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="editorial-title" style={{ fontSize: '3rem', color: 'var(--text-white)' }}>
            Our <em>Partners</em>
          </h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '20px auto', fontSize: '1.1rem' }}>
            We collaborate with the world's most elite hospitality and lifestyle brands to curate unparalleled experiences for our guests.
          </p>
        </motion.div>
      </div>

      {!loading && logos.length > 0 ? (
        <div style={{ padding: '60px 0', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <LogoSlider logos={logos} />
        </div>
      ) : !loading ? (
        <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '40px 0' }}>
          No partners displayed currently.
        </div>
      ) : (
        <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '40px 0' }}>Loading...</div>
      )}
    </div>
  );
};

export default TrustLogos;
