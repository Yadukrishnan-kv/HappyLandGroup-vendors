import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { FaFacebook, FaApple } from 'react-icons/fa';
import { FiAlertCircle } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const Register = () => {
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
            <h1 style={styles.title}>CREATE AN ACCOUNT</h1>
            <p style={styles.subtitle}>
              By creating an account, you agree to our <a href="#" style={styles.linkText}>Privacy policy</a> and <a href="#" style={styles.linkText}>Terms of use</a>.
            </p>
          </div>

          <form style={styles.form} onSubmit={handleSubmit}>
            <div style={styles.row}>
              <input 
                type="text" 
                placeholder="First Name" 
                className="input-field" 
                style={styles.input}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <input 
                type="text" 
                placeholder="Last Name" 
                className="input-field" 
                style={styles.input}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <input 
              type="email" 
              placeholder="Enter Email" 
              className="input-field" 
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input 
              type="password" 
              placeholder="Enter Password (Min 6 chars)" 
              className="input-field" 
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input 
              type="tel" 
              placeholder="Mobile Number (Optional)" 
              className="input-field" 
              style={styles.input}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            
            {formError && (
              <div style={{ color: '#ff6b6b', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <FiAlertCircle /> <span>{formError}</span>
              </div>
            )}

            <button type="submit" className="btn btn-large" style={styles.submitBtn} disabled={loading}>
              {loading ? 'CREATING...' : 'CREATE ACCOUNT'}
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

          <div style={styles.loginPrompt}>
            Already have an account? <Link to="/login" style={styles.loginLink} state={location.state}>Login</Link>
          </div>

          {/* Sandbox Quick Registry Gate */}
          <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f9fafb', borderRadius: '10px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--primary)', display: 'block', textAlign: 'center', marginBottom: '10px' }}>
              Sandbox Quick Registry Gate
            </span>
            <button
              type="button"
              onClick={handleQuickFill}
              style={{ width: '100%', padding: '8px', fontSize: '0.8rem', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '5px', cursor: 'pointer' }}
            >
              Generate Demo Credentials
            </button>
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
  },
  formContainer: {
    width: '100%',
    maxWidth: '450px',
    padding: '20px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  title: {
    fontSize: '2.2rem',
    fontWeight: '700',
    color: 'var(--primary)',
    marginBottom: '10px',
  },
  subtitle: {
    color: 'var(--text-light)',
    fontSize: '0.9rem',
  },
  linkText: {
    color: 'var(--primary)',
    textDecoration: 'none',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  row: {
    display: 'flex',
    gap: '15px',
  },
  input: {
    border: '1px solid #FFD180',
    padding: '12px',
    borderRadius: '8px',
    width: '100%',
    boxSizing: 'border-box'
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
  loginPrompt: {
    textAlign: 'center',
    color: 'var(--text-light)',
  },
  loginLink: {
    color: 'var(--primary)',
    fontWeight: '600',
    textDecoration: 'none',
  }
};

export default Register;
