import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import API from '../api';
import Skeleton from '../components/common/Skeleton';
import { getImageUrl, handleImageError } from '../utils/imageHelper';
import '../styles/pages/inner.css';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await API.get('/blogs');
        if (res.data.success) {
          setBlogs(res.data.data);
        }
      } catch (err) {
        console.error('Failed to fetch blogs', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="inner-page-container">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="page-header"
        >
          <h1 className="editorial-title" style={{ fontSize: '3rem', color: 'var(--text-white)' }}>
            Travel <em>Journals</em>
          </h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '20px auto', fontSize: '1.1rem' }}>
            Immerse yourself in our curated stories and exclusive luxury travel insights from around the world.
          </p>
        </motion.div>

        {loading ? (
          <div className="tours-grid"><Skeleton type="card" count={6} /></div>
        ) : blogs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '100px 0', color: 'var(--text-muted)' }}>
            No journal entries available at the moment.
          </div>
        ) : (
          <div className="tours-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
            {blogs.map((blog, idx) => (
              <motion.div 
                key={blog._id}
                className="glass-panel"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10, boxShadow: 'var(--shadow-gold)', borderColor: 'var(--primary-gold)' }}
                style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', cursor: 'default', transition: 'var(--transition-smooth)' }}
              >
                <div style={{ display: 'block' }}>
                  <div style={{ height: '240px', overflow: 'hidden' }}>
                    <img 
                      src={getImageUrl(blog.coverImage)} 
                      alt={blog.title} 
                      onError={handleImageError}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    />
                  </div>
                  <div style={{ padding: '25px' }}>
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                      {blog.tags && blog.tags.map(tag => (
                        <span key={tag} style={{ fontSize: '0.75rem', background: 'var(--primary-gold)', color: 'var(--bg-main)', padding: '4px 10px', borderRadius: '20px', fontWeight: 'bold' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 style={{ fontSize: '1.3rem', color: 'var(--text-white)', marginBottom: '15px', fontFamily: 'var(--font-serif)' }}>{blog.title}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '20px' }}>
                      {blog.excerpt}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '15px' }}>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>By {blog.author}</span>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{new Date(blog.publishedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
