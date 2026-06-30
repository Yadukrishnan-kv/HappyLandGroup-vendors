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
    } else if (p === 'international-tours') {
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
    } else if (p === 'pilgrims') {
      return {
        tourType: 'Pilgrims',
        badge: 'Sacred Journeys',
        title: 'Spiritual Pilgrimage Tours',
        editorialTitle: (
          <>
            Spiritual <em>Pilgrimage</em> Tours
          </>
        ),
        description: 'Guided sacred journeys to holy sites and spiritual destinations, with expert escorts and premium hospitality.'
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
      
      {/* Hero Section */}
      <section className="banner-hero" style={{
        ...styles.hero,
        backgroundImage: `url("${categoryName?.toLowerCase() === 'uae-tours' 
          ? 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2070&q=80' 
          : 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=2070&q=80'}")`
      }}>
        <div style={styles.heroOverlay}></div>
        <h1 className="banner-title" style={styles.heroTitle}>
          {categoryName?.toLowerCase() === 'uae-tours' ? 'UAE' : 'International'} <span style={{color: 'var(--primary)'}}>Tours</span>
        </h1>
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
  }
};

export default CategoryTours;
