import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiAlertCircle } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import '../styles/pages/inner.css';

export const Login = () => {
  const { login, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(null);

  // Redirect path after login completes
  const redirectPath = location.state?.from || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setFormError('Please enter your email and password.');
      return;
    }

    setLoading(true);
    setFormError(null);

    const result = await login(email, password);

    if (result.success) {
      const authenticatedUser = JSON.parse(localStorage.getItem('user'));
      if (authenticatedUser && authenticatedUser.role === 'admin') {
        logout();
        setLoading(false);
        setFormError('Access Denied. Administrative accounts must authenticate via the secure Staff Portal.');
        return;
      }
      setLoading(false);
      sessionStorage.removeItem('isAdminSession');
      navigate(redirectPath, { replace: true });
    } else {
      setLoading(false);
      setFormError(result.message);
    }
  };

  return (
    <div className="auth-split-screen" style={{ overflow: 'hidden', position: 'relative' }}>
      
      {/* Left Media Side - Curated Sunset Luxury Maldives */}
      <div 
        className="auth-media-side"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1920&q=80')`,
          position: 'relative'
        }}
      >
        {/* Transparent overlay with subtle gold hint */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(15, 23, 42, 0.8) 100%)',
          zIndex: 1
        }} />

        <div className="auth-media-content" style={{ zIndex: 2 }}>
          <motion.span 
            className="luxury-badge"
            style={{ color: 'var(--primary)', borderColor: 'var(--primary)', marginBottom: '15px', display: 'inline-block' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Elite Gateways
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ fontSize: '2.8rem', fontFamily: 'var(--font-serif)', color: '#fff', lineHeight: '1.2', textShadow: '0 4px 10px rgba(0,0,0,0.3)' }}
          >
            Venture into <em>unparalleled</em> heights.
          </motion.h2>
          <motion.p
            style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1rem', letterSpacing: '0.04em', maxWidth: '440px', lineHeight: '1.6', marginTop: '10px' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Access boutique villas, bespoke yacht arrangements, and custom private transits designed specifically for the global elite.
          </motion.p>
        </div>
      </div>

      {/* Right Form Side - Premium Glassmorphic Console */}
      <div className="auth-form-side" style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg-brand-blue)', zIndex: 1 }}>
        
        {/* Floating Blurred Gold Ambient Spheres */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
          <motion.div
            animate={{
              x: [0, 50, -30, 0],
              y: [0, -60, 40, 0],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              position: 'absolute',
              top: '8%',
              right: '12%',
              width: '260px',
              height: '260px',
              background: 'radial-gradient(circle, rgba(212, 175, 55, 0.12) 0%, rgba(212, 175, 55, 0) 70%)',
              filter: 'blur(60px)',
              borderRadius: '50%'
            }}
          />
          <motion.div
            animate={{
              x: [0, -40, 50, 0],
              y: [0, 50, -50, 0],
            }}
            transition={{
              duration: 28,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              position: 'absolute',
              bottom: '12%',
              left: '8%',
              width: '300px',
              height: '300px',
              background: 'radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, rgba(212, 175, 55, 0) 70%)',
              filter: 'blur(70px)',
              borderRadius: '50%'
            }}
          />
        </div>

        {/* Glassmorphic Form Card Wrapper */}
        <motion.div 
          className="glass-panel" 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          style={{ 
            width: '100%',
            maxWidth: '450px',
            padding: '40px',
            borderRadius: '24px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
            zIndex: 1,
            position: 'relative',
            background: 'rgba(255, 255, 255, 0.015)',
            border: '1px solid rgba(212, 175, 55, 0.15)',
            backdropFilter: 'blur(20px)',
            marginTop: '80px'
          }}
        >
          
          <div className="auth-header" style={{ marginBottom: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span className="luxury-badge" style={{ fontSize: '0.65rem' }}>Private Access</span>
              <Link 
                to="/admin/login" 
                style={{ 
                  border: '1px solid var(--primary-gold)', 
                  borderRadius: '20px', 
                  background: 'rgba(212, 175, 55, 0.05)', 
                  color: 'var(--primary-gold)', 
                  padding: '6px 14px', 
                  fontSize: '0.72rem', 
                  fontWeight: '700', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.05em', 
                  cursor: 'pointer', 
                  textDecoration: 'none',
                  display: 'inline-block',
                  transition: 'all 0.3s' 
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(184, 134, 11, 0.15)'; e.currentTarget.style.boxShadow = '0 0 10px rgba(212, 175, 55, 0.2)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(212, 175, 55, 0.05)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                Staff Login
              </Link>
            </div>
            <h1 className="editorial-title" style={{ fontSize: '2.5rem', color: '#fff', margin: '0 0 8px' }}>
              Welcome <em>Back</em>
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', margin: '0' }}>Enter credentials to unlock your travel ledger.</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            
            {/* Input Group: Email */}
            <div className="auth-form-group" style={{ marginBottom: '0' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px', letterSpacing: '0.05em' }}>
                Email Coordinates
              </label>
              <div style={{ position: 'relative' }}>
                <FiMail style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary-gold)', zIndex: 1 }} size={18} />
                <input
                  type="email"
                  className="auth-input"
                  placeholder="name@happygroupventures.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ 
                    paddingLeft: '48px', 
                    background: 'rgba(255, 255, 255, 0.02)', 
                    border: '1px solid rgba(255, 255, 255, 0.08)', 
                    color: 'var(--text-white)',
                    borderRadius: '12px',
                    width: '100%'
                  }}
                  required
                />
              </div>
            </div>

            {/* Input Group: Password */}
            <div className="auth-form-group" style={{ marginBottom: '5px' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px', letterSpacing: '0.05em' }}>
                Security Code
              </label>
              <div style={{ position: 'relative' }}>
                <FiLock style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary-gold)', zIndex: 1 }} size={18} />
                <input
                  type="password"
                  className="auth-input"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ 
                    paddingLeft: '48px', 
                    background: 'rgba(255, 255, 255, 0.02)', 
                    border: '1px solid rgba(255, 255, 255, 0.08)', 
                    color: 'var(--text-white)',
                    borderRadius: '12px',
                    width: '100%'
                  }}
                  required
                />
              </div>
            </div>

            {formError && (
              <div className="auth-error-msg flex" style={{ gap: '8px', alignItems: 'center', color: '#ff6b6b', fontSize: '0.85rem', fontWeight: '500' }}>
                <FiAlertCircle style={{ flexShrink: 0 }} />
                <span>{formError}</span>
              </div>
            )}

            <button 
              type="submit" 
              className="btn-premium" 
              style={{ 
                width: '100%', 
                padding: '16px', 
                borderRadius: '12px', 
                fontWeight: '700', 
                border: 'none', 
                cursor: 'pointer',
                fontSize: '0.95rem',
                letterSpacing: '0.05em',
                boxShadow: '0 8px 24px rgba(212,175,55,0.15)',
                transition: 'all 0.3s'
              }}
              disabled={loading}
            >
              {loading ? 'Verifying Coordinates...' : 'Request Access'}
            </button>

          </form>

          <div className="auth-switch" style={{ marginTop: '24px', fontSize: '0.88rem', color: 'var(--text-muted)', textAlign: 'center' }}>
            Don't have an account? <span style={{ color: 'var(--primary-gold)', fontWeight: '600', cursor: 'pointer' }} onClick={() => navigate('/register', { state: location.state })}>Register Ledger</span>
          </div>

          {/* Premium Bespoke Sandbox Access Gate */}
          <div style={{ 
            marginTop: '28px', 
            padding: '18px', 
            borderRadius: '16px', 
            border: '1px solid rgba(212, 175, 55, 0.15)', 
            backgroundColor: 'rgba(212, 175, 55, 0.03)',
            backdropFilter: 'blur(10px)'
          }}>
            <span style={{ fontSize: '0.72rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--primary-gold)', display: 'block', marginBottom: '12px', letterSpacing: '0.08em', textAlign: 'center' }}>
              Sandbox Quick Access Gate
            </span>
            <div className="auth-sandbox-btn-group">
              <button
                type="button"
                onClick={() => { setEmail('guest@happygroupventures.com'); setPassword('password123'); }}
                className="social-btn-premium"
                style={{ 
                  flex: 1, 
                  padding: '10px', 
                  fontSize: '0.75rem', 
                  backgroundColor: 'rgba(255,255,255,0.03)', 
                  border: '1px solid rgba(255,255,255,0.08)', 
                  color: 'var(--text-white)',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--primary-gold)'; e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.08)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)'; }}
              >
                Auto-fill Guest
              </button>
              <button
                type="button"
                onClick={() => { navigate('/admin/login'); }}
                className="social-btn-premium"
                style={{ 
                  flex: 1, 
                  padding: '10px', 
                  fontSize: '0.75rem', 
                  backgroundColor: 'rgba(255,255,255,0.03)', 
                  border: '1px solid rgba(255,255,255,0.08)', 
                  color: 'var(--text-white)',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--primary-gold)'; e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.08)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)'; }}
              >
                Go to Staff Portal
              </button>
            </div>
          </div>

        </motion.div>
      </div>

    </div>
  );
};

export default Login;
