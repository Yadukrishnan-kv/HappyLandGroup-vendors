import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import API from '../api';
import FeatureCard from '../components/common/FeatureCard';

const WhyTravel = () => {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const res = await API.get('/why-travel');
        if (res.data.success) {
          setFeatures(res.data.data);
        }
      } catch (err) {
        console.error('Failed to fetch why travel features', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatures();
  }, []);

  return (
    <div className="inner-page-container">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          <h1 className="editorial-title" style={{ fontSize: '3rem', color: 'var(--text-white)' }}>
            Why Travel <em>With Us</em>
          </h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '700px', margin: '20px auto', fontSize: '1.1rem' }}>
            Discover the hallmarks of true luxury. From private jets to exclusive island retreats, our standards are uncompromising.
          </p>
        </motion.div>

        {!loading && features.length > 0 ? (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
            gap: '30px',
            padding: '20px 0 60px'
          }}>
            {features.map((feature, index) => (
              <FeatureCard key={feature._id} feature={feature} index={index} />
            ))}
          </div>
        ) : !loading ? (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '40px 0' }}>
            Feature content is currently being updated.
          </div>
        ) : (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '40px 0' }}>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default WhyTravel;
