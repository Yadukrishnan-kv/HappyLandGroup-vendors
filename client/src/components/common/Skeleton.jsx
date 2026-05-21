import React from 'react';
import '../../styles/globals/skeleton.css';

export const Skeleton = ({ type = 'card' }) => {
  if (type === 'card') {
    return (
      <div className="skeleton-card">
        <div className="skeleton-base skeleton-card-img"></div>
        <div className="skeleton-card-body">
          <div className="skeleton-base skeleton-line short" style={{ height: '12px' }}></div>
          <div className="skeleton-base skeleton-line title"></div>
          <div className="skeleton-base skeleton-line"></div>
          <div className="skeleton-base skeleton-line" style={{ width: '90%' }}></div>
          <div className="skeleton-card-footer">
            <div className="skeleton-base skeleton-footer-left"></div>
            <div className="skeleton-base skeleton-footer-right"></div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'list') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
        <div className="skeleton-base" style={{ height: '80px', borderRadius: '12px', width: '100%' }}></div>
        <div className="skeleton-base" style={{ height: '80px', borderRadius: '12px', width: '100%' }}></div>
        <div className="skeleton-base" style={{ height: '80px', borderRadius: '12px', width: '100%' }}></div>
      </div>
    );
  }

  return <div className="skeleton-base skeleton-line"></div>;
};

export default Skeleton;
