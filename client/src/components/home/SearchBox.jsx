import React from 'react';
import { MapPin, Route, Users, Search } from 'lucide-react';

const SearchBox = () => {
  return (
    <div style={styles.searchBox}>
      <div style={styles.inputGroup}>
        <div style={styles.iconWrapper}>
          <MapPin size={24} color="var(--primary)" />
        </div>
        <div style={styles.inputWrapper}>
          <label style={styles.label}>Location</label>
          <input type="text" placeholder="Where are you going?" style={styles.input} />
        </div>
      </div>
      
      <div style={styles.divider}></div>
      
      <div style={styles.inputGroup}>
        <div style={styles.iconWrapper}>
          <Route size={24} color="var(--primary)" />
        </div>
        <div style={styles.inputWrapper}>
          <label style={styles.label}>Distance</label>
          <input type="text" placeholder="Distance k/m" style={styles.input} />
        </div>
      </div>

      <div style={styles.divider}></div>
      
      <div style={styles.inputGroup}>
        <div style={styles.iconWrapper}>
          <Users size={24} color="var(--primary)" />
        </div>
        <div style={styles.inputWrapper}>
          <label style={styles.label}>Max People</label>
          <input type="number" placeholder="0" style={styles.input} />
        </div>
      </div>

      <button style={styles.searchBtn}>
        <Search size={24} color="white" />
      </button>
    </div>
  );
};

const styles = {
  searchBox: {
    backgroundColor: 'white',
    borderRadius: '50px',
    padding: '10px 20px',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    width: 'max-content',
    margin: '0 auto',
    transform: 'translateY(-50%)',
    position: 'relative',
    zIndex: 10,
  },
  inputGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '10px',
  },
  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: 'rgba(245, 158, 11, 0.1)', // Light primary color
  },
  inputWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: '0.8rem',
    fontWeight: '600',
    color: 'var(--text-dark)',
  },
  input: {
    border: 'none',
    outline: 'none',
    fontSize: '0.9rem',
    color: 'var(--text-light)',
    width: '150px',
    backgroundColor: 'transparent',
  },
  divider: {
    width: '1px',
    height: '40px',
    backgroundColor: '#e5e7eb',
  },
  searchBtn: {
    backgroundColor: 'var(--primary)',
    border: 'none',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  }
};

export default SearchBox;
