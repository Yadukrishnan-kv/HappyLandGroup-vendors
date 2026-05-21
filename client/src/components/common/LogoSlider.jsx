import React from 'react';
import { getImageUrl, handleImageError } from '../../utils/imageHelper';

const LogoSlider = ({ logos }) => {
  if (!logos || logos.length === 0) return null;
  const speed = logos.length * 4; // Standard velocity: 5 logos = 20s, 10 logos = 40s (constant speed of ~62px/sec)

  return (
    <div className="logo-slider-container" style={{ overflow: 'hidden', padding: '40px 0', background: 'var(--bg-secondary)' }}>
      <div className="logo-slider-track" style={{ display: 'flex', width: `calc(250px * ${logos.length * 2})`, animation: `scroll ${speed}s linear infinite` }}>
        {[...logos, ...logos].map((logo, index) => (
          <div className="logo-slide" key={index} style={{ width: '250px', flexShrink: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div 
              style={{
                width: '110px',
                height: '110px',
                borderRadius: '50%',
                overflow: 'hidden',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = 'var(--primary-gold)';
                e.currentTarget.style.transform = 'scale(1.1) translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(212, 175, 55, 0.25)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.transform = 'scale(1) translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.2)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              }}
            >
              <img 
                src={getImageUrl(logo.logo)} 
                alt={logo.name} 
                onError={handleImageError}
                style={{ 
                  width: '70%', 
                  height: '70%', 
                  objectFit: 'contain',
                  transition: 'all 0.5s' 
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-250px * ${logos.length})); }
        }
      `}} />
    </div>
  );
};

export default LogoSlider;
