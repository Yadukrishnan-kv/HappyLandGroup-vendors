import React from 'react';

const Subscribe = () => {
  return (
    <section style={styles.section}>
      <div className="container" style={styles.container}>
        <div style={styles.content}>
          <h2 style={styles.title}>Subscribe now to get useful traveling information</h2>
          <div style={styles.inputGroup}>
            <input type="email" placeholder="Enter your email" style={styles.input} />
            <button className="btn" style={styles.btn}>Subscribe</button>
          </div>
          <p style={styles.desc}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati adipisici sunt in, provident facere ipsam?
          </p>
        </div>
        <div style={styles.imageWrapper}>
          <img 
            src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=2070&auto=format&fit=crop" 
            alt="Traveler" 
            style={styles.image}
          />
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: {
    backgroundColor: 'var(--bg-blue)',
    padding: '60px 0',
    position: 'relative',
    overflow: 'hidden',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '40px',
  },
  content: {
    flex: 1,
    maxWidth: '500px',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '30px',
    color: 'var(--text-dark)',
  },
  inputGroup: {
    display: 'flex',
    backgroundColor: 'white',
    padding: '8px',
    borderRadius: '10px',
    marginBottom: '20px',
  },
  input: {
    flex: 1,
    border: 'none',
    padding: '10px 15px',
    outline: 'none',
    fontSize: '1rem',
    backgroundColor: 'transparent',
  },
  btn: {
    borderRadius: '8px',
  },
  desc: {
    color: 'var(--text-light)',
    fontSize: '0.9rem',
    lineHeight: '1.6',
  },
  imageWrapper: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    position: 'relative',
  },
  image: {
    width: '100%',
    maxWidth: '400px',
    height: 'auto',
    objectFit: 'contain',
    maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 80%, rgba(0,0,0,0))',
    WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 80%, rgba(0,0,0,0))',
  }
};

export default Subscribe;
