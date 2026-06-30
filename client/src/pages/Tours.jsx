import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';
import API from '../api';
import Skeleton from '../components/common/Skeleton';
import Subscribe from '../components/home/Subscribe';
import TourCard from '../components/home/TourCard';
import { getImageUrl } from '../utils/imageHelper';
import '../styles/pages/inner.css';

export const Tours = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [allTourTitles, setAllTourTitles] = useState([]);

  // Filters State
  const [search, setSearch] = useState('');
  const [days, setDays] = useState('');

  // Active filters for API request execution
  const [activeFilters, setActiveFilters] = useState({
    search: '',
    days: ''
  });

  const fetchTours = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (activeFilters.search) params.search = activeFilters.search;
      if (activeFilters.days) params.days = activeFilters.days;

      const res = await API.get('/tours', { params });
      if (res.data.success) {
        setTours(res.data.data);
      } else {
        setError('Failed to fetch tours package list.');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'An error occurred while loading tours.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchAllTitles = async () => {
      try {
        const res = await API.get('/tours');
        if (res.data.success) {
          const titles = res.data.data.map(tour => tour.name); // fixed to name instead of title if needed
          setAllTourTitles([...new Set(titles)]);
        }
      } catch (err) {
        console.error('Failed to fetch tour titles');
      }
    };
    fetchAllTitles();
  }, []);

  useEffect(() => {
    fetchTours();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFilters]);

  const handleApplyFilters = (e) => {
    e.preventDefault();
    setActiveFilters({
      search,
      days
    });
  };

  const navigate = useNavigate();

  const handleResetFilters = () => {
    setSearch('');
    setDays('');
    setActiveFilters({
      search: '',
      days: ''
    });
  };

  // Helper to render masonry grid
  const renderMasonry = () => {
    const rows = [];
    let i = 0;
    while (i < tours.length) {
      // Large row (2 items)
      if (i < tours.length) {
        const rowItems = tours.slice(i, i + 2);
        rows.push(
          <div key={`large-${i}`} style={styles.largeGrid}>
            {rowItems.map(t => (
              <div key={t._id} onClick={() => navigate(`/tours/${t._id}`)} style={{cursor: 'pointer'}}>
                <TourCard 
                  image={getImageUrl(t.images?.[0])} 
                  title={t.name} 
                  location={t.location?.city || t.location?.country} 
                  height="400px" 
                />
              </div>
            ))}
          </div>
        );
        i += 2;
      }
      // Small row (3 items)
      if (i < tours.length) {
        const rowItems = tours.slice(i, i + 3);
        rows.push(
          <div key={`small-${i}`} style={styles.smallGrid}>
            {rowItems.map(t => (
              <div key={t._id} onClick={() => navigate(`/tours/${t._id}`)} style={{cursor: 'pointer'}}>
                <TourCard 
                  image={getImageUrl(t.images?.[0])} 
                  title={t.name} 
                  location={t.location?.city || t.location?.country} 
                  height="200px" 
                />
              </div>
            ))}
          </div>
        );
        i += 3;
      }
    }
    return rows;
  };

  return (
    <div className="tours-wrapper" style={{ backgroundColor: 'var(--bg-white)', color: 'var(--text-dark)' }}>
      
      {/* New Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroOverlay}></div>
        <h1 style={styles.heroTitle}>All <span style={{color: 'var(--primary)'}}>Tours</span></h1>
      </section>

      {/* Existing Luxury Filter Panel */}
      <section className="container" style={{ marginTop: '-40px', position: 'relative', zIndex: 10 }}>
        <form className="filter-bar" onSubmit={handleApplyFilters} style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
          <div className="filter-group">
            <label>Where to?</label>
            <select value={search} onChange={(e) => setSearch(e.target.value)}>
              <option value="">Any Destination</option>
              {allTourTitles.map((title, idx) => (
                <option key={idx} value={title}>{title}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Duration</label>
            <select value={days} onChange={(e) => setDays(e.target.value)}>
              <option value="">Any Duration</option>
              <option value="3">1-3 Days</option>
              <option value="7">4-7 Days</option>
              <option value="14">8-14 Days</option>
              <option value="21">15+ Days</option>
            </select>
          </div>

          <button type="submit" className="btn-filter-apply" aria-label="Search">
            <FiSearch />
          </button>
        </form>
      </section>

      {/* Main Tours Grid */}
      <section className="container" style={styles.section}>
        <h2 style={styles.sectionTitle}>Our Featured <span style={{color: 'var(--primary)'}}>Tours</span></h2>
        
        {error && (
          <div className="flex-center flex-column tours-error-wrap">
            <h3 className="tours-error-title">Error loading packages</h3>
            <p className="tours-error-desc">{error}</p>
            <button className="btn-premium mt-20" onClick={fetchTours}>Try Again</button>
          </div>
        )}

        {!error && loading && (
          <div style={styles.grid}>
            <div style={styles.largeGrid}>
               <Skeleton type="card" />
               <Skeleton type="card" />
            </div>
            <div style={styles.smallGrid}>
               <Skeleton type="card" />
               <Skeleton type="card" />
               <Skeleton type="card" />
            </div>
          </div>
        )}

        {!error && !loading && tours.length === 0 && (
          <div className="flex-center flex-column tours-empty-wrap" style={{ padding: '40px 0' }}>
            <h2 className="editorial-title tours-empty-title">
              No <em>Tours</em> Found
            </h2>
            <p className="tours-empty-desc">
              We could not find any tours matching your specific parameters.
            </p>
            <button className="btn mt-30" onClick={handleResetFilters}>
              Reset Filters
            </button>
          </div>
        )}

        {!error && !loading && tours.length > 0 && (
          <motion.div 
            style={styles.grid}
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          >
            {renderMasonry()}
          </motion.div>
        )}
      </section>

      {/* Subscribe Section */}
      <Subscribe />
      
    </div>
  );
};

const styles = {
  hero: {
    height: '350px',
    backgroundImage: 'url("https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1965&auto=format&fit=crop")',
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
  section: {
    padding: '80px 20px',
  },
  sectionTitle: {
    fontSize: '2.5rem',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: '40px',
  },
  grid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  largeGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
  },
  smallGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '20px',
  }
};

export default Tours;
