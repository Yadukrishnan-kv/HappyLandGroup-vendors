import React from 'react';
import { motion } from 'framer-motion';
import { getImageUrl, handleImageError } from '../../utils/imageHelper';

const FeatureCard = ({ feature, index }) => {
  return (
    <motion.div 
      className="feature-card glass-panel"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10, boxShadow: '0 10px 25px rgba(212, 175, 55, 0.15)', borderColor: 'rgba(212, 175, 55, 0.65)' }}
      style={{
        padding: '30px',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid rgba(212, 175, 55, 0.2)', /* Always show gold border by default */
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '20px',
        cursor: 'pointer',
        transition: 'var(--transition-smooth)'
      }}
    >
      <div className="feature-icon" style={{
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        background: 'var(--gradient-card)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 'var(--shadow-glass)'
      }}>
        <img 
          src={getImageUrl(feature.icon)} 
          alt={feature.title} 
          onError={handleImageError}
          style={{ width: '40px', height: '40px', objectFit: 'contain' }}
        />
      </div>
      <h3 style={{ color: 'var(--text-white)', fontSize: '1.2rem', fontFamily: 'var(--font-serif)' }}>{feature.title}</h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6', width: '90%', whiteSpace: 'pre-line' }}>{feature.description}</p>
    </motion.div>
  );
};

export default FeatureCard;
