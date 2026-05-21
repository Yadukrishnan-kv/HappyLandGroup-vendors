import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import API from '../../api';
import { FiCompass, FiMail, FiPhone, FiMapPin, FiTwitter, FiFacebook, FiInstagram } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { getImageUrl } from '../../utils/imageHelper';
import '../../styles/globals/footer.css';

export const Footer = () => {
  const location = useLocation();
  const { settings } = useAuth();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ loading: false, success: false, error: null });

  // Disable Footer completely on all administrative routes (/admin/*)
  if (location.pathname.toLowerCase().startsWith('/admin')) {
    return null;
  }

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus({ loading: true, success: false, error: null });
    try {
      const res = await API.post('/newsletter/subscribe', { email });
      if (res.data.success) {
        setStatus({ loading: false, success: true, error: null });
        setEmail('');
      }
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Failed to subscribe. Please try again.';
      setStatus({ loading: false, success: false, error: errMsg });
    }
  };

  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-column">
            <div className="footer-logo">
              {settings?.logoUrl ? (
                <img 
                  src={getImageUrl(settings.logoUrl)} 
                  alt="Logo" 
                  style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', marginRight: '12px' }} 
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              ) : (
                <FiCompass size={28} style={{ color: 'var(--primary)', marginRight: '10px' }} />
              )}
              {!settings?.logoUrl && (
                <>
                  {settings?.logoText || 'Happy Land'}<span>{settings?.logoTextSpan || 'Group Ventures'}</span>
                </>
              )}
            </div>
            <p className="footer-desc">
              Experience luxury travel redefined with UAE's premier destination management experts. Providing top-tier corporate, leisure, and custom B2B travel services since 2006.
            </p>
            <div className="footer-socials">
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="footer-social-icon">
                <FiTwitter size={18} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="footer-social-icon">
                <FiFacebook size={18} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="footer-social-icon">
                <FiInstagram size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-column">
            <h3>Explore</h3>
            <ul className="footer-links">
              <li>
                <Link to="/" className="footer-link">Home</Link>
              </li>
              <li>
                <Link to="/about" className="footer-link">About Us</Link>
              </li>
              <li>
                <Link to="/tours" className="footer-link">Destinations</Link>
              </li>
              <li>
                <Link to="/login" className="footer-link">My Account</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="footer-column">
            <h3>Contact Us</h3>
            <div className="footer-contact-item">
              <FiMapPin className="footer-contact-icon" size={16} />
              <span>26th Floor, Amber Gem Tower,<br />Ajman, UAE</span>
            </div>
            <div className="footer-contact-item">
              <FiPhone className="footer-contact-icon" size={16} />
              <span>+971 6 123 4567</span>
            </div>
            <div className="footer-contact-item">
              <FiMail className="footer-contact-icon" size={16} />
              <span>info@happygroupventures.com</span>
            </div>
          </div>

          {/* Newsletter subscription */}
          <div className="footer-column">
            <h3>Newsletter</h3>
            <p className="footer-desc" style={{ marginBottom: '16px' }}>
              Subscribe to unlock seasonal private itineraries and members-only luxury rewards.
            </p>
            <form className="footer-newsletter-form" onSubmit={handleSubscribe}>
              <div className="footer-newsletter-input-wrap">
                <input
                  type="email"
                  className="footer-newsletter-input"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status.loading || status.success}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn-footer-subscribe"
                disabled={status.loading || status.success}
              >
                {status.loading ? 'Subscribing...' : status.success ? 'Subscribed!' : 'Subscribe'}
              </button>
            </form>
            {status.error && (
              <p style={{ color: '#ff6b6b', fontSize: '0.8rem', marginTop: '8px' }}>
                {status.error}
              </p>
            )}
            {status.success && (
              <p style={{ color: 'var(--primary)', fontSize: '0.8rem', marginTop: '8px', fontWeight: '500' }}>
                Welcome to elite luxury travel updates. Check your inbox!
              </p>
            )}
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Happy Land Group Ventures. Crafted for Awwwards-level visual standards.</p>
          <div className="footer-bottom-links">
            <span style={{ cursor: 'pointer' }}>Privacy Policy</span>
            <span style={{ cursor: 'pointer' }}>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
