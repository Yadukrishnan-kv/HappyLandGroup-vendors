import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiUser, FiCalendar, FiCompass, FiCreditCard, 
  FiLogOut, FiCheckCircle, FiAlertCircle, FiSettings, FiImage
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import API from '../api';
import Skeleton from '../components/common/Skeleton';
import { getImageUrl, handleImageError } from '../utils/imageHelper';
import '../styles/pages/inner.css';

const PREDEFINED_AVATARS = [
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Aria",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Jack",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Sophia",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Mason",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Olivia",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Elena"
];

export const Dashboard = () => {
  const { user, logout, updateProfile, loading } = useAuth();
  const navigate = useNavigate();

  // Safeguard: Redirect standard admins to `/admin/dashboard` immediately
  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate('/login', { replace: true });
        return;
      }
      if (user.role === 'admin' && sessionStorage.getItem('isAdminSession') === 'true') {
        navigate('/admin/dashboard', { replace: true });
      }
    }
  }, [user, loading, navigate]);

  const handleMouseMove = (e) => {
    const { currentTarget: target, clientX, clientY } = e;
    const rect = target.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    target.style.setProperty('--mouse-x', `${x}px`);
    target.style.setProperty('--mouse-y', `${y}px`);
  };

  // States
  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' / 'profile'
  const [profileSuccess, setProfileSuccess] = useState(null);
  const [profileError, setProfileError] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);

  // Edit Profile States
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [password, setPassword] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatar || PREDEFINED_AVATARS[0]);

  // Traveler Booking Lists
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [bookingsError, setBookingsError] = useState(null);

  useEffect(() => {
    if (user && (user.role !== 'admin' || sessionStorage.getItem('isAdminSession') !== 'true')) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setPhone(user.phone || '');
      setSelectedAvatar(user.avatar || PREDEFINED_AVATARS[0]);
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    setLoadingBookings(true);
    setBookingsError(null);
    try {
      const res = await API.get('/bookings/my-bookings');
      if (res.data.success) {
        const sorted = res.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setBookings(sorted);
      }
    } catch (err) {
      console.error(err);
      setBookingsError(err.response?.data?.message || 'Failed to retrieve active bookings.');
    } finally {
      setLoadingBookings(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this bespoke voyage reservation?")) {
      return;
    }
    try {
      const res = await API.put(`/bookings/${bookingId}/cancel`);
      if (res.data.success) {
        alert("Booking cancelled successfully.");
        fetchBookings();
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to cancel booking.");
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    setProfileError(null);
    setProfileSuccess(null);

    try {
      const payload = {
        firstName,
        lastName,
        phone,
        avatar: selectedAvatar
      };
      if (password) {
        payload.password = password;
      }

      const res = await updateProfile(payload);
      if (res.success) {
        setProfileSuccess('Bespoke traveler credentials successfully updated!');
        setPassword('');
      } else {
        setProfileError(res.message);
      }
    } catch (err) {
      console.error(err);
      setProfileError('Failed to update traveler settings profile.');
    } finally {
      setProfileLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading || !user || (user.role === 'admin' && sessionStorage.getItem('isAdminSession') === 'true')) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px', background: 'var(--bg-soft)' }}>
        <Skeleton type="card" style={{ width: '300px', height: '200px' }} />
        <p style={{ fontStyle: 'italic', color: 'var(--subtext)' }}>Redirecting to your dashboard console...</p>
      </div>
    );
  }

  // Compute metrics
  const travelerConfirmedBookings = bookings.filter(b => b.status === 'confirmed');
  const travelerTotalSpent = travelerConfirmedBookings.reduce((sum, b) => sum + b.totalPrice, 0);
  const travelerActiveCount = travelerConfirmedBookings.length;
  const travelerCancelledCount = bookings.filter(b => b.status === 'cancelled').length;

  return (
    <div className="dashboard-section" style={{ background: 'var(--bg-soft)', paddingTop: '140px' }}>
      <div className="container">
        <div className="dashboard-grid">
          
          {/* Sidebar Navigation */}
          <aside className="dashboard-sidebar">
            <div className="dashboard-user-profile">
              <div className="dashboard-avatar-container" style={{ border: '2px solid var(--primary)' }}>
                <img 
                  src={selectedAvatar} 
                  alt={`${firstName} avatar`} 
                  onError={(e) => { e.target.src = PREDEFINED_AVATARS[0]; }}
                />
              </div>
              <h3 className="dashboard-user-name">{firstName} {lastName}</h3>
              <p className="dashboard-user-email">{user.email}</p>
            </div>

            <ul className="dashboard-menu">
              <li 
                className={`dashboard-menu-item ${activeTab === 'bookings' ? 'active' : ''}`}
                onClick={() => setActiveTab('bookings')}
              >
                <FiCalendar />
                <span>My Bookings</span>
              </li>
              <li 
                className={`dashboard-menu-item ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                <FiSettings />
                <span>Edit Profile</span>
              </li>

              <li 
                className="dashboard-menu-item" 
                onClick={handleLogout}
                style={{ marginTop: '20px', color: '#ff6b6b', borderTop: '1px solid var(--border-light)', paddingTop: '20px', borderRadius: '0' }}
              >
                <FiLogOut />
                <span>Sign Out</span>
              </li>
            </ul>
          </aside>

          {/* Main Content Area */}
          <main className="dashboard-main-content">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                style={{ willChange: 'opacity, transform' }}
              >
                
                {/* 1. TRAVELER BOOKINGS TAB */}
                {activeTab === 'bookings' && (
                  <div>
                    <h2>Traveler Dashboard</h2>
                    
                    <div className="dashboard-stats-grid">
                      <div className="stat-card spotlight-card" onMouseMove={handleMouseMove}>
                        <div className="stat-icon"><FiCompass /></div>
                        <div>
                          <div className="stat-num">{travelerActiveCount}</div>
                          <div className="stat-title">Voyages Reserved</div>
                        </div>
                      </div>

                      <div className="stat-card spotlight-card" onMouseMove={handleMouseMove}>
                        <div className="stat-icon"><FiCreditCard /></div>
                        <div>
                          <div className="stat-num">${travelerTotalSpent.toLocaleString()}</div>
                          <div className="stat-title">Invested Amount</div>
                        </div>
                      </div>

                      <div className="stat-card spotlight-card" onMouseMove={handleMouseMove}>
                        <div className="stat-icon" style={{ backgroundColor: 'rgba(231,76,60,0.1)', color: '#e74c3c' }}><FiAlertCircle /></div>
                        <div>
                          <div className="stat-num">{travelerCancelledCount}</div>
                          <div className="stat-title">Cancelled</div>
                        </div>
                      </div>
                    </div>

                    <h3 className="editorial-title mb-20" style={{ fontSize: '1.8rem' }}>Reservations <em>Ledger</em></h3>

                    {loadingBookings ? (
                      <Skeleton type="list" />
                    ) : bookingsError ? (
                      <div className="flex" style={{ color: '#ff6b6b', gap: '8px', alignItems: 'center' }}>
                        <FiAlertCircle />
                        <span>{bookingsError}</span>
                      </div>
                    ) : bookings.length === 0 ? (
                      <div style={{ padding: '40px 0', textAlign: 'center' }}>
                        <p style={{ color: 'var(--subtext)', fontStyle: 'italic', marginBottom: '20px' }}>
                          You have not booked any luxury travel packages yet.
                        </p>
                        <button className="btn-premium" onClick={() => navigate('/tours')}>
                          Browse Luxury Catalog
                        </button>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {bookings.map((booking) => {
                          const tourInfo = booking.tour || {};
                          return (
                            <div key={booking._id} className="booking-row">
                              <div className="booking-row-info">
                                <img 
                                  src={getImageUrl(tourInfo.images && tourInfo.images.length > 0 ? tourInfo.images[0] : null)} 
                                  alt={tourInfo.title || 'Tour image'} 
                                  className="booking-row-img" 
                                  onError={handleImageError}
                                />
                                <div>
                                  <h4 className="booking-row-title">{tourInfo.title || 'Elite Escape Package'}</h4>
                                  <div className="booking-row-meta">
                                    <span>Date: {new Date(booking.bookingDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                    <span>Guests: {booking.guests}</span>
                                    <span>Total Price: ${booking.totalPrice?.toLocaleString()}</span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex-center" style={{ gap: '15px' }}>
                                <span className={`booking-status-badge ${booking.status || 'confirmed'}`}>
                                  {booking.status || 'confirmed'}
                                </span>
                                
                                {booking.status !== 'cancelled' && (
                                  <button 
                                    className="btn-cancel-booking"
                                    onClick={() => handleCancelBooking(booking._id)}
                                    style={{ cursor: 'pointer' }}
                                  >
                                    Cancel Voyage
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {/* 2. EDIT PROFILE TAB */}
                {activeTab === 'profile' && (
                  <div>
                    <h2>Traveler Settings & Credentials</h2>
                    <p style={{ color: 'var(--subtext)', marginBottom: '30px' }}>
                      Update your identity details, luxury coordinates, passport credentials, or security avatar.
                    </p>

                    <form onSubmit={handleUpdateProfile} style={{ maxWidth: '600px' }}>
                      
                      {/* Predefined Avatar Selector */}
                      <div style={{ marginBottom: '30px' }}>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', color: 'var(--subtext)', marginBottom: '12px' }}>
                          <FiImage style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Select Traveler Avatar
                        </label>
                        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                          {PREDEFINED_AVATARS.map((avatarUrl, idx) => (
                            <div 
                              key={idx}
                              onClick={() => setSelectedAvatar(avatarUrl)}
                              style={{
                                width: '60px',
                                height: '60px',
                                borderRadius: '50%',
                                overflow: 'hidden',
                                cursor: 'pointer',
                                border: `3px solid ${selectedAvatar === avatarUrl ? 'var(--primary)' : 'transparent'}`,
                                boxShadow: selectedAvatar === avatarUrl ? 'var(--glow-primary)' : 'var(--shadow-glass)',
                                transition: 'all 0.3s'
                              }}
                            >
                              <img src={avatarUrl} alt={`Avatar ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                          ))}
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                        <div className="booking-form-group" style={{ marginBottom: '0' }}>
                          <label>First Name</label>
                          <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                          />
                        </div>

                        <div className="booking-form-group" style={{ marginBottom: '0' }}>
                          <label>Last Name</label>
                          <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="booking-form-group" style={{ marginBottom: '20px' }}>
                        <label>Contact Phone</label>
                        <input
                          type="text"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+971 50 987 6543"
                        />
                      </div>

                      <div className="booking-form-group" style={{ marginBottom: '30px' }}>
                        <label>Change Password (Leave blank to keep current)</label>
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter new account passport credentials..."
                        />
                      </div>

                      {profileError && (
                        <div className="flex" style={{ color: '#ff6b6b', gap: '8px', alignItems: 'center', marginBottom: '20px', fontSize: '0.88rem', fontWeight: '500' }}>
                          <FiAlertCircle />
                          <span>{profileError}</span>
                        </div>
                      )}

                      {profileSuccess && (
                        <div className="flex" style={{ color: '#2ecc71', gap: '8px', alignItems: 'center', marginBottom: '20px', fontSize: '0.88rem', fontWeight: '500' }}>
                          <FiCheckCircle />
                          <span>{profileSuccess}</span>
                        </div>
                      )}

                      <button 
                        type="submit" 
                        className="btn-premium" 
                        style={{ border: 'none', cursor: 'pointer' }}
                        disabled={profileLoading}
                      >
                        {profileLoading ? 'Updating Settings...' : 'Save Profile Credentials'}
                      </button>

                    </form>
                  </div>
                )}

              </motion.div>
            </AnimatePresence>
          </main>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
