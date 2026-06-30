import React from 'react';
import { MapPin } from 'lucide-react';

const TourCard = ({ image, title, location, height = '300px' }) => {
  return (
    <div style={{...styles.card, height}}>
      <img src={image} alt={title} style={styles.image} />
      <div style={styles.overlay}></div>
      <div style={styles.content}>
        <h3 style={styles.title}>{title}</h3>
        <div style={styles.location}>
          <span>{location}</span>
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    borderRadius: '15px',
    overflow: 'hidden',
    position: 'relative',
    cursor: 'pointer',
    transition: 'transform 0.3s ease',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
    transition: 'transform 0.5s ease',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0))',
  },
  content: {
    position: 'absolute',
    bottom: '20px',
    left: '20px',
    right: '20px',
    textAlign: 'center',
    color: 'white',
  },
  title: {
    fontSize: '2rem',
    fontFamily: '"Great Vibes", cursive', // Script font for cities
    fontWeight: '400',
    marginBottom: '5px',
  },
  location: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '5px',
    fontSize: '1rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '2px',
  }
};

export default TourCard;
