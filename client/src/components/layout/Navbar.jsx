import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useMagnetic } from '../../hooks/useMagnetic';
import { FiCompass, FiLogOut } from 'react-icons/fi';
import { getImageUrl } from '../../utils/imageHelper';
import '../../styles/globals/navbar.css';

export const Navbar = () => {
  const { user, logout, settings } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Magnetic ref for CTA button
  const registerBtnRef = useMagnetic(0.3);

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Disable Navbar completely on all administrative routes (/admin/*)
  if (location.pathname.toLowerCase().startsWith('/admin')) {
    return null;
  }

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'UAE Tours', path: '/tours/category/uae-tours' },
    { name: 'International Tours', path: '/tours/category/international-tours' },
    { name: 'Contact Us', path: '/contact' }
  ];

  return (
    <>
      <header className={`navbar-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            {settings?.logoUrl ? (
              <img 
                src={getImageUrl(settings.logoUrl)} 
                alt="Logo" 
                style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', marginRight: '12px' }} 
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            ) : (
              <FiCompass size={24} style={{ color: 'var(--primary)', marginRight: '8px' }} />
            )}
            {!settings?.logoUrl && (
              <>
                {settings?.logoText || 'Happy Land'}<span>{settings?.logoTextSpan || 'Group'}</span>
              </>
            )}
          </Link>

          {/* Desktop Navigation Links */}
          <nav>
            <ul className="navbar-links">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`navbar-link ${location.pathname === item.path ? 'active' : ''}`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Auth Action Buttons */}
          <div className="navbar-actions">
            {user ? (
              <>
                <Link to={user.role === 'admin' && sessionStorage.getItem('isAdminSession') === 'true' ? '/admin/dashboard' : '/dashboard'} className="nav-user-capsule">
                  <img src={user.avatar} alt="Avatar" className="nav-user-avatar" />
                  <span className="nav-user-name">Hi, {user.firstName}</span>
                </Link>
                <button onClick={handleLogout} className="btn-nav-logout" title="Sign Out">
                  <FiLogOut size={16} />
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-nav-login">
                  Sign In
                </Link>
                <div className="magnetic-wrap" ref={registerBtnRef}>
                  <Link to="/register" className="btn-nav-register">
                    Register
                  </Link>
                </div>
              </>
            )}
          </div>

          {/* Mobile Hamburg Toggle Button */}
          <div
            className={`mobile-hamburger ${mobileOpen ? 'open' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-drawer open"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 120 }}
          >
            <ul className="mobile-drawer-links">
              {menuItems.map((item, idx) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * idx, ease: 'easeOut' }}
                >
                  <Link
                    to={item.path}
                    className={`mobile-drawer-link ${location.pathname === item.path ? 'active' : ''}`}
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <div className="mobile-drawer-actions">
              {user ? (
                <>
                  <Link to={user.role === 'admin' && sessionStorage.getItem('isAdminSession') === 'true' ? '/admin/dashboard' : '/dashboard'} className="nav-user-capsule" style={{ width: 'fit-content' }}>
                    <img src={user.avatar} alt="Avatar" className="nav-user-avatar" />
                    <span className="nav-user-name" style={{ fontSize: '1rem' }}>Dashboard ({user.firstName})</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="btn-premium mt-10"
                    style={{ background: 'var(--dark)', color: 'var(--white)', cursor: 'pointer' }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn-nav-login" style={{ textAlign: 'center', fontSize: '1.2rem', padding: '15px' }}>
                    Sign In
                  </Link>
                  <Link to="/register" className="btn-premium text-center">
                    Register Now
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
