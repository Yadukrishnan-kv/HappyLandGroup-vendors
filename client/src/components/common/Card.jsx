import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMapPin, FiStar } from 'react-icons/fi';
import { getImageUrl, handleImageError } from '../../utils/imageHelper';
import '../../styles/globals/card.css';

export const Card = ({ tour, delay = 0 }) => {
  const { _id, title, country, city, description, images, price, rating, reviewsCount, featured } = tour;

  const handleMouseMove = (e) => {
    const { currentTarget: target, clientX, clientY } = e;
    const rect = target.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    target.style.setProperty('--mouse-x', `${x}px`);
    target.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <motion.div
      className="tour-card spotlight-card"
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link to={`/tours/${_id}`}>
        {/* Card Image */}
        <div className="tour-card-img-wrap">
          <img
            src={getImageUrl(images && images.length > 0 ? images[0] : null)}
            alt={title}
            className="tour-card-img"
            loading="lazy"
            onError={handleImageError}
          />
          <div className="tour-card-overlay"></div>
          <span className="tour-card-badge">{city}</span>
          {featured && <span className="tour-card-featured-badge">Featured</span>}
        </div>

        {/* Card details */}
        <div className="tour-card-content">
          <div className="tour-card-location">
            <FiMapPin size={12} />
            <span>{city}, {country}</span>
          </div>

          <h3 className="tour-card-title">{title}</h3>
          
          <p className="tour-card-desc">{description}</p>

          <div className="tour-card-footer">
            <div className="tour-card-price">
              <span className="tour-card-price-label">Price per person</span>
              <div className="tour-card-price-value">
                ${price} <span>/ person</span>
              </div>
            </div>

            <div className="tour-card-rating">
              <FiStar size={16} fill="var(--primary)" />
              <span>{rating.toFixed(2)} ({reviewsCount})</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default Card;
