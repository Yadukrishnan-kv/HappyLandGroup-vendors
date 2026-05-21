import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiPhone, FiAlertCircle } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import '../styles/pages/inner.css';

export const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(null);

  const redirectPath = location.state?.from || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !password) {
      setFormError('Please fill out all mandatory fields.');
      return;
    }

    if (password.length < 6) {
      setFormError('Password must contain at least 6 characters.');
      return;
    }

    setLoading(true);
    setFormError(null);

    const result = await register(firstName, lastName, email, password, phone);
    setLoading(false);

    if (result.success) {
      navigate(redirectPath, { replace: true });
    } else {
      setFormError(result.message);
    }
  };

  const handleQuickFill = () => {
    const randomNum = Math.floor(100 + Math.random() * 900);
    setFirstName('Alexander');
    setLastName('Mercer');
    setEmail(`traveler.${randomNum}@happygroupventures.com`);
    setPhone('+1 (555) 889-9112');
    setPassword('password123');
  };

  return (
    <div className="auth-split-screen" style={{ overflow: 'hidden', position: 'relative' }}>
      
      {/* Left Media Side - Resort Getaway Cover */}
      <div 
        className="auth-media-side"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1920&q=80')`,
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
            Elite Registry
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ fontSize: '2.8rem', fontFamily: 'var(--font-serif)', color: '#fff', lineHeight: '1.2', textShadow: '0 4px 10px rgba(0,0,0,0.3)' }}
          >
            Crafting the <em>unforgettable</em>.
          </motion.h2>
          <motion.p
            style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1rem', letterSpacing: '0.04em', maxWidth: '440px', lineHeight: '1.6', marginTop: '10px' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Join a select group of world travelers who demand flawless, tailored coordination and premium global itineraries.
          </motion.p>
        </div>
      </div>

      {/* Right Form Side - Premium Glassmorphic Console */}
      <div className="auth-form-side" style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg-brand-blue)', zIndex: 1, padding: '40px' }}>
        
        {/* Floating Blurred Gold Ambient Spheres */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
          <motion.div
            animate={{
              x: [0, 60, -40, 0],
              y: [0, -50, 30, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              position: 'absolute',
              top: '5%',
              right: '10%',
              width: '280px',
              height: '280px',
              background: 'radial-gradient(circle, rgba(212, 175, 55, 0.12) 0%, rgba(212, 175, 55, 0) 70%)',
              filter: 'blur(60px)',
              borderRadius: '50%'
            }}
          />
          <motion.div
            animate={{
              x: [0, -30, 40, 0],
              y: [0, 40, -40, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              position: 'absolute',
              bottom: '10%',
              left: '5%',
              width: '320px',
              height: '320px',
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
            maxWidth: '480px',
            padding: '36px',
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
          
          <div className="auth-header" style={{ marginBottom: '24px' }}>
            <span className="luxury-badge" style={{ fontSize: '0.65rem', marginBottom: '8px', display: 'inline-block' }}>Elite Registry</span>
            <h1 className="editorial-title" style={{ fontSize: '2.3rem', color: '#fff', margin: '0 0 6px' }}>
              Create <em>Account</em>
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '0' }}>Initiate your bespoke booking clearance.</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* First and Last Name Grid */}
            <div className="auth-grid-two-col">
              <div className="auth-form-group" style={{ marginBottom: '0' }}>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: '600', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '6px', letterSpacing: '0.04em' }}>
                  First Name
                </label>
                <div style={{ position: 'relative' }}>
                  <FiUser style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary-gold)', zIndex: 1 }} size={16} />
                  <input
                    type="text"
                    className="auth-input"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    style={{ 
                      paddingLeft: '40px', 
                      background: 'rgba(255, 255, 255, 0.02)', 
                      border: '1px solid rgba(255, 255, 255, 0.08)', 
                      color: 'var(--text-white)',
                      borderRadius: '10px',
                      width: '100%',
                      fontSize: '0.85rem',
                      height: '46px'
                    }}
                    required
                  />
                </div>
              </div>

              <div className="auth-form-group" style={{ marginBottom: '0' }}>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: '600', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '6px', letterSpacing: '0.04em' }}>
                  Last Name
                </label>
                <div style={{ position: 'relative' }}>
                  <FiUser style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary-gold)', zIndex: 1 }} size={16} />
                  <input
                    type="text"
                    className="auth-input"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    style={{ 
                      paddingLeft: '40px', 
                      background: 'rgba(255, 255, 255, 0.02)', 
                      border: '1px solid rgba(255, 255, 255, 0.08)', 
                      color: 'var(--text-white)',
                      borderRadius: '10px',
                      width: '100%',
                      fontSize: '0.85rem',
                      height: '46px'
                    }}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Email Address */}
            <div className="auth-form-group" style={{ marginBottom: '0' }}>
              <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: '600', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '6px', letterSpacing: '0.04em' }}>
                Email Coordinate
              </label>
              <div style={{ position: 'relative' }}>
                <FiMail style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary-gold)', zIndex: 1 }} size={16} />
                <input
                  type="email"
                  className="auth-input"
                  placeholder="john.doe@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ 
                    paddingLeft: '40px', 
                    background: 'rgba(255, 255, 255, 0.02)', 
                    border: '1px solid rgba(255, 255, 255, 0.08)', 
                    color: 'var(--text-white)',
                    borderRadius: '10px',
                    width: '100%',
                    fontSize: '0.85rem',
                    height: '46px'
                  }}
                  required
                />
              </div>
            </div>

            {/* Contact Phone (Optional) */}
            <div className="auth-form-group" style={{ marginBottom: '0' }}>
              <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: '600', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '6px', letterSpacing: '0.04em' }}>
                Contact Phone <span style={{ textTransform: 'lowercase', opacity: 0.6 }}>(optional)</span>
              </label>
              <div style={{ position: 'relative' }}>
                <FiPhone style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary-gold)', zIndex: 1 }} size={16} />
                <input
                  type="text"
                  className="auth-input"
                  placeholder="+1 (555) 019-2834"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{ 
                    paddingLeft: '40px', 
                    background: 'rgba(255, 255, 255, 0.02)', 
                    border: '1px solid rgba(255, 255, 255, 0.08)', 
                    color: 'var(--text-white)',
                    borderRadius: '10px',
                    width: '100%',
                    fontSize: '0.85rem',
                    height: '46px'
                  }}
                />
              </div>
            </div>

            {/* Choose Password */}
            <div className="auth-form-group" style={{ marginBottom: '4px' }}>
              <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: '600', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '6px', letterSpacing: '0.04em' }}>
                Access Passcode
              </label>
              <div style={{ position: 'relative' }}>
                <FiLock style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary-gold)', zIndex: 1 }} size={16} />
                <input
                  type="password"
                  className="auth-input"
                  placeholder="Min 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ 
                    paddingLeft: '40px', 
                    background: 'rgba(255, 255, 255, 0.02)', 
                    border: '1px solid rgba(255, 255, 255, 0.08)', 
                    color: 'var(--text-white)',
                    borderRadius: '10px',
                    width: '100%',
                    fontSize: '0.85rem',
                    height: '46px'
                  }}
                  required
                />
              </div>
            </div>

            {formError && (
              <div className="auth-error-msg flex" style={{ gap: '8px', alignItems: 'center', color: '#ff6b6b', fontSize: '0.82rem', fontWeight: '500', margin: '0' }}>
                <FiAlertCircle style={{ flexShrink: 0 }} />
                <span>{formError}</span>
              </div>
            )}

            <button 
              type="submit" 
              className="btn-premium" 
              style={{ 
                width: '100%', 
                padding: '14px', 
                borderRadius: '12px', 
                fontWeight: '700', 
                border: 'none', 
                cursor: 'pointer',
                fontSize: '0.92rem',
                letterSpacing: '0.05em',
                boxShadow: '0 8px 24px rgba(212,175,55,0.15)',
                transition: 'all 0.3s',
                marginTop: '4px'
              }}
              disabled={loading}
            >
              {loading ? 'Creating Passport...' : 'Register Profile'}
            </button>

          </form>

          <div className="auth-switch" style={{ marginTop: '20px', fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center' }}>
            Already have an account? <span style={{ color: 'var(--primary-gold)', fontWeight: '600', cursor: 'pointer' }} onClick={() => navigate('/login', { state: location.state })}>Sign In Here</span>
          </div>

          {/* Premium Sandbox Quick Registry Panel */}
          <div style={{ 
            marginTop: '20px', 
            padding: '14px', 
            borderRadius: '14px', 
            border: '1px solid rgba(212, 175, 55, 0.15)', 
            backgroundColor: 'rgba(212, 175, 55, 0.02)',
            backdropFilter: 'blur(10px)'
          }}>
            <span style={{ fontSize: '0.68rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--primary-gold)', display: 'block', marginBottom: '8px', letterSpacing: '0.08em', textAlign: 'center' }}>
              Sandbox Quick Registry Gate
            </span>
            <button
              type="button"
              onClick={handleQuickFill}
              className="social-btn-premium"
              style={{ 
                width: '100%',
                padding: '8px 12px', 
                fontSize: '0.72rem', 
                backgroundColor: 'rgba(255,255,255,0.03)', 
                border: '1px solid rgba(255,255,255,0.08)', 
                color: 'var(--text-white)',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--primary-gold)'; e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.08)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)'; }}
            >
              Generate Demo Credentials
            </button>
          </div>

        </motion.div>
      </div>

    </div>
  );
};

export default Register;
