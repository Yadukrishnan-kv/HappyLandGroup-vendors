import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiClock, FiUser } from 'react-icons/fi';
import API from '../api';
import Skeleton from '../components/common/Skeleton';
import { getImageUrl, handleImageError } from '../utils/imageHelper';

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await API.get(`/blogs/${slug}`);
        if (res.data.success) {
          setBlog(res.data.data);
        } else {
          setError('Journal entry not found.');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch journal entry.');
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="inner-page-container container">
        <Skeleton type="box" style={{ height: '400px', marginBottom: '20px' }} />
        <Skeleton type="list" />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="inner-page-container container" style={{ textAlign: 'center', padding: '100px 0' }}>
        <h2 style={{ color: 'var(--text-white)', marginBottom: '20px' }}>{error || 'Not Found'}</h2>
        <button className="btn-premium" onClick={() => navigate('/blogs')}>Return to Journals</button>
      </div>
    );
  }

  return (
    <div className="inner-page-container">
      {/* Hero Banner */}
      <div style={{ position: 'relative', height: '60vh', width: '100%', overflow: 'hidden' }}>
        <img 
          src={getImageUrl(blog.coverImage)} 
          alt={blog.title} 
          onError={handleImageError}
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.6)' }}
        />
        <div className="container" style={{ position: 'absolute', bottom: '0', left: '0', right: '0', padding: '60px 0', zIndex: 2 }}>
          <Link to="/blogs" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--primary-gold)', marginBottom: '20px', fontWeight: 'bold' }}>
            <FiArrowLeft /> Back to Journals
          </Link>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
            {blog.tags && blog.tags.map(tag => (
              <span key={tag} style={{ fontSize: '0.8rem', background: 'var(--primary-gold)', color: 'var(--bg-main)', padding: '4px 12px', borderRadius: '20px', fontWeight: 'bold' }}>
                {tag}
              </span>
            ))}
          </div>
          <h1 className="editorial-title" style={{ fontSize: '3.5rem', color: 'var(--text-white)', marginBottom: '20px', maxWidth: '800px' }}>
            {blog.title}
          </h1>
          <div style={{ display: 'flex', gap: '20px', color: 'var(--text-light)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><FiUser /> {blog.author}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><FiClock /> {new Date(blog.publishedAt).toLocaleDateString()}</span>
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '50%', background: 'linear-gradient(to top, var(--bg-main), transparent)' }}></div>
      </div>

      {/* Content */}
      <div className="container" style={{ padding: '60px 0', maxWidth: '800px', margin: '0 auto' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="blog-content"
          style={{ color: 'var(--text-light)', fontSize: '1.1rem', lineHeight: '1.8' }}
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
    </div>
  );
};

export default BlogDetail;
