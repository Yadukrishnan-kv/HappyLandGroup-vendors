import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';
import API from '../api';
import Card from '../components/common/Card';
import Skeleton from '../components/common/Skeleton';
import '../styles/pages/inner.css';

export const CategoryTours = () => {
  const { categoryName } = useParams();
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Map route param to actual Tour Category (tourType) value and content details
  const getCategoryConfig = (param) => {
    const p = param?.toLowerCase();
    if (p === 'uae-tours') {
      return {
        tourType: 'UAE Tours',
        badge: 'Signature Excursions',
        title: 'Elite UAE Voyages',
        editorialTitle: (
          <>
            Elite <em>UAE</em> Voyages
          </>
        ),
        description: 'Flawless, end-to-end luxury logistics through spectacular desert dunes, royal palaces, and elite Burj Khalifa lounges.'
      };
    } else {
      return {
        tourType: 'International Tour',
        badge: 'Global Curations',
        title: 'Bespoke International Getaways',
        editorialTitle: (
          <>
            Bespoke <em>International</em> Getaways
          </>
        ),
        description: 'Immersive, highly personalized voyages to the world\'s most exquisite and isolated international retreats.'
      };
    }
  };

  const config = getCategoryConfig(categoryName);

  const fetchTours = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Query backend with filtered tourType parameter
      const res = await API.get('/tours', {
        params: {
          tourType: config.tourType,
          limit: 100 // fetch all matching tours in category
        }
      });
      if (res.data.success) {
        setTours(res.data.data);
      } else {
        setError('Failed to fetch category-specific excursion packages.');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'An error occurred while loading tours.');
    } finally {
      setLoading(false);
    }
  }, [config.tourType]);

  useEffect(() => {
    fetchTours();
  }, [fetchTours]);

  return (
    <div className="tours-wrapper">
      
      {/* Category Hero / Editorial Header */}
      <section className="tours-hero" style={{ padding: '140px 0 40px' }}>
        <div className="container">
          
          {/* Back Navigation Link with dynamic horizontial-glide styling */}
          <div style={{ marginBottom: '35px', display: 'flex', justifyContent: 'flex-start' }}>
            <Link 
              to="/" 
              className="back-concierge-link" 
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '8px', 
                color: 'var(--primary-gold)', 
                fontWeight: 600, 
                textDecoration: 'none', 
                background: 'rgba(0, 0, 0, 0.02)', 
                padding: '10px 24px', 
                borderRadius: '40px', 
                border: '1px solid rgba(184, 134, 11, 0.15)', 
                transition: 'all 0.3s' 
              }}
            >
              <FiArrowLeft size={16} /> Return to Voyages
            </Link>
          </div>

          <div style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '30px', marginBottom: '10px' }}>
            <span className="luxury-badge">{config.badge}</span>
            <h1 className="editorial-title mt-10" style={{ fontSize: '3.5rem', margin: '10px 0 0 0' }}>
              {config.editorialTitle}
            </h1>
            <p className="hero-desc" style={{ maxWidth: '650px', margin: '20px 0 0 0', color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.7' }}>
              {config.description}
            </p>
          </div>
        </div>
      </section>

      {/* Main Tours Grid */}
      <section className="section container" style={{ paddingTop: '30px', paddingBottom: '80px' }}>
        
        {error && (
          <div className="flex-center flex-column" style={{ padding: '60px 0' }}>
            <h3 style={{ color: '#ff6b6b', marginBottom: '15px' }}>Error loading packages</h3>
            <p style={{ color: 'var(--subtext)' }}>{error}</p>
            <button className="btn-premium mt-20" onClick={fetchTours}>Try Again</button>
          </div>
        )}

        {!error && loading && (
          <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
            {Array.from({ length: 3 }).map((_, idx) => (
              <Skeleton key={idx} type="card" />
            ))}
          </div>
        )}

        {!error && !loading && tours.length === 0 && (
          <div className="flex-center flex-column" style={{ padding: '80px 0', textAlign: 'center' }}>
            <h2 className="editorial-title" style={{ fontSize: '2.5rem', marginBottom: '15px' }}>
              No <em>Vessels</em> Found
            </h2>
            <p style={{ color: 'var(--subtext)', maxWidth: '450px' }}>
              We could not find any luxury travels matching the selected Category right now.
            </p>
            <Link to="/" className="btn-premium mt-30">
              Return Home
            </Link>
          </div>
        )}

        {!error && !loading && tours.length > 0 && (
          <motion.div 
            className="grid" 
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}
            initial="hidden"
            animate="show"
            variants={{
              show: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            <AnimatePresence mode="popLayout">
              {tours.map((tour, idx) => (
                <Card key={tour._id} tour={tour} delay={idx * 0.05} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

      </section>

    </div>
  );
};

export default CategoryTours;
