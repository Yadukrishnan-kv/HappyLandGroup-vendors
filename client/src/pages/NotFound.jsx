import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/pages/inner.css';

export const NotFound = () => {
  return (
    <div className="flex-center flex-column" style={{ minHeight: '90vh', padding: '120px 20px', textAlign: 'center', backgroundColor: 'var(--bg)' }}>
      
      <motion.span 
        className="luxury-badge"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Void Coordinates
      </motion.span>

      <motion.h1 
        className="editorial-title mt-20" 
        style={{ fontSize: '7rem', color: 'var(--dark)', fontWeight: '400', lineHeight: '1' }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.8, ease: 'easeOut' }}
      >
        404
      </motion.h1>

      <motion.h2 
        className="editorial-title" 
        style={{ fontSize: '2.5rem', marginTop: '-10px', marginBottom: '20px' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        The Path <em>Vaporized</em>
      </motion.h2>

      <motion.p 
        style={{ color: 'var(--subtext)', maxWidth: '460px', lineHeight: '1.6', fontSize: '0.98rem', marginBottom: '40px' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        This elite destination does not exist, or the coordinates have expired. Return back to our curated catalogue.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <Link to="/" className="btn-premium">
          Return to Harbor
        </Link>
      </motion.div>

    </div>
  );
};

export default NotFound;
