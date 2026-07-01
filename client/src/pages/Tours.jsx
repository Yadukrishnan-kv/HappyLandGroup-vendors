import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiMapPin, FiClock, FiArrowRight } from 'react-icons/fi';
import API from '../api';
import Skeleton from '../components/common/Skeleton';
import Card from '../components/common/Card';
import '../styles/pages/inner.css';

export const Tours = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();

  const [allTourTitles, setAllTourTitles] = useState([]);

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [days, setDays] = useState(searchParams.get('days') || '');

  const [activeFilters, setActiveFilters] = useState({
    search: searchParams.get('search') || '',
    days: searchParams.get('days') || '',
    maxPeople: searchParams.get('maxPeople') || '',
    distance: searchParams.get('distance') || ''
  });

  const fetchTours = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (activeFilters.search) params.search = activeFilters.search;
      if (activeFilters.days) params.days = activeFilters.days;
      if (activeFilters.maxPeople) params.maxPeople = activeFilters.maxPeople;
      if (activeFilters.distance) params.distance = activeFilters.distance;

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
          const titles = res.data.data.map(tour => tour.title);
          setAllTourTitles([...new Set(titles)]);
        }
      } catch (err) {
        console.error('Failed to fetch tour titles');
      }
    };
    fetchAllTitles();
  }, []);

  // Initialize filters from URL params on mount
  useEffect(() => {
    const urlSearch = searchParams.get('search') || '';
    const urlDays = searchParams.get('days') || '';
    const urlMaxPeople = searchParams.get('maxPeople') || '';
    const urlDistance = searchParams.get('distance') || '';
    
    setSearch(urlSearch);
    setDays(urlDays);
    setActiveFilters({
      search: urlSearch,
      days: urlDays,
      maxPeople: urlMaxPeople,
      distance: urlDistance
    });
  }, []);

  useEffect(() => {
    fetchTours();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFilters]);

  const handleApplyFilters = (e) => {
    e.preventDefault();
    setActiveFilters({ search, days, maxPeople: activeFilters.maxPeople, distance: activeFilters.distance });
  };

  const navigate = useNavigate();

  const handleResetFilters = () => {
    setSearch('');
    setDays('');
    setActiveFilters({ search: '', days: '', maxPeople: '', distance: '' });
  };

  return (
    <div className="tours-wrapper" style={{ backgroundColor: 'var(--bg-white)', color: 'var(--text-dark)' }}>
      
      <section className="tours-page-hero" style={styles.hero}>
        <div style={styles.heroOverlay}></div>
        <h1 style={styles.heroTitle}>All <span style={{color: 'var(--primary)'}}>Tours</span></h1>
      </section>

      <section className="container tours-filter-wrapper">
        <form className="tours-search-bar" onSubmit={handleApplyFilters}>
          <div className="tours-search-field">
            <div className="tours-search-icon">
              <FiMapPin size={18} />
            </div>
            <div className="tours-search-input-wrap">
              <label className="tours-search-label">Destination</label>
              <select 
                value={search} 
                onChange={(e) => setSearch(e.target.value)}
                className="tours-search-select"
              >
                <option value="">Any Destination</option>
                {allTourTitles.map((title, idx) => (
                  <option key={idx} value={title}>{title}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="tours-search-divider"></div>

          <div className="tours-search-field">
            <div className="tours-search-icon">
              <FiClock size={18} />
            </div>
            <div className="tours-search-input-wrap">
              <label className="tours-search-label">Duration</label>
              <select 
                value={days} 
                onChange={(e) => setDays(e.target.value)}
                className="tours-search-select"
              >
                <option value="">Any Duration</option>
                <option value="3">1-3 Days</option>
                <option value="7">4-7 Days</option>
                <option value="14">8-14 Days</option>
                <option value="21">15+ Days</option>
              </select>
            </div>
          </div>

          <button type="submit" className="tours-search-btn" aria-label="Search Tours">
            <FiSearch size={18} />
            <span className="tours-search-btn-text">Search Tours</span>
            <FiArrowRight size={16} className="tours-search-btn-arrow" />
          </button>
        </form>
      </section>

      <section className="container tours-main-section" style={styles.section}>
        <h2 className="tours-section-title" style={styles.sectionTitle}>Our Featured <span style={{color: 'var(--primary)'}}>Tours</span></h2>
        
        {error && (
          <div className="flex-center flex-column tours-error-wrap">
            <h3 className="tours-error-title">Error loading packages</h3>
            <p className="tours-error-desc">{error}</p>
            <button className="btn-premium mt-20" onClick={fetchTours}>Try Again</button>
          </div>
        )}

        {!error && loading && (
          <div className="tours-grid-container">
            {[1,2,3].map(i => <Skeleton key={i} type="card" />)}
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
            className="tours-grid-container"
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          >
            {tours.map((tour, idx) => (
              <Card key={tour._id} tour={tour} delay={idx * 0.05} />
            ))}
          </motion.div>
        )}
      </section>

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
};

export default Tours;
