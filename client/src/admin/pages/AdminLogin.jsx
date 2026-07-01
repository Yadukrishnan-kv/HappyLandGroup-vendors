import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiLock, FiUser, FiArrowLeft, FiAlertTriangle, FiShield } from 'react-icons/fi';
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
      background: '#f8fafc', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      padding: '20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* Subtle Background Pattern */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        <div style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, rgba(212, 175, 55, 0) 70%)',
          borderRadius: '50%'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-20%',
          left: '-10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.05) 0%, rgba(212, 175, 55, 0) 70%)',
          borderRadius: '50%'
        }} />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ 
          maxWidth: '420px', 
          width: '100%', 
          padding: '48px 40px', 
          borderRadius: '20px', 
          boxShadow: '0 4px 40px rgba(0, 0, 0, 0.08)', 
          border: '1px solid #e2e8f0',
          background: '#ffffff',
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
            color: '#64748b', 
            cursor: 'pointer', 
            marginBottom: '32px', 
            fontSize: '0.85rem', 
            fontWeight: '500', 
            padding: '0',
            transition: 'color 0.2s'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--primary)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = '#64748b'; }}
        >
          <FiArrowLeft /> Back to Website
        </button>

        <div style={{ marginBottom: '32px' }}>
          <div style={{ 
            width: '48px', 
            height: '48px', 
            borderRadius: '12px', 
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px'
          }}>
            <FiShield size={24} color="#fff" />
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#0f172a', marginBottom: '8px', fontFamily: 'var(--font-sans)' }}>
            Admin Portal
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0, lineHeight: '1.5' }}>
            Sign in to access the administrative dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <FiUser style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={18} />
              <input
                type="email"
                placeholder="admin@happygroupventures.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '14px 14px 14px 44px',
                  borderRadius: '10px',
                  border: '1px solid #e2e8f0',
                  backgroundColor: '#f8fafc',
                  color: '#0f172a',
                  outline: 'none',
                  fontSize: '0.9rem',
                  transition: 'all 0.2s',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => { e.target.style.borderColor = 'var(--primary)'; e.target.style.backgroundColor = '#fff'; e.target.style.boxShadow = '0 0 0 3px rgba(212, 175, 55, 0.1)'; }}
                onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.backgroundColor = '#f8fafc'; e.target.style.boxShadow = 'none'; }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <FiLock style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={18} />
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '14px 14px 14px 44px',
                  borderRadius: '10px',
                  border: '1px solid #e2e8f0',
                  backgroundColor: '#f8fafc',
                  color: '#0f172a',
                  outline: 'none',
                  fontSize: '0.9rem',
                  transition: 'all 0.2s',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => { e.target.style.borderColor = 'var(--primary)'; e.target.style.backgroundColor = '#fff'; e.target.style.boxShadow = '0 0 0 3px rgba(212, 175, 55, 0.1)'; }}
                onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.backgroundColor = '#f8fafc'; e.target.style.boxShadow = 'none'; }}
              />
            </div>
          </div>

          {formError && (
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', color: '#dc2626', fontSize: '0.85rem', fontWeight: '500', padding: '12px', backgroundColor: '#fef2f2', borderRadius: '8px', border: '1px solid #fecaca' }}>
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
              padding: '14px', 
              borderRadius: '10px', 
              fontWeight: '600', 
              border: 'none', 
              cursor: 'pointer',
              fontSize: '0.9rem',
              transition: 'all 0.2s',
              marginTop: '4px'
            }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

        </form>

        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.85rem', color: '#64748b' }}>
          Regular user? <span onClick={() => navigate('/login')} style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: '600' }}>User Login</span>
        </div>

        {/* Sandbox Access Toggle */}
        <div style={{ marginTop: '24px', borderTop: '1px solid #e2e8f0', paddingTop: '20px', textAlign: 'center' }}>
          <button 
            onClick={() => setShowSandbox(!showSandbox)}
            style={{
              background: 'none',
              border: 'none',
              color: '#94a3b8',
              fontSize: '0.75rem',
              cursor: 'pointer',
              fontWeight: '500',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            {showSandbox ? 'Hide Demo Credentials' : 'Show Demo Credentials'}
          </button>

          {showSandbox && (
            <div style={{ 
              marginTop: '12px', 
              padding: '16px', 
              borderRadius: '10px', 
              border: '1px solid #e2e8f0', 
              backgroundColor: '#f8fafc',
              textAlign: 'left'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.8rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: '500', color: '#64748b' }}>Email:</span>
                  <code style={{ background: '#e2e8f0', padding: '4px 8px', borderRadius: '6px', color: '#334155', fontSize: '0.75rem' }}>admin@happygroupventures.com</code>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: '500', color: '#64748b' }}>Password:</span>
                  <code style={{ background: '#e2e8f0', padding: '4px 8px', borderRadius: '6px', color: '#334155', fontSize: '0.75rem' }}>password123</code>
                </div>
                <button
                  type="button"
                  onClick={handleQuickFill}
                  style={{
                    marginTop: '8px',
                    width: '100%',
                    padding: '10px',
                    backgroundColor: '#fff',
                    border: '1px solid #e2e8f0',
                    color: '#334155',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '0.8rem',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--primary)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.color = '#334155'; }}
                >
                  Auto-fill Credentials
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
