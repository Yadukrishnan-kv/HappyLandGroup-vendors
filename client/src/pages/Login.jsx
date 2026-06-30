import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { FaFacebook, FaApple } from 'react-icons/fa';
import { FiAlertCircle } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const Login = () => {
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
    <div className="container" style={styles.page}>
      <div style={styles.imageCol}>
        <img 
          src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=1974&auto=format&fit=crop" 
          alt="Travel" 
          style={styles.mainImage} 
        />
      </div>
      
      <div style={styles.formCol}>
        <div style={styles.formContainer}>
          <div style={styles.header}>
            <h1 style={styles.title}>Welcome</h1>
            <p style={styles.subtitle}>Login with Email</p>
          </div>

          <form style={styles.form} onSubmit={handleSubmit}>
            <input 
              type="email" 
              placeholder="Enter Email or Username" 
              className="input-field" 
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input 
              type="password" 
              placeholder="Enter Password" 
              className="input-field" 
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            
            {formError && (
              <div style={{ color: '#ff6b6b', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <FiAlertCircle /> <span>{formError}</span>
              </div>
            )}

            <div style={styles.forgotPassword}>
              <a href="#" style={styles.forgotLink}>Forgot your password?</a>
            </div>
            
            <button type="submit" className="btn btn-large" style={styles.submitBtn} disabled={loading}>
              {loading ? 'LOGGING IN...' : 'LOGIN'}
            </button>
          </form>

          <div style={styles.divider}>
            <span style={styles.dividerLine}></span>
            <span style={styles.dividerText}>OR</span>
            <span style={styles.dividerLine}></span>
          </div>

          <div style={styles.socialLogins}>
            <button style={styles.socialBtn}>
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" style={{width: 20, height: 20}} />
            </button>
            <button style={{...styles.socialBtn, color: '#1877F2'}}>
              <FaFacebook size={20} fill="currentColor" />
            </button>
            <button style={styles.socialBtn}>
              <FaApple size={20} fill="currentColor" />
            </button>
          </div>

          <div style={styles.registerPrompt}>
            Don't have account? <Link to="/register" style={styles.registerLink} state={location.state}>Register Now</Link>
          </div>

          {/* Premium Bespoke Sandbox Access Gate */}
          <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f9fafb', borderRadius: '10px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--primary)', display: 'block', textAlign: 'center', marginBottom: '10px' }}>
              Sandbox Quick Access Gate
            </span>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={() => { setEmail('guest@happygroupventures.com'); setPassword('password123'); }}
                style={{ flex: 1, padding: '8px', fontSize: '0.8rem', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '5px', cursor: 'pointer' }}
              >
                Auto-fill Guest
              </button>
              <button
                type="button"
                onClick={() => { navigate('/admin/login'); }}
                style={{ flex: 1, padding: '8px', fontSize: '0.8rem', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '5px', cursor: 'pointer' }}
              >
                Go to Staff Portal
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    display: 'flex',
    padding: '40px 20px',
    gap: '60px',
    minHeight: '80vh',
    backgroundColor: 'white',
    color: 'var(--text-dark)'
  },
  imageCol: {
    flex: 1,
    display: 'flex',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  },
  mainImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  formCol: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  formContainer: {
    width: '100%',
    maxWidth: '400px',
    padding: '20px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  title: {
    fontSize: '3.5rem',
    fontWeight: '700',
    color: 'var(--primary)',
    marginBottom: '10px',
  },
  subtitle: {
    color: 'var(--text-light)',
    fontSize: '1.1rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  input: {
    border: '1px solid #FFD180',
    padding: '12px',
    borderRadius: '8px',
    width: '100%',
    boxSizing: 'border-box'
  },
  forgotPassword: {
    textAlign: 'right',
    marginTop: '-10px',
  },
  forgotLink: {
    color: 'var(--primary)',
    fontSize: '0.9rem',
    textDecoration: 'none'
  },
  submitBtn: {
    width: '100%',
    marginTop: '10px',
    borderRadius: '10px',
    border: 'none',
    padding: '15px',
    cursor: 'pointer'
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    margin: '30px 0',
    gap: '15px',
  },
  dividerLine: {
    flex: 1,
    height: '1px',
    backgroundColor: '#FFD180',
  },
  dividerText: {
    color: 'var(--primary)',
    fontWeight: '600',
  },
  socialLogins: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginBottom: '30px',
  },
  socialBtn: {
    width: '60px',
    height: '45px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #e5e7eb',
    borderRadius: '10px',
    backgroundColor: 'white',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  registerPrompt: {
    textAlign: 'center',
    color: 'var(--text-light)',
  },
  registerLink: {
    color: 'var(--primary)',
    fontWeight: '600',
    textDecoration: 'none'
  }
};

export default Login;
