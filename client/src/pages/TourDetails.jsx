import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion as motionFramer, AnimatePresence } from 'framer-motion';
import { 
  FiMapPin, FiStar, FiCalendar, FiUsers, 
  FiChevronLeft, FiChevronRight, FiCheckCircle, FiAlertCircle 
} from 'react-icons/fi';
import API from '../api';
import { useAuth } from '../context/AuthContext';
import Skeleton from '../components/common/Skeleton';
import { getImageUrl, handleImageError } from '../utils/imageHelper';
import '../styles/pages/inner.css';

export const TourDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [tour, setTour] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Booking Form State
  const [guests, setGuests] = useState(1);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(null);
  const [bookingError, setBookingError] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(false);

  // Review Form State
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(null);
  const [reviewError, setReviewError] = useState(null);
  const [reviewLoading, setReviewLoading] = useState(false);

  // Image Slider State
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const fetchTourDetails = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/tours/${id}`);
      if (res.data.success) {
        setTour(res.data.data);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to fetch tour package details.');
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      setReviewsLoading(true);
      const res = await API.get(`/reviews/tour/${id}`);
      if (res.data.success) {
        setReviews(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setReviewsLoading(false);
    }
  };

  useEffect(() => {
    fetchTourDetails();
    fetchReviews();
  }, [id]);

  const handleNextImage = () => {
    if (!tour?.images) return;
    setActiveImageIdx((prev) => (prev + 1) % tour.images.length);
  };

  const handlePrevImage = () => {
    if (!tour?.images) return;
    setActiveImageIdx((prev) => (prev - 1 + tour.images.length) % tour.images.length);
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login', { state: { from: `/tours/${id}` } });
      return;
    }

    if (!bookingDate) {
      setBookingError('Please choose a preferred departure date.');
      return;
    }

    setBookingLoading(true);
    setBookingError(null);
    setBookingSuccess(null);

    try {
      const res = await API.post('/bookings', {
        tourId: id,
        guests: Number(guests),
        bookingDate
      });

      if (res.data.success) {
        setBookingSuccess('Your elite voyage is officially booked! Check your dashboard.');
        // Clear fields
        setBookingDate('');
        setGuests(1);
      }
    } catch (err) {
      console.error(err);
      setBookingError(err.response?.data?.message || 'Failed to complete booking.');
    } finally {
      setBookingLoading(false);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      setReviewError('Please type a feedback comment.');
      return;
    }

    setReviewLoading(true);
    setReviewError(null);
    setReviewSuccess(null);

    try {
      const res = await API.post('/reviews', {
        tourId: id,
        rating: Number(rating),
        comment
      });

      if (res.data.success) {
        setReviewSuccess('Your review has been published!');
        setComment('');
        setRating(5);
        fetchReviews(); // Refresh review list
        fetchTourDetails(); // Refresh tour aggregate rating
      }
    } catch (err) {
      console.error(err);
      setReviewError(err.response?.data?.message || 'Failed to post review.');
    } finally {
      setReviewLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="tour-details-section container">
        <Skeleton type="list" />
      </div>
    );
  }

  if (error || !tour) {
    return (
      <div className="tour-details-section container flex-center flex-column" style={{ minHeight: '60vh' }}>
        <h2 className="editorial-title" style={{ color: '#ff6b6b' }}>Voyage Not Found</h2>
        <p style={{ color: 'var(--subtext)', marginTop: '10px' }}>{error || 'This luxury travel itinerary does not exist.'}</p>
        <Link to="/tours" className="btn-premium mt-30">Return to Catalogue</Link>
      </div>
    );
  }

  const { title, country, city, description, price, rating: avgRating, reviewsCount, maxPeople, images } = tour;
  const totalPrice = price * guests;

  return (
    <div className="tour-details-wrapper">
      
      {/* Premium Hero Banner */}
      {images && images.length > 0 && (
        <div className="tour-hero-banner">
          <img 
            src={getImageUrl(images[0])} 
            alt={title}
            onError={handleImageError}
          />
          <div className="tour-hero-overlay"></div>
        </div>
      )}

      <section className="tour-details-section container">
        
        {/* Editorial Navigation Back */}
        <div className="tour-back-link-wrap">
          <Link to="/tours" className="back-concierge-link">
            <FiChevronLeft size={16} />
            <span>Return to All Tours</span>
          </Link>
        </div>

        <div className="details-grid">
          
          {/* Main Content Side */}
          <div className="details-content tour-overlap-card">
            
            <div style={{ marginBottom: '35px' }}>
              <span className="editorial-subtitle" style={{ color: 'var(--primary-gold)', letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: '0.82rem', fontWeight: 600, display: 'block', marginBottom: '10px' }}>
                Bespoke Luxury Voyage Package
              </span>
              <h2 className="editorial-title" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', marginBottom: '20px', color: 'var(--text-white)', fontFamily: 'var(--font-serif)', fontWeight: 700, lineHeight: '1.2' }}>{title}</h2>
              <div className="tour-meta-list">
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FiMapPin style={{ color: 'var(--primary-gold)' }} size={16} />
                  <span style={{ color: 'var(--text-light)' }}>{city}, {country}</span>
                </div>
                <span className="tour-meta-dot">•</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FiUsers style={{ color: 'var(--primary-gold)' }} size={16} />
                  <span style={{ color: 'var(--text-light)' }}>Max {maxPeople} guests</span>
                </div>
                <span className="tour-meta-dot">•</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FiCalendar style={{ color: 'var(--primary-gold)' }} size={16} />
                  <span style={{ color: 'var(--text-light)' }}>{tour.duration || '1 Day'}</span>
                </div>
                <span className="tour-meta-dot">•</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FiStar style={{ color: '#f59e0b', fill: '#f59e0b' }} size={16} />
                  <span style={{ color: 'var(--text-white)', fontWeight: '600' }}>{avgRating.toFixed(2)}</span> 
                  <span style={{ color: 'var(--text-muted)' }}>({reviewsCount} reviews)</span>
                </div>
              </div>
            </div>

            {/* Cinematic Custom Image Slider */}
            <div className="details-gallery">
              <AnimatePresence mode="wait">
                <motionFramer.img
                  key={activeImageIdx}
                  src={getImageUrl(images && images.length > 0 ? images[activeImageIdx] : null)}
                  alt={`${title} view ${activeImageIdx + 1}`}
                  className="details-gallery-img"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  onError={handleImageError}
                />
              </AnimatePresence>

              {images.length > 1 && (
                <>
                  <button className="slider-nav-btn prev" onClick={handlePrevImage}>
                    <FiChevronLeft size={24} />
                  </button>
                  <button className="slider-nav-btn next" onClick={handleNextImage}>
                    <FiChevronRight size={24} />
                  </button>
                  
                  {/* Slider Indicator Bullets */}
                  <div className="slider-bullets">
                    {images.map((_, idx) => (
                      <span 
                        key={idx} 
                        className={`bullet ${idx === activeImageIdx ? 'active' : ''}`}
                        onClick={() => setActiveImageIdx(idx)}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>



            <p className="details-description">{description}</p>

            {/* Package Inclusions (Premium Left-Border Callout) */}
            {tour.includes && tour.includes.some(item => item.trim() !== '') && (
              <div className="tour-inclusions-callout">
                <h3 className="editorial-title" style={{ fontSize: '1.6rem', marginBottom: '20px', fontFamily: 'var(--font-serif)', fontWeight: 600, color: 'var(--text-white)' }}>Package <em>Inclusions</em></h3>
                <div className="tour-inclusions-grid">
                  {tour.includes.filter(item => item.trim() !== '').map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', color: 'var(--text-light)', fontWeight: '500' }}>
                      <FiCheckCircle style={{ color: 'var(--primary-gold)', flexShrink: 0 }} size={18} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews Panel */}
            <div className="reviews-container">
              <h3 className="editorial-title" style={{ fontSize: '2rem', marginBottom: '30px' }}>
                Customer <em>Reflections</em>
              </h3>

              {reviewsLoading ? (
                <Skeleton type="list" />
              ) : reviews.length === 0 ? (
                <p style={{ color: 'var(--subtext)', fontStyle: 'italic' }}>
                  No reviews submitted yet. Be the first to share your experience on this bespoke escape!
                </p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {reviews.map((rev) => (
                    <motionFramer.div 
                      key={rev._id} 
                      className="review-item"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="review-header">
                        <div className="review-user-info">
                          <img 
                            src={rev.user?.avatar || `https://api.dicebear.com/7.x/adventurer/svg?seed=${rev.user?.email || 'guest'}`} 
                            alt={rev.user?.firstName || 'Guest'} 
                            className="review-avatar"
                          />
                          <div>
                            <div className="review-user-name">
                              {rev.user ? `${rev.user.firstName} ${rev.user.lastName}` : 'Anonymous Traveler'}
                            </div>
                            <div className="review-date">
                              {new Date(rev.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                            </div>
                          </div>
                        </div>

                        <div className="flex-center" style={{ gap: '4px', color: 'var(--primary)', fontWeight: '600' }}>
                          <FiStar fill="var(--primary)" size={14} />
                          <span>{rev.rating}</span>
                        </div>
                      </div>
                      <p className="review-text">{rev.comment}</p>
                    </motionFramer.div>
                  ))}
                </div>
              )}

              {/* Review Submission Form */}
              <div className="add-review-form">
                <h4 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '10px' }}>Write a Review</h4>
                <p style={{ color: 'var(--subtext)', fontSize: '0.88rem', marginBottom: '20px' }}>
                  Share your genuine feedback on this high-end itinerary.
                </p>

                {user ? (
                  <form onSubmit={handleReviewSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', color: 'var(--subtext)', marginBottom: '8px' }}>
                        Rating Selection
                      </label>
                      <div className="rating-select">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FiStar
                            key={star}
                            className={`rating-star ${star <= rating ? 'active' : ''}`}
                            fill={star <= rating ? 'var(--primary)' : 'transparent'}
                            onClick={() => setRating(star)}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="booking-form-group">
                      <label>Your Feedback Comment</label>
                      <textarea
                        rows="4"
                        placeholder="Detail your elite travel experience..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        style={{
                          padding: '14px 20px',
                          borderRadius: '8px',
                          border: '1px solid var(--border-light)',
                          backgroundColor: 'var(--bg)',
                          fontFamily: 'inherit',
                          fontSize: '0.9rem',
                          resize: 'vertical',
                          width: '100%',
                          minHeight: '100px'
                        }}
                      />
                    </div>

                    {reviewError && (
                      <div className="flex" style={{ color: '#ff6b6b', gap: '8px', alignItems: 'center', margin: '15px 0', fontSize: '0.88rem', fontWeight: '500' }}>
                        <FiAlertCircle />
                        <span>{reviewError}</span>
                      </div>
                    )}

                    {reviewSuccess && (
                      <div className="flex" style={{ color: '#2ecc71', gap: '8px', alignItems: 'center', margin: '15px 0', fontSize: '0.88rem', fontWeight: '500' }}>
                        <FiCheckCircle />
                        <span>{reviewSuccess}</span>
                      </div>
                    )}

                    <button 
                      type="submit" 
                      className="btn-book-now mt-10" 
                      disabled={reviewLoading}
                      style={{ maxWidth: '200px', cursor: 'pointer', border: 'none' }}
                    >
                      {reviewLoading ? 'Publishing...' : 'Submit Review'}
                    </button>
                  </form>
                ) : (
                  <p style={{ color: 'var(--subtext)', fontSize: '0.9rem' }}>
                    Please <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '600' }}>Log In</Link> to write a review.
                  </p>
                )}
              </div>

            </div>

          </div>

          {/* Sticky Booking Widget Side */}
          <div>
            <div className="booking-widget">
              <div className="booking-price-row">
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--subtext)', textTransform: 'uppercase', fontWeight: '600' }}>Price per Person</span>
                  <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--dark)' }}>${price}</div>
                </div>
                <div className="flex-center" style={{ gap: '4px', fontSize: '0.92rem', color: 'var(--dark-soft)', fontWeight: '600', marginBottom: '5px' }}>
                  <FiStar fill="var(--primary)" size={16} style={{ color: 'var(--primary)' }} />
                  <span>{avgRating.toFixed(1)}</span>
                </div>
              </div>

              <h3>Book Your Bespoke Voyage</h3>

              <form onSubmit={handleBooking}>
                <div className="booking-form-group">
                  <label><FiCalendar style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Preferred Date</label>
                  <input
                    type="date"
                    required
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div className="booking-form-group">
                  <label><FiUsers style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Guests Count</label>
                  <input
                    type="number"
                    required
                    min="1"
                    max={maxPeople}
                    value={guests}
                    onChange={(e) => setGuests(Math.max(1, Number(e.target.value)))}
                  />
                </div>

                <div className="booking-total-row">
                  <span>Total Amount</span>
                  <span style={{ color: 'var(--primary)', fontSize: '1.4rem' }}>${totalPrice.toLocaleString()}</span>
                </div>

                {bookingError && (
                  <div className="flex" style={{ color: '#ff6b6b', gap: '8px', alignItems: 'center', marginBottom: '20px', fontSize: '0.88rem', fontWeight: '500' }}>
                    <FiAlertCircle />
                    <span>{bookingError}</span>
                  </div>
                )}

                {bookingSuccess && (
                  <div className="flex" style={{ color: '#2ecc71', gap: '8px', alignItems: 'center', marginBottom: '20px', fontSize: '0.88rem', fontWeight: '500' }}>
                    <FiCheckCircle />
                    <span>{bookingSuccess}</span>
                  </div>
                )}

                <button 
                  type="submit" 
                  className="btn-book-now" 
                  disabled={bookingLoading}
                  style={{ border: 'none', cursor: 'pointer' }}
                >
                  {bookingLoading ? 'Processing...' : user ? 'Confirm Elite Booking' : 'Log In to Reserve'}
                </button>
              </form>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default TourDetails;
