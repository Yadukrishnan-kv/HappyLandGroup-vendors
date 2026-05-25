import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiCalendar, FiCompass, 
  FiEdit, FiLogOut, FiCheckCircle, FiAlertCircle, FiSettings, FiImage,
  FiUsers, FiDollarSign, FiPlus, FiTrash2, FiBriefcase, FiGlobe, FiShield, FiMenu
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import API from '../../api';
import Skeleton from '../../components/common/Skeleton';
import ResourceManagers from './ResourceManagers';
import { getImageUrl, handleImageError } from '../../utils/imageHelper';
import '../../styles/pages/inner.css';

const PREDEFINED_AVATARS = [
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Aria",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Jack",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Sophia",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Mason",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Olivia",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Elena"
];

export const AdminDashboard = () => {
  const { user, logout, updateProfile, loading } = useAuth();
  const navigate = useNavigate();

  // Redirect non-admins or unauthenticated users immediately
  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate('/admin/login', { replace: true });
      } else if (user.role !== 'admin' || sessionStorage.getItem('isAdminSession') !== 'true') {
        navigate('/', { replace: true });
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

  // State Management
  const [activeTab, setActiveTab] = useState('admin-overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(null);
  const [profileError, setProfileError] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);

  // Edit Profile Form States
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [password, setPassword] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatar || PREDEFINED_AVATARS[0]);

  // Admin Data Rosters
  const [allBookings, setAllBookings] = useState([]);
  const [allTours, setAllTours] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loadingAdminData, setLoadingAdminData] = useState(true);
  const [adminError, setAdminError] = useState(null);

  // Admin Tour CRUD Form States
  const [tourModalOpen, setTourModalOpen] = useState(false);
  const [editingTour, setEditingTour] = useState(null);
  const [tourFormData, setTourFormData] = useState({
    title: '',
    country: 'UAE',
    city: 'Dubai',
    description: '',
    price: '',
    maxPeople: 10,
    distance: 50,
    featured: false,
    images: ['https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1200&q=80'],
    startDates: [],
    tourType: 'UAE Tours',
    duration: '',
    includes: ['', '', '', '', '']
  });

  // Load and pre-fill data on load
  useEffect(() => {
    if (user && user.role === 'admin') {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setPhone(user.phone || '');
      setSelectedAvatar(user.avatar || PREDEFINED_AVATARS[0]);
      fetchAdminData();
    }
  }, [user]);

  const fetchAdminData = async () => {
    setLoadingAdminData(true);
    setAdminError(null);
    try {
      const [bookingsRes, toursRes, usersRes] = await Promise.all([
        API.get('/bookings'),
        API.get('/tours?limit=100'),
        API.get('/auth/users')
      ]);

      if (bookingsRes.data.success) {
        setAllBookings(bookingsRes.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      }
      if (toursRes.data.success) {
        setAllTours(toursRes.data.data);
      }
      if (usersRes.data.success) {
        setAllUsers(usersRes.data.data);
      }
    } catch (err) {
      console.error(err);
      setAdminError(err.response?.data?.message || 'Failed to retrieve administrative data catalogs.');
    } finally {
      setLoadingAdminData(false);
    }
  };

  // --- ADMIN ACTIONS ---
  const handleUpdateBookingStatus = async (bookingId, status) => {
    try {
      const res = await API.put(`/bookings/${bookingId}/status`, { status });
      if (res.data.success) {
        alert(`Booking successfully marked as ${status}.`);
        fetchAdminData();
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to update reservation status.');
    }
  };

  const handleToggleUserRole = async (targetUser) => {
    if (targetUser._id === user._id) {
      alert("Safety constraint: You cannot modify your own administrator privileges.");
      return;
    }
    const newRole = targetUser.role === 'admin' ? 'user' : 'admin';
    try {
      const res = await API.put(`/auth/users/${targetUser._id}/role`, { role: newRole });
      if (res.data.success) {
        alert(`Role successfully changed to ${newRole}.`);
        fetchAdminData();
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to modify role properties.');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (userId === user._id) {
      alert("Safety constraint: You cannot delete your own admin account.");
      return;
    }
    if (!window.confirm("Are you absolutely certain you want to purge this user catalog record? This action is permanent.")) {
      return;
    }
    try {
      const res = await API.delete(`/auth/users/${userId}`);
      if (res.data.success) {
        alert("Traveler account successfully deleted.");
        fetchAdminData();
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to purge traveler.');
    }
  };

  const handleDeleteTour = async (tourId) => {
    if (!window.confirm("Are you absolutely sure you want to delete this luxury tour package?")) {
      return;
    }
    try {
      const res = await API.delete(`/tours/${tourId}`);
      if (res.data.success) {
        alert("Luxury package successfully deleted.");
        fetchAdminData();
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to delete tour package.');
    }
  };

  // Open Add/Edit Tour Modal
  const handleOpenTourModal = (tour = null) => {
    if (tour) {
      setEditingTour(tour);
      setTourFormData({
        title: tour.title,
        country: tour.country,
        city: tour.city,
        description: tour.description,
        price: tour.price,
        maxPeople: tour.maxPeople,
        distance: tour.distance,
        featured: tour.featured || false,
        images: tour.images || ['https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1200&q=80'],
        startDates: tour.startDates || [],
        tourType: tour.tourType || 'UAE Tours',
        duration: tour.duration || '',
        includes: tour.includes || ['', '', '', '', '']
      });
    } else {
      setEditingTour(null);
      setTourFormData({
        title: '',
        country: 'UAE',
        city: 'Dubai',
        description: '',
        price: '',
        maxPeople: 10,
        distance: 50,
        featured: false,
        images: ['https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1200&q=80'],
        startDates: [new Date().toISOString().split('T')[0]],
        tourType: 'UAE Tours',
        duration: '',
        includes: ['', '', '', '', '']
      });
    }
    setTourModalOpen(true);
  };

  const handleSaveTour = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...tourFormData,
        price: Number(tourFormData.price),
        maxPeople: Number(tourFormData.maxPeople),
        distance: Number(tourFormData.distance)
      };

      if (editingTour) {
        const res = await API.put(`/tours/${editingTour._id}`, payload);
        if (res.data.success) {
          alert("Luxury tour package successfully updated!");
          setTourModalOpen(false);
          fetchAdminData();
        }
      } else {
        const res = await API.post('/tours', payload);
        if (res.data.success) {
          alert("Luxury tour package successfully created!");
          setTourModalOpen(false);
          fetchAdminData();
        }
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to save luxury package.');
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
        setProfileSuccess('Bespoke administrator credentials successfully updated!');
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
    navigate('/admin/login');
  };

  if (loading || !user || user.role !== 'admin') {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px', background: 'var(--bg-soft)' }}>
        <Skeleton type="card" style={{ width: '300px', height: '200px' }} />
        <p style={{ fontStyle: 'italic', color: 'var(--subtext)' }}>Establishing secure concierge session...</p>
      </div>
    );
  }

  // Stats Calculations
  const activeToursCount = allTours.length;
  const registeredUsersCount = allUsers.length;
  const totalBookingsCount = allBookings.length;
  const totalRevenue = allBookings
    .filter(b => b.status !== 'cancelled')
    .reduce((sum, b) => sum + (b.totalPrice || 0), 0);

  return (
    <div className="admin-dashboard-container">
      
      {/* Mobile Admin Navbar (Visible only on <992px) */}
      <div className="admin-mobile-navbar">
        <div className="admin-mobile-brand">
          <FiShield style={{ color: 'var(--primary-gold)' }} />
          <span>Admin Panel</span>
        </div>
        <button className="admin-mobile-hamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <FiMenu size={24} />
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`admin-sidebar ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="admin-user-profile">
          <div className="admin-avatar-container">
            <img 
              src={selectedAvatar} 
              alt={`${firstName} avatar`} 
              onError={(e) => { e.target.src = PREDEFINED_AVATARS[0]; }}
            />
          </div>
          <h3 className="admin-user-name">{firstName} {lastName}</h3>
          <p className="admin-user-email">{user.email}</p>
          <span className="admin-flat-badge neutral" style={{ marginTop: '10px' }}>
            System Administrator
          </span>
        </div>

        <ul className="admin-menu">
          <li 
            className={`admin-menu-item ${activeTab === 'admin-overview' ? 'active' : ''}`}
            onClick={() => { setActiveTab('admin-overview'); setMobileMenuOpen(false); }}
          >
            <FiCompass />
            <span>Business Overview</span>
          </li>
          <li 
            className={`admin-menu-item ${activeTab === 'admin-bookings' ? 'active' : ''}`}
            onClick={() => { setActiveTab('admin-bookings'); setMobileMenuOpen(false); }}
          >
            <FiCalendar />
            <span>Manage Bookings</span>
          </li>
          <li 
            className={`admin-menu-item ${activeTab === 'admin-tours' ? 'active' : ''}`}
            onClick={() => { setActiveTab('admin-tours'); setMobileMenuOpen(false); }}
          >
            <FiBriefcase />
            <span>Manage Tours</span>
          </li>
          <li 
            className={`admin-menu-item ${activeTab === 'admin-users' ? 'active' : ''}`}
            onClick={() => { setActiveTab('admin-users'); setMobileMenuOpen(false); }}
          >
            <FiUsers />
            <span>Manage Users</span>
          </li>
          <li 
            className={`admin-menu-item ${activeTab === 'admin-cms' ? 'active' : ''}`}
            onClick={() => { setActiveTab('admin-cms'); setMobileMenuOpen(false); }}
          >
            <FiGlobe />
            <span>Manage CMS</span>
          </li>
          <li 
            className={`admin-menu-item ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
            style={{ borderTop: '1px solid #e2e8f0', borderRadius: '0', paddingTop: '15px', marginTop: '10px' }}
          >
            <FiSettings />
            <span>Console Settings</span>
          </li>

          <li 
            className="admin-menu-item" 
            onClick={handleLogout}
            style={{ marginTop: '20px', color: '#ff6b6b', borderTop: '1px solid #e2e8f0', paddingTop: '20px', borderRadius: '0' }}
          >
            <FiLogOut />
            <span>Sign Out</span>
          </li>
        </ul>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main-content">
        {/* Top Operational Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '20px', marginBottom: '30px' }}>
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#0f172a', letterSpacing: '-0.02em', margin: 0 }}>
              Administrative Console
            </h1>
            <p style={{ color: '#64748b', fontSize: '0.875rem', marginTop: '4px', margin: 0 }}>
              Manage platform bookings, excursions catalog, user security roles, and site assets.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <span className="admin-flat-badge success">
              Secure Operations Active
            </span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            style={{ willChange: 'opacity, transform' }}
          >
                
                {/* 1. ADMIN BUSINESS OVERVIEW TAB */}
                {activeTab === 'admin-overview' && (
                  <div>
                    <h2>Business Overview</h2>
                    <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '24px' }}>
                      Key platform metrics, active tour package volumes, traveler rosters, and total transaction volume.
                    </p>

                    {/* Stats Grid */}
                    <div className="admin-stats-grid">
                      <div className="admin-stat-card">
                        <div className="admin-stat-icon" style={{ backgroundColor: '#fef3c7', color: 'var(--primary-gold)' }}>
                          <FiDollarSign />
                        </div>
                        <div>
                          <div className="admin-stat-num">${totalRevenue.toLocaleString()}</div>
                          <div className="admin-stat-title">Platform Revenue</div>
                        </div>
                      </div>

                      <div className="admin-stat-card">
                        <div className="admin-stat-icon" style={{ backgroundColor: '#e0f2fe', color: '#0284c7' }}><FiCalendar /></div>
                        <div>
                          <div className="admin-stat-num">{totalBookingsCount}</div>
                          <div className="admin-stat-title">Total Bookings</div>
                        </div>
                      </div>

                      <div className="admin-stat-card">
                        <div className="admin-stat-icon" style={{ backgroundColor: '#dcfce7', color: '#16a34a' }}>
                          <FiCompass />
                        </div>
                        <div>
                          <div className="admin-stat-num">{activeToursCount}</div>
                          <div className="admin-stat-title">Active Tours</div>
                        </div>
                      </div>
                    </div>

                    <div className="admin-stats-grid" style={{ gridTemplateColumns: '1fr 2fr' }}>
                      <div className="admin-stat-card">
                        <div className="admin-stat-icon" style={{ backgroundColor: '#f1f5f9', color: '#475569' }}>
                          <FiUsers />
                        </div>
                        <div>
                          <div className="admin-stat-num">{registeredUsersCount}</div>
                          <div className="admin-stat-title">Registered Users</div>
                        </div>
                      </div>

                      <div className="admin-stat-card" style={{ flexGrow: 1, justifyContent: 'space-between' }}>
                        <div>
                          <h4 style={{ fontWeight: 600, color: '#0f172a', margin: 0, fontSize: '0.95rem' }}>Operational Environment</h4>
                          <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '6px', margin: 0 }}>
                            System operates in offline resilient JSON storage mode with local seed fallback protection.
                          </p>
                        </div>
                        <span className="admin-flat-badge neutral" style={{ alignSelf: 'center' }}>Resilient Mode</span>
                      </div>
                    </div>

                    {adminError && (
                      <div className="flex" style={{ color: '#ef4444', gap: '8px', alignItems: 'center', marginTop: '20px', fontSize: '0.875rem' }}>
                        <FiAlertCircle />
                        <span>{adminError}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* 2. ADMIN MANAGE BOOKINGS TAB */}
                {activeTab === 'admin-bookings' && (
                  <div>
                    <div className="admin-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                      <h2>Manage Bookings</h2>
                      <span className="admin-flat-badge neutral">{allBookings.length} bookings total</span>
                    </div>

                    {loadingAdminData ? (
                      <Skeleton type="list" />
                    ) : allBookings.length === 0 ? (
                      <p style={{ fontStyle: 'italic', color: '#64748b', padding: '20px 0' }}>No platform bookings exist currently.</p>
                    ) : (
                      <div className="admin-flat-table-container">
                        <table className="admin-flat-table">
                          <thead>
                            <tr>
                              <th>Traveler</th>
                              <th>Selected Voyage</th>
                              <th>Date</th>
                              <th>Guests</th>
                              <th>Amount</th>
                              <th>Status</th>
                              <th>Operations</th>
                            </tr>
                          </thead>
                          <tbody>
                            {allBookings.map((b) => (
                              <tr key={b._id}>
                                <td>
                                  <div style={{ fontWeight: 600, color: '#0f172a' }}>
                                    {b.user?.firstName} {b.user?.lastName}
                                  </div>
                                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                                    {b.user?.email}
                                  </div>
                                </td>
                                <td>{b.tour?.title || 'Unknown Tour'}</td>
                                <td>{new Date(b.bookingDate).toLocaleDateString()}</td>
                                <td>{b.guests}</td>
                                <td style={{ fontWeight: 600, color: '#0f172a' }}>${b.totalPrice?.toLocaleString()}</td>
                                <td>
                                  <span className={`admin-flat-badge ${
                                    b.status === 'confirmed' || b.status === 'completed' ? 'success' : 'danger'
                                  }`}>
                                    {b.status}
                                  </span>
                                </td>
                                <td>
                                  <div className="admin-btn-group">
                                    {b.status !== 'confirmed' && b.status !== 'completed' && (
                                      <button 
                                        className="admin-text-btn"
                                        style={{ border: 'none', background: 'none', color: 'var(--primary-gold)', cursor: 'pointer', fontWeight: 'bold' }}
                                        onClick={() => handleUpdateBookingStatus(b._id, 'confirmed')}
                                      >
                                        Approve
                                      </button>
                                    )}
                                    {b.status === 'confirmed' && (
                                      <button 
                                        className="admin-text-btn"
                                        style={{ border: 'none', background: 'none', color: '#16a34a', cursor: 'pointer', fontWeight: 'bold' }}
                                        onClick={() => handleUpdateBookingStatus(b._id, 'completed')}
                                      >
                                        Complete
                                      </button>
                                    )}
                                    {b.status !== 'cancelled' && (
                                      <button 
                                        className="admin-text-btn danger"
                                        style={{ border: 'none', background: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: 'bold' }}
                                        onClick={() => handleUpdateBookingStatus(b._id, 'cancelled')}
                                      >
                                        Cancel
                                      </button>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}

                {/* 3. ADMIN MANAGE TOURS TAB */}
                {activeTab === 'admin-tours' && (
                  <div>
                    <div className="admin-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                      <h2>Manage Excursions</h2>
                      <button 
                        className="admin-solid-btn" 
                        onClick={() => handleOpenTourModal(null)}
                      >
                        <FiPlus /> Add Package
                      </button>
                    </div>

                    {loadingAdminData ? (
                      <Skeleton type="list" />
                    ) : allTours.length === 0 ? (
                      <p style={{ fontStyle: 'italic', color: '#64748b', padding: '20px 0' }}>No tour packages exist in the inventory.</p>
                    ) : (
                      <div className="admin-flat-table-container">
                        <table className="admin-flat-table">
                          <thead>
                            <tr>
                              <th>Package Detail</th>
                              <th>Location</th>
                              <th>Capacity</th>
                              <th>Distance</th>
                              <th>Price</th>
                              <th>Featured</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {allTours.map((t) => (
                              <tr key={t._id}>
                                <td>
                                  <div style={{ fontWeight: 600, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <img 
                                      src={getImageUrl(t.images && t.images.length > 0 ? t.images[0] : null)} 
                                      alt={t.title} 
                                      style={{ width: '36px', height: '36px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #e2e8f0' }}
                                      onError={handleImageError}
                                    />
                                    <span>{t.title}</span>
                                  </div>
                                </td>
                                <td>{t.city}, {t.country}</td>
                                <td>{t.maxPeople} guests max</td>
                                <td>{t.distance} km</td>
                                <td style={{ fontWeight: 600, color: '#0f172a' }}>${t.price}</td>
                                <td>
                                  <span className={`admin-flat-badge ${t.featured ? 'warning' : 'neutral'}`}>
                                    {t.featured ? 'Featured' : 'Standard'}
                                  </span>
                                </td>
                                <td>
                                  <div className="admin-btn-group">
                                    <button 
                                      className="admin-action-btn" 
                                      onClick={() => handleOpenTourModal(t)}
                                      title="Edit Package"
                                      style={{ border: '1px solid #cbd5e1', padding: '6px', borderRadius: '6px', cursor: 'pointer', background: '#f1f5f9', color: '#334155' }}
                                    >
                                      <FiEdit />
                                    </button>
                                    <button 
                                      className="admin-action-btn danger" 
                                      onClick={() => handleDeleteTour(t._id)}
                                      title="Delete Package"
                                      style={{ border: '1px solid #fee2e2', padding: '6px', borderRadius: '6px', cursor: 'pointer', background: '#fee2e2', color: '#b91c1c' }}
                                    >
                                      <FiTrash2 />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}

                {/* 4. ADMIN MANAGE USERS TAB */}
                {activeTab === 'admin-users' && (
                  <div>
                    <div className="admin-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                      <h2>Manage Users</h2>
                      <span className="admin-flat-badge neutral">{allUsers.length} total users</span>
                    </div>

                    {loadingAdminData ? (
                      <Skeleton type="list" />
                    ) : allUsers.length === 0 ? (
                      <p style={{ fontStyle: 'italic', color: '#64748b', padding: '20px 0' }}>No users are registered on the platform.</p>
                    ) : (
                      <div className="admin-flat-table-container">
                        <table className="admin-flat-table">
                          <thead>
                            <tr>
                              <th>Identity Credentials</th>
                              <th>Contact Coordinates</th>
                              <th>Join Date</th>
                              <th>Clearance</th>
                              <th>Role Operations</th>
                            </tr>
                          </thead>
                          <tbody>
                            {allUsers.map((u) => (
                              <tr key={u._id}>
                                <td>
                                  <div className="user-avatar-cell" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <img src={u.avatar || PREDEFINED_AVATARS[0]} alt={u.firstName} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #cbd5e1' }} />
                                    <div>
                                      <div style={{ fontWeight: 600, color: '#0f172a' }}>
                                        {u.firstName} {u.lastName}
                                      </div>
                                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                                        {u.email}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td>{u.phone || 'No phone registered'}</td>
                                <td>{new Date(u.createdAt || Date.now()).toLocaleDateString()}</td>
                                <td>
                                  <span className={`admin-flat-badge ${u.role === 'admin' ? 'info' : 'neutral'}`}>
                                    {u.role}
                                  </span>
                                </td>
                                <td>
                                  {u._id !== user._id ? (
                                    <div className="admin-btn-group">
                                      <button 
                                        className="admin-text-btn"
                                        style={{ border: 'none', background: 'none', color: 'var(--primary-gold)', cursor: 'pointer', fontWeight: 'bold' }}
                                        onClick={() => handleToggleUserRole(u)}
                                      >
                                        Toggle Role
                                      </button>
                                      <button 
                                        className="admin-text-btn danger"
                                        style={{ border: 'none', background: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: 'bold' }}
                                        onClick={() => handleDeleteUser(u._id)}
                                      >
                                        Purge User
                                      </button>
                                    </div>
                                  ) : (
                                    <span style={{ fontSize: '0.75rem', color: '#64748b', fontStyle: 'italic' }}>
                                      Active Session
                                    </span>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}

                {/* 5. ADMIN CMS & SETTINGS TAB */}
                {activeTab === 'admin-cms' && (
                  <div>
                    <div className="admin-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                      <h2>Content Management</h2>
                      <span className="admin-flat-badge neutral">Branding & Resources</span>
                    </div>
                    <ResourceManagers isEmbedded={true} />
                  </div>
                )}

                {/* 6. EDIT PROFILE TAB */}
                {activeTab === 'profile' && (
                  <div>
                    <h2>Console Administrator Profile Settings</h2>
                    <p style={{ color: 'var(--subtext)', marginBottom: '30px' }}>
                      Update your administrator credentials, email coordinate settings, phone logs, or security avatar.
                    </p>

                    <form onSubmit={handleUpdateProfile} style={{ maxWidth: '600px' }}>
                      
                      {/* Predefined Avatar Selector */}
                      <div style={{ marginBottom: '30px' }}>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', color: '#64748b', marginBottom: '12px' }}>
                          <FiImage style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Select Administrator Avatar
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
                                border: selectedAvatar === avatarUrl ? '2px solid var(--primary-gold)' : '2px solid transparent',
                                transition: 'all 0.2s',
                                padding: '2px'
                              }}
                            >
                              <img src={avatarUrl} alt={`Avatar ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="admin-grid-2">
                        <div className="admin-form-group">
                          <label>First Name</label>
                          <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                          />
                        </div>

                        <div className="admin-form-group">
                          <label>Last Name</label>
                          <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="admin-form-group">
                        <label>Contact Phone</label>
                        <input
                          type="text"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+971 50 987 6543"
                        />
                      </div>

                      <div className="admin-form-group" style={{ marginBottom: '30px' }}>
                        <label>Change Passphrase (Leave blank to keep current)</label>
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter new administrator security passphrase..."
                        />
                      </div>

                      {profileError && (
                        <div className="flex" style={{ color: '#ef4444', gap: '8px', alignItems: 'center', marginBottom: '20px', fontSize: '0.88rem', fontWeight: '500' }}>
                          <FiAlertCircle />
                          <span>{profileError}</span>
                        </div>
                      )}

                      {profileSuccess && (
                        <div className="flex" style={{ color: '#22c55e', gap: '8px', alignItems: 'center', marginBottom: '20px', fontSize: '0.88rem', fontWeight: '500' }}>
                          <FiCheckCircle />
                          <span>{profileSuccess}</span>
                        </div>
                      )}

                      <button 
                        type="submit" 
                        className="admin-solid-btn"
                        disabled={profileLoading}
                        style={{ width: '100%', padding: '12px' }}
                      >
                        {profileLoading ? 'Updating System...' : 'Commit Administrator Credentials'}
                      </button>

                    </form>
                  </div>
                )}

              </motion.div>
            </AnimatePresence>
          </main>

      {/* --- EXCURSION PUBLISH MODAL --- */}
      {tourModalOpen && (
        <div className="admin-modal-backdrop" onClick={() => setTourModalOpen(false)} style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(15, 23, 42, 0.4)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()} style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            maxWidth: '850px',
            width: '100%',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
          }}>
            <div className="admin-modal-header" style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '24px 30px',
              borderBottom: '1px solid #e2e8f0',
              flexShrink: 0
            }}>
              <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.25rem', fontWeight: '700', color: '#0f172a', margin: 0 }}>
                {editingTour ? 'Edit Excursion Package' : 'Publish New Excursion'}
              </h3>
              <button className="admin-modal-close" onClick={() => setTourModalOpen(false)} style={{ border: 'none', background: 'none', fontSize: '1.25rem', cursor: 'pointer', color: '#64748b' }}>x</button>
            </div>
            
            <form onSubmit={handleSaveTour} style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden', minHeight: 0 }}>
              <div className="admin-modal-body" style={{ display: 'flex', flexDirection: 'column', padding: '30px', overflowY: 'auto', flex: 1, minHeight: 0 }}>
                
                <div className="admin-grid-1-2">
                  <div className="admin-form-group">
                    <label>Excursion Package Title</label>
                    <input 
                      type="text"
                      required
                      value={tourFormData.title}
                      onChange={(e) => setTourFormData({ ...tourFormData, title: e.target.value })}
                      placeholder="e.g. Abu Dhabi F1 VIP Suite Charter"
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Tour Category</label>
                    <select
                      required
                      value={tourFormData.tourType}
                      onChange={(e) => setTourFormData({ ...tourFormData, tourType: e.target.value })}
                    >
                      <option value="UAE Tours">UAE Tours</option>
                      <option value="International Tour">International Tour</option>
                      <option value="Pilgrims">Pilgrims</option>
                    </select>
                  </div>
                </div>

                <div className="admin-grid-2">
                  <div className="admin-form-group">
                    <label>City Location</label>
                    <input 
                      type="text"
                      required
                      value={tourFormData.city}
                      onChange={(e) => setTourFormData({ ...tourFormData, city: e.target.value })}
                      placeholder="e.g. Dubai"
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Country Coordinate</label>
                    <input 
                      type="text"
                      required
                      value={tourFormData.country}
                      onChange={(e) => setTourFormData({ ...tourFormData, country: e.target.value })}
                      placeholder="e.g. UAE"
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>Descriptive Chronicles</label>
                  <textarea
                    required
                    style={{
                      fontFamily: 'inherit',
                      minHeight: '100px',
                      resize: 'vertical'
                    }}
                    value={tourFormData.description}
                    onChange={(e) => setTourFormData({ ...tourFormData, description: e.target.value })}
                    placeholder="Detail the itinerary highlights..."
                  />
                </div>

                <div className="admin-grid-3">
                  <div className="admin-form-group">
                    <label>Main Banner Image URL</label>
                    <input 
                      type="url"
                      required
                      value={tourFormData.images && tourFormData.images.length > 0 ? tourFormData.images[0] : ''}
                      onChange={(e) => {
                        const newImages = [...(tourFormData.images || [])];
                        newImages[0] = e.target.value;
                        setTourFormData({ ...tourFormData, images: newImages });
                      }}
                      placeholder="Primary Banner Image..."
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Gallery Image 2</label>
                    <input 
                      type="url"
                      value={tourFormData.images && tourFormData.images.length > 1 ? tourFormData.images[1] : ''}
                      onChange={(e) => {
                        const newImages = [...(tourFormData.images || ['', '', ''])];
                        newImages[1] = e.target.value;
                        setTourFormData({ ...tourFormData, images: newImages });
                      }}
                      placeholder="Optional image..."
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Gallery Image 3</label>
                    <input 
                      type="url"
                      value={tourFormData.images && tourFormData.images.length > 2 ? tourFormData.images[2] : ''}
                      onChange={(e) => {
                        const newImages = [...(tourFormData.images || ['', '', ''])];
                        newImages[2] = e.target.value;
                        setTourFormData({ ...tourFormData, images: newImages });
                      }}
                      placeholder="Optional image..."
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>Package Duration</label>
                  <input 
                    type="text"
                    required
                    value={tourFormData.duration}
                    onChange={(e) => setTourFormData({ ...tourFormData, duration: e.target.value })}
                    placeholder="e.g. 7 days-6 night"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Package Inclusions (Up to 5)</label>
                  <div className="admin-grid-3" style={{ gap: '15px' }}>
                    {[0, 1, 2, 3, 4].map(index => (
                      <input 
                        key={index}
                        type="text"
                        value={tourFormData.includes && tourFormData.includes.length > index ? tourFormData.includes[index] : ''}
                        onChange={(e) => {
                          const newIncludes = [...(tourFormData.includes || ['', '', '', '', ''])];
                          newIncludes[index] = e.target.value;
                          setTourFormData({ ...tourFormData, includes: newIncludes });
                        }}
                        placeholder={`Inclusion ${index + 1}...`}
                      />
                    ))}
                  </div>
                </div>

                <div className="admin-grid-3">
                  <div className="admin-form-group">
                    <label>Price Per Guest ($)</label>
                    <input 
                      type="number"
                      required
                      min="1"
                      value={tourFormData.price}
                      onChange={(e) => setTourFormData({ ...tourFormData, price: e.target.value })}
                      placeholder="e.g. 350"
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Max Guests Capacity</label>
                    <input 
                      type="number"
                      required
                      min="1"
                      value={tourFormData.maxPeople}
                      onChange={(e) => setTourFormData({ ...tourFormData, maxPeople: e.target.value })}
                      placeholder="e.g. 10"
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Distance Coverage (km)</label>
                    <input 
                      type="number"
                      required
                      min="1"
                      value={tourFormData.distance}
                      onChange={(e) => setTourFormData({ ...tourFormData, distance: e.target.value })}
                      placeholder="e.g. 80"
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '10px' }}>
                  <input 
                    type="checkbox"
                    id="featured-checkbox"
                    checked={tourFormData.featured}
                    onChange={(e) => setTourFormData({ ...tourFormData, featured: e.target.checked })}
                    style={{
                      width: '18px',
                      height: '18px',
                      cursor: 'pointer',
                      accentColor: 'var(--primary-gold)'
                    }}
                  />
                  <label htmlFor="featured-checkbox" style={{ fontWeight: 600, fontSize: '0.82rem', color: '#334155', cursor: 'pointer' }}>
                    Promote Excursion on Main Landing Banner (Featured)
                  </label>
                </div>

              </div>

              <div className="admin-modal-footer" style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '12px',
                padding: '20px 30px',
                borderTop: '1px solid #e2e8f0',
                backgroundColor: '#f8fafc'
              }}>
                <button 
                  type="button" 
                  className="admin-secondary-btn"
                  onClick={() => setTourModalOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="admin-solid-btn"
                >
                  {editingTour ? 'Update Package Details' : 'Publish Excursion'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
