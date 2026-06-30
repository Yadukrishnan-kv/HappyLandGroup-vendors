import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../api';
import Skeleton from '../common/Skeleton';
import { 
  FiMapPin, FiActivity, FiUsers, FiSearch, 
  FiGlobe, FiFileText, FiCompass, FiBriefcase, 
  FiSliders, FiHome, FiTrendingUp, FiUserCheck, 
  FiAnchor, FiLayers 
} from 'react-icons/fi';

const Services = () => {
  const navigate = useNavigate();
  // Static service data to replace API call
  const staticServices = [
    { _id: '1', icon: 'FiMapPin', name: 'Tour Packages', shortDescription: 'Curated tours across UAE' },
    { _id: '2', icon: 'FiActivity', name: 'Visa Services', shortDescription: 'Fast and reliable visa processing' },
    { _id: '3', icon: 'FiUsers', name: 'Corporate Travel', shortDescription: 'Tailored B2B travel solutions' },
  ];
  // Use static data as services
  const services = staticServices;
  const loading = false;

  const renderIcon = (iconName) => {
    const iconProps = { size: 24, strokeWidth: 1.5 };
    switch(iconName) {
      case 'FiMapPin': return <FiMapPin {...iconProps} />;
      case 'FiActivity': return <FiActivity {...iconProps} />;
      case 'FiUsers': return <FiUsers {...iconProps} />;
      case 'FiSearch': return <FiSearch {...iconProps} />;
      case 'FiGlobe': return <FiGlobe {...iconProps} />;
      case 'FiFileText': return <FiFileText {...iconProps} />;
      case 'FiBriefcase': return <FiBriefcase {...iconProps} />;
      case 'FiSliders': return <FiSliders {...iconProps} />;
      case 'FiHome': return <FiHome {...iconProps} />;
      case 'FiTrendingUp': return <FiTrendingUp {...iconProps} />;
      case 'FiUserCheck': return <FiUserCheck {...iconProps} />;
      case 'FiAnchor': return <FiAnchor {...iconProps} />;
      case 'FiLayers': return <FiLayers {...iconProps} />;
      default: return <FiCompass {...iconProps} />;
    }
  };

  return (
    <section className="container" style={styles.servicesSection}>
      <div style={styles.servicesHeader}>
        <span style={styles.servicesTagline}>What we serve</span>
        <h2 style={styles.servicesTitle}>We offer our best services</h2>
      </div>
      <div style={styles.servicesCards}>
        {loading ? (
          <>
            <Skeleton type="card" />
            <Skeleton type="card" />
            <Skeleton type="card" />
          </>
        ) : services.length > 0 ? (
          services.map(service => (
            <div key={service._id} style={styles.serviceCard} onClick={() => navigate(`/services/${service._id}`)}>
              <div style={styles.serviceIconWrapper}>
                 {renderIcon(service.icon)}
              </div>
              <h3 style={styles.serviceCardTitle}>{service.name}</h3>
              <p style={styles.serviceCardDesc}>{service.shortDescription}</p>
            </div>
          ))
        ) : (
          <p>No services found.</p>
        )}
      </div>
    </section>
  );
};

const styles = {
  servicesSection: {
    padding: '60px 20px',
    display: 'flex',
    alignItems: 'center',
    gap: '40px',
  },
  servicesHeader: {
    flex: '1',
    maxWidth: '300px',
  },
  servicesTagline: {
    color: 'var(--primary)',
    fontStyle: 'italic',
    fontWeight: '600',
    fontSize: '1.2rem',
    marginBottom: '10px',
    display: 'block',
  },
  servicesTitle: {
    fontSize: '2.5rem',
    fontWeight: '700',
    lineHeight: '1.2',
  },
  servicesCards: {
    flex: '2',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
  },
  serviceCard: {
    padding: '30px 20px',
    backgroundColor: 'white',
    borderRadius: '15px',
    boxShadow: '4px 4px 0px 0px rgba(0,0,0,0.12), 0 10px 30px rgba(0,0,0,0.06)',
    border: '1px solid #e8eaf0',
    borderRight: '2px solid var(--primary)',
    borderBottom: '2px solid var(--primary)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
  serviceIconWrapper: {
    width: '60px',
    height: '60px',
    backgroundColor: 'var(--primary)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
    color: '#ffffff',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  },
  serviceCardTitle: {
    fontSize: '1.2rem',
    fontWeight: '700',
    marginBottom: '10px',
  },
  serviceCardDesc: {
    color: 'var(--text-light)',
    fontSize: '0.9rem',
    lineHeight: '1.5',
  }
};

export default Services;
