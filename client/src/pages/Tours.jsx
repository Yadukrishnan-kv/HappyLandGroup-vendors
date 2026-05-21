import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiSliders, FiRefreshCw, FiDollarSign, FiUsers, FiMap } from 'react-icons/fi';
import API from '../api';
import Card from '../components/common/Card';
import Skeleton from '../components/common/Skeleton';
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
          const titles = res.data.data.map(tour => tour.title);
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
  }, [activeFilters]);

  const handleApplyFilters = (e) => {
    e.preventDefault();
    setActiveFilters({
      search,
      days
    });
  };

  const handleResetFilters = () => {
    setSearch('');
    setDays('');
    setActiveFilters({
      search: '',
      days: ''
    });
  };

  return (
    <div className="tours-wrapper">
      
      {/* Editorial Header */}
      <section className="tours-hero">
        <div className="container">
          <div className="tours-hero-content-wrap">
            <h1 className="editorial-title tours-hero-title">
              Explore the World's <em>Elite Escapes</em>
            </h1>
            <p className="hero-desc tours-hero-desc">
              From isolated private ocean reserves to peak glacier micro-chalets, curate your private travel layout.
            </p>
          </div>

          {/* Luxury Filter Panel */}
          <form className="filter-bar" onSubmit={handleApplyFilters}>
            
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
        </div>
      </section>

      {/* Main Tours Grid */}
      <section className="section container tours-list-section">
        
        {error && (
          <div className="flex-center flex-column tours-error-wrap">
            <h3 className="tours-error-title">Error loading packages</h3>
            <p className="tours-error-desc">{error}</p>
            <button className="btn-premium mt-20" onClick={fetchTours}>Try Again</button>
          </div>
        )}

        {!error && loading && (
          <div className="tours-grid">
            {Array.from({ length: 6 }).map((_, idx) => (
              <Skeleton key={idx} type="card" />
            ))}
          </div>
        )}

        {!error && !loading && tours.length === 0 && (
          <div className="flex-center flex-column tours-empty-wrap">
            <h2 className="editorial-title tours-empty-title">
              No <em>Vessels</em> Found
            </h2>
            <p className="tours-empty-desc">
              We could not find any luxury travels matching your specific parameters. Try widening your price cap or searching another retreat.
            </p>
            <button className="btn-premium mt-30" onClick={handleResetFilters}>
              Reset Filters
            </button>
          </div>
        )}

        {!error && !loading && tours.length > 0 && (
          <motion.div 
            className="tours-grid" 
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

export default Tours;
