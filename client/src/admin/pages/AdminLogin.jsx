import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiLock, FiUser, FiArrowLeft, FiAlertTriangle } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import '../../styles/pages/inner.css';

export const AdminLogin = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(null);
  const [showSandbox, setShowSandbox] = useState(false);

  // If already logged in as admin, redirect immediately
  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        sessionStorage.setItem('isAdminSession', 'true');
        navigate('/admin/dashboard', { replace: true });
      } else {
        setFormError('Safety Constraint: Standard traveler accounts cannot access the administrative dashboard.');
      }
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setFormError('Please enter administrative credentials.');
      return;
    }

    setLoading(true);
    setFormError(null);

    const result = await login(email, password);

    if (result.success) {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser && storedUser.role === 'admin') {
        sessionStorage.setItem('isAdminSession', 'true');
        navigate('/admin/dashboard', { replace: true });
      } else {
        setLoading(false);
        setFormError('Safety Constraint: Access denied. Administrator privileges are required to authenticate.');
      }
    } else {
      setLoading(false);
      setFormError(result.message || 'Verification failed. Please review your administrative credentials.');
    }
  };

  const handleQuickFill = () => {
    setEmail('admin@happygroupventures.com');
    setPassword('password123');
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'var(--bg-brand-blue)', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      padding: '20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
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
            top: '10%',
            right: '15%',
            width: '260px',
            height: '260px',
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.12) 0%, rgba(212, 175, 55, 0) 70%)',
            filter: 'blur(65px)',
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
            bottom: '10%',
            left: '15%',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, rgba(212, 175, 55, 0) 70%)',
            filter: 'blur(75px)',
            borderRadius: '50%'
          }}
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        style={{ 
          maxWidth: '430px', 
          width: '100%', 
          padding: '40px', 
          borderRadius: '24px', 
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)', 
          border: '1px solid rgba(212, 175, 55, 0.15)', 
          background: 'rgba(255, 255, 255, 0.015)',
          backdropFilter: 'blur(20px)',
          zIndex: 1,
          position: 'relative'
        }}
      >
        {/* Back Link */}
        <button 
          onClick={() => navigate('/')} 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            border: 'none', 
            background: 'none', 
            color: 'var(--text-muted)', 
            cursor: 'pointer', 
            marginBottom: '28px', 
            fontSize: '0.85rem', 
            fontWeight: '600', 
            padding: '0',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--primary-gold)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; }}
        >
          <FiArrowLeft /> Return to Traveler Portal
        </button>

        <div style={{ marginBottom: '30px' }}>
          <span className="luxury-badge" style={{ fontSize: '0.65rem', marginBottom: '8px', display: 'inline-block' }}>Secure Gate</span>
          <h1 style={{ fontSize: '2.2rem', fontWeight: '700', color: '#ffffff', marginBottom: '8px', fontFamily: 'var(--font-serif)' }}>
            Staff <em>Login</em>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0, lineHeight: '1.4' }}>
            Enter your credentials to access the secure administrative deck.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          
          <div className="auth-form-group" style={{ marginBottom: '0' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Admin Identifier
            </label>
            <div style={{ position: 'relative' }}>
              <FiUser style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary-gold)', zIndex: 1 }} size={18} />
              <input
                type="email"
                placeholder="name@happygroupventures.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '16px 16px 16px 48px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  color: '#ffffff',
                  outline: 'none',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s'
                }}
                onFocus={(e) => { e.target.style.borderColor = 'var(--primary-gold)'; e.target.style.boxShadow = '0 0 15px rgba(212, 175, 55, 0.15)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)'; e.target.style.boxShadow = 'none'; }}
              />
            </div>
          </div>

          <div className="auth-form-group" style={{ marginBottom: '4px' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Security Phrase
            </label>
            <div style={{ position: 'relative' }}>
              <FiLock style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary-gold)', zIndex: 1 }} size={18} />
              <input
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '16px 16px 16px 48px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  color: '#ffffff',
                  outline: 'none',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s'
                }}
                onFocus={(e) => { e.target.style.borderColor = 'var(--primary-gold)'; e.target.style.boxShadow = '0 0 15px rgba(212, 175, 55, 0.15)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)'; e.target.style.boxShadow = 'none'; }}
              />
            </div>
          </div>

          {formError && (
            <div className="auth-error-msg flex" style={{ gap: '8px', alignItems: 'center', color: '#ff6b6b', fontSize: '0.85rem', fontWeight: '500', margin: '0' }}>
              <FiAlertTriangle style={{ flexShrink: 0 }} />
              <span>{formError}</span>
            </div>
          )}

          <button 
            type="submit" 
            className="btn-premium" 
            disabled={loading}
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
              transition: 'all 0.3s',
              marginTop: '4px'
            }}
          >
            {loading ? 'Verifying Credentials...' : 'Unlock Console'}
          </button>

        </form>

        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Standard travelers can sign in via the <span onClick={() => navigate('/login')} style={{ color: 'var(--primary-gold)', cursor: 'pointer', fontWeight: '600', textDecoration: 'underline' }}>Traveler Portal</span>
        </div>

        {/* Sandbox Access Toggle */}
        <div style={{ marginTop: '24px', borderTop: '1px solid rgba(212, 175, 55, 0.15)', paddingTop: '20px', textAlign: 'center' }}>
          <button 
            onClick={() => setShowSandbox(!showSandbox)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--primary-gold)',
              fontSize: '0.75rem',
              cursor: 'pointer',
              textDecoration: 'underline',
              fontWeight: '600',
              letterSpacing: '0.05em',
              textTransform: 'uppercase'
            }}
          >
            {showSandbox ? 'Hide Sandbox Access Keys' : 'Show Sandbox Access Keys'}
          </button>

          {showSandbox && (
            <div style={{ 
              marginTop: '14px', 
              padding: '16px', 
              borderRadius: '14px', 
              border: '1px dashed rgba(212, 175, 55, 0.25)', 
              backgroundColor: 'rgba(212, 175, 55, 0.02)',
              textAlign: 'left'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem', color: 'var(--text-white)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: '600', color: 'var(--text-muted)' }}>Identifier:</span>
                  <code style={{ background: 'rgba(255,255,255,0.05)', padding: '3px 6px', borderRadius: '6px', color: '#ffffff', fontSize: '0.75rem' }}>admin@happygroupventures.com</code>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: '600', color: 'var(--text-muted)' }}>Security Key:</span>
                  <code style={{ background: 'rgba(255,255,255,0.05)', padding: '3px 6px', borderRadius: '6px', color: '#ffffff', fontSize: '0.75rem' }}>password123</code>
                </div>
                <button
                  type="button"
                  onClick={handleQuickFill}
                  style={{
                    marginTop: '10px',
                    width: '100%',
                    padding: '8px',
                    backgroundColor: 'rgba(212, 175, 55, 0.1)',
                    border: '1px solid rgba(212, 175, 55, 0.2)',
                    color: 'var(--primary-gold)',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '700',
                    fontSize: '0.72rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.18)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.1)'; }}
                >
                  Auto-fill Admin Credentials
                </button>
              </div>
            </div>
          )}
        </div>

      </motion.div>
    </div>
  );
};

export default AdminLogin;
