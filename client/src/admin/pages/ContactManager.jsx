import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  FiCheckCircle, FiAlertCircle, FiSave, FiSettings, 
  FiMail, FiTrash2, FiUser, FiInfo, FiClock, FiActivity
} from 'react-icons/fi';
import API from '../../api';

const ContactManager = () => {
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(true);
  
  // Dynamic settings form state
  const [formData, setFormData] = useState({
    title: 'Contact Our Elite Concierge',
    description: 'Reach out to our premium support team to tailor your dream luxury vacation.',
    phone: '+971 4 123 4567',
    location: 'Happy Land Premium Building, Office 302, Ajman, UAE',
    facebook: '',
    instagram: '',
    twitter: '',
    linkedin: ''
  });

  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsSuccess, setSettingsSuccess] = useState(null);
  const [settingsError, setSettingsError] = useState(null);

  // Modal display for viewing query details
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Sub-tabs in the manager
  const [managerTab, setManagerTab] = useState('settings'); // 'settings' or 'messages'

  const fetchContactDetails = async () => {
    try {
      const res = await API.get('/contact');
      if (res.data.success && res.data.data) {
        setFormData({
          title: res.data.data.title || '',
          description: res.data.data.description || '',
          phone: res.data.data.phone || '',
          location: res.data.data.location || '',
          facebook: res.data.data.facebook || '',
          instagram: res.data.data.instagram || '',
          twitter: res.data.data.twitter || '',
          linkedin: res.data.data.linkedin || ''
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMessages = async () => {
    setLoadingMessages(true);
    try {
      const res = await API.get('/contact/messages');
      if (res.data.success) {
        setMessages(res.data.data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingMessages(false);
    }
  };

  useEffect(() => {
    fetchContactDetails();
    fetchMessages();
  }, []);

  const handleSettingsSubmit = async (e) => {
    e.preventDefault();
    setSavingSettings(true);
    setSettingsSuccess(null);
    setSettingsError(null);

    try {
      const res = await API.put('/contact', formData);
      if (res.data.success) {
        setSettingsSuccess(res.data.message || 'Contact coordinates successfully synchronized!');
      }
    } catch (err) {
      console.error(err);
      setSettingsError(err.response?.data?.message || 'Failed to update contact coordinates.');
    } finally {
      setSavingSettings(false);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const res = await API.put(`/contact/messages/${id}/status`, { status: newStatus });
      if (res.data.success) {
        // Update local state immediately
        setMessages(messages.map(m => m._id === id ? { ...m, status: newStatus } : m));
        if (selectedMessage && selectedMessage._id === id) {
          setSelectedMessage({ ...selectedMessage, status: newStatus });
        }
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update message status.');
    }
  };

  const handleDeleteMessage = async (id) => {
    if (!window.confirm('Are you absolutely sure you want to permanently purge this customer query?')) {
      return;
    }
    try {
      const res = await API.delete(`/contact/messages/${id}`);
      if (res.data.success) {
        setMessages(messages.filter(m => m._id !== id));
        setModalOpen(false);
        setSelectedMessage(null);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete message.');
    }
  };

  const openMessageModal = (message) => {
    setSelectedMessage(message);
    setModalOpen(true);
    // Automatically mark as read if it is currently unread
    if (message.status === 'unread') {
      handleUpdateStatus(message._id, 'read');
    }
  };

  return (
    <div>
      {/* CMS Header Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <h2 style={{ color: 'var(--text-white)', marginTop: '0px', marginBottom: '5px' }}>Contact & Inquiry Hub</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>Configure dynamic contact page layout parameters or process customer concierge requests.</p>
        </div>

        {/* Manager Mode Switcher buttons */}
        <div style={{ display: 'flex', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 'var(--radius-md)', padding: '4px' }}>
          <button 
            className={`admin-text-btn ${managerTab === 'settings' ? 'active' : ''}`}
            onClick={() => setManagerTab('settings')}
            style={{ 
              fontWeight: '600', 
              fontSize: '0.85rem', 
              padding: '8px 16px', 
              borderRadius: 'var(--radius-sm)', 
              cursor: 'pointer',
              background: managerTab === 'settings' ? 'rgba(212, 175, 55, 0.15)' : 'transparent',
              color: managerTab === 'settings' ? 'var(--primary-gold)' : 'var(--text-light)',
              border: 'none',
              transition: 'all 0.2s'
            }}
          >
            <FiSettings style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Dynamic Page Setup
          </button>
          <button 
            className={`admin-text-btn ${managerTab === 'messages' ? 'active' : ''}`}
            onClick={() => setManagerTab('messages')}
            style={{ 
              fontWeight: '600', 
              fontSize: '0.85rem', 
              padding: '8px 16px', 
              borderRadius: 'var(--radius-sm)', 
              cursor: 'pointer',
              background: managerTab === 'messages' ? 'rgba(212, 175, 55, 0.15)' : 'transparent',
              color: managerTab === 'messages' ? 'var(--primary-gold)' : 'var(--text-light)',
              border: 'none',
              transition: 'all 0.2s'
            }}
          >
            <FiMail style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Concierge Inbox
            {messages.filter(m => m.status === 'unread').length > 0 && (
              <span style={{ marginLeft: '6px', backgroundColor: '#ff6b6b', color: '#fff', borderRadius: '50%', padding: '2px 6px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                {messages.filter(m => m.status === 'unread').length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main Mode Body */}
      {managerTab === 'settings' ? (
        <form onSubmit={handleSettingsSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '800px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            {/* Field: Title */}
            <div className="booking-form-group" style={{ marginBottom: '0' }}>
              <label>Page Main Headline</label>
              <input 
                type="text" 
                className="auth-input" 
                value={formData.title} 
                onChange={e => setFormData({ ...formData, title: e.target.value })} 
                required 
              />
            </div>

            {/* Field: Phone */}
            <div className="booking-form-group" style={{ marginBottom: '0' }}>
              <label>Dynamic Phone Coordinates</label>
              <input 
                type="text" 
                className="auth-input" 
                value={formData.phone} 
                onChange={e => setFormData({ ...formData, phone: e.target.value })} 
                required 
              />
            </div>
          </div>

          {/* Field: Description */}
          <div className="booking-form-group" style={{ marginBottom: '0' }}>
            <label>Subheadline / Descriptive Introduction</label>
            <textarea 
              className="auth-input" 
              style={{ minHeight: '80px', resize: 'vertical' }}
              value={formData.description} 
              onChange={e => setFormData({ ...formData, description: e.target.value })} 
              required 
            />
          </div>

          {/* Field: Location */}
          <div className="booking-form-group" style={{ marginBottom: '0' }}>
            <label>Physical Office Coordinates (Location)</label>
            <input 
              type="text" 
              className="auth-input" 
              value={formData.location} 
              onChange={e => setFormData({ ...formData, location: e.target.value })} 
              required 
            />
          </div>

          {/* Social Links Subheading */}
          <h4 style={{ color: 'var(--text-white)', margin: '15px 0 5px', fontSize: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '8px' }}>
            Social Coordinates integration
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px' }}>
            <div className="booking-form-group" style={{ marginBottom: '0' }}>
              <label>Facebook URL</label>
              <input 
                type="url" 
                className="auth-input" 
                placeholder="https://facebook.com/..." 
                value={formData.facebook} 
                onChange={e => setFormData({ ...formData, facebook: e.target.value })} 
              />
            </div>

            <div className="booking-form-group" style={{ marginBottom: '0' }}>
              <label>Instagram URL</label>
              <input 
                type="url" 
                className="auth-input" 
                placeholder="https://instagram.com/..." 
                value={formData.instagram} 
                onChange={e => setFormData({ ...formData, instagram: e.target.value })} 
              />
            </div>

            <div className="booking-form-group" style={{ marginBottom: '0' }}>
              <label>Twitter / X URL</label>
              <input 
                type="url" 
                className="auth-input" 
                placeholder="https://twitter.com/..." 
                value={formData.twitter} 
                onChange={e => setFormData({ ...formData, twitter: e.target.value })} 
              />
            </div>

            <div className="booking-form-group" style={{ marginBottom: '0' }}>
              <label>LinkedIn URL</label>
              <input 
                type="url" 
                className="auth-input" 
                placeholder="https://linkedin.com/..." 
                value={formData.linkedin} 
                onChange={e => setFormData({ ...formData, linkedin: e.target.value })} 
              />
            </div>
          </div>

          {settingsError && (
            <div className="flex" style={{ color: '#ff6b6b', gap: '8px', alignItems: 'center', marginTop: '10px' }}>
              <FiAlertCircle />
              <span>{settingsError}</span>
            </div>
          )}

          {settingsSuccess && (
            <div className="flex" style={{ color: '#2ecc71', gap: '8px', alignItems: 'center', marginTop: '10px' }}>
              <FiCheckCircle />
              <span>{settingsSuccess}</span>
            </div>
          )}

          <div style={{ marginTop: '15px' }}>
            <button type="submit" className="btn-premium" style={{ border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }} disabled={savingSettings}>
              <FiSave />
              <span>{savingSettings ? 'Synchronizing coordinates...' : 'Save Page Coordinates'}</span>
            </button>
          </div>

        </form>
      ) : (
        <div>
          {/* INBOX SECTION */}
          {loadingMessages ? (
            <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>Retrieving secure query catalogs...</p>
          ) : messages.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '50px 20px', background: 'rgba(255,255,255,0.01)', border: '1px dashed rgba(255,255,255,0.05)', borderRadius: 'var(--radius-lg)' }}>
              <FiMail size={40} style={{ color: 'var(--text-muted)', marginBottom: '15px' }} />
              <h4 style={{ margin: '0 0 5px', color: 'var(--text-white)' }}>No transmission logs discovered</h4>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Customer support inbox is empty. Newly transmitted messages will populate here.</p>
            </div>
          ) : (
            <div className="admin-flat-table-container">
              <table className="admin-flat-table">
                <thead>
                  <tr>
                    <th>Sender Coordinates</th>
                    <th>Subject Context</th>
                    <th>Transmission Date</th>
                    <th>Inbox State</th>
                    <th>Operations</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map(msg => (
                    <tr key={msg._id} style={{ background: msg.status === 'unread' ? 'rgba(212, 175, 55, 0.02)' : 'transparent', transition: 'background 0.2s' }}>
                      <td data-label="Sender Coordinates">
                        <div style={{ fontWeight: '600', color: 'var(--text-white)' }}>{msg.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{msg.email}</div>
                      </td>
                      <td data-label="Subject Context" style={{ maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {msg.subject || 'General Inquiry'}
                      </td>
                      <td data-label="Transmission Date" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        {new Date(msg.createdAt).toLocaleDateString()} at {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td data-label="Inbox State">
                        <span className={`admin-badge ${msg.status}`} style={{
                          textTransform: 'uppercase', 
                          fontSize: '0.7rem', 
                          fontWeight: 'bold', 
                          letterSpacing: '0.05em',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          backgroundColor: msg.status === 'unread' ? '#e74c3c' : msg.status === 'read' ? '#3498db' : '#2ecc71',
                          color: '#fff'
                        }}>
                          {msg.status}
                        </span>
                      </td>
                      <td data-label="Operations">
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <button 
                            className="btn-premium"
                            onClick={() => openMessageModal(msg)}
                            style={{ 
                              padding: '6px 12px', 
                              fontSize: '0.8rem', 
                              borderRadius: 'var(--radius-sm)', 
                              cursor: 'pointer', 
                              border: 'none',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            <FiInfo /> Open Logs
                          </button>
                          <button 
                            onClick={() => handleDeleteMessage(msg._id)} 
                            style={{ 
                              background: 'rgba(255,107,107,0.1)', 
                              border: '1px solid rgba(255,107,107,0.2)', 
                              color: '#ff6b6b', 
                              cursor: 'pointer',
                              padding: '6px 8px',
                              borderRadius: 'var(--radius-sm)',
                              transition: 'all 0.2s'
                            }}
                            title="Purge Log"
                          >
                            <FiTrash2 size={16} />
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

      {/* SECURE POPUP INBOX TRANSCRIPT VIEW MODAL */}
      {modalOpen && selectedMessage && createPortal(
        <div className="admin-modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="admin-modal" style={{ maxWidth: '700px' }} onClick={(e) => e.stopPropagation()}>
            
            <div className="admin-modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FiMail size={22} style={{ color: 'var(--primary-gold)' }} />
                <h3>Customer Inquiry Transmission</h3>
              </div>
              <button className="admin-modal-close" onClick={() => setModalOpen(false)}>×</button>
            </div>

            <div className="admin-modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Meta Data Box */}
              <div className="admin-grid-2" style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 'var(--radius-md)' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                    <FiUser style={{ marginRight: '4px', verticalAlign: 'middle' }} /> Sender Identity
                  </label>
                  <span style={{ fontWeight: '600', color: 'var(--text-white)', fontSize: '1rem' }}>{selectedMessage.name}</span>
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                    <FiClock style={{ marginRight: '4px', verticalAlign: 'middle' }} /> Transmission Date
                  </label>
                  <span style={{ color: 'var(--text-light)', fontSize: '0.95rem' }}>
                    {new Date(selectedMessage.createdAt).toLocaleString()}
                  </span>
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                    <FiMail style={{ marginRight: '4px', verticalAlign: 'middle' }} /> Email Coordinate
                  </label>
                  <a href={`mailto:${selectedMessage.email}`} style={{ color: 'var(--primary-gold)', textDecoration: 'none', fontWeight: '500' }}>
                    {selectedMessage.email}
                  </a>
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                    <FiActivity style={{ marginRight: '4px', verticalAlign: 'middle' }} /> Processing Status
                  </label>
                  <span className={`admin-badge ${selectedMessage.status}`} style={{
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    backgroundColor: selectedMessage.status === 'unread' ? '#e74c3c' : selectedMessage.status === 'read' ? '#3498db' : '#2ecc71',
                    color: '#fff'
                  }}>
                    {selectedMessage.status}
                  </span>
                </div>
              </div>

              {/* Inquiry details */}
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Subject Context</label>
                <div style={{ padding: '12px 15px', background: 'rgba(255,255,255,0.01)', borderLeft: '3px solid var(--primary-gold)', color: 'var(--text-white)', fontWeight: '600', borderRadius: '0 var(--radius-sm) var(--radius-sm) 0' }}>
                  {selectedMessage.subject || 'General Inquiry'}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Message Details Transcript</label>
                <div style={{ 
                  padding: '20px', 
                  background: 'rgba(255,255,255,0.02)', 
                  border: '1px dashed rgba(255,255,255,0.05)', 
                  borderRadius: 'var(--radius-md)', 
                  color: 'var(--text-light)', 
                  lineHeight: '1.6', 
                  fontSize: '1rem',
                  whiteSpace: 'pre-wrap',
                  maxHeight: '250px',
                  overflowY: 'auto'
                }}>
                  {selectedMessage.message}
                </div>
              </div>

            </div>

            <div className="admin-modal-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                {selectedMessage.status !== 'replied' && (
                  <button 
                    className="btn-premium"
                    onClick={() => handleUpdateStatus(selectedMessage._id, 'replied')}
                    style={{ border: 'none', cursor: 'pointer', padding: '10px 18px', fontSize: '0.85rem' }}
                  >
                    Mark as Replied
                  </button>
                )}
                {selectedMessage.status === 'replied' && (
                  <button 
                    className="btn-cancel-booking"
                    onClick={() => handleUpdateStatus(selectedMessage._id, 'read')}
                    style={{ border: 'none', cursor: 'pointer', padding: '10px 18px', fontSize: '0.85rem', color: 'var(--text-muted)' }}
                  >
                    Mark as Read Only
                  </button>
                )}
              </div>
              
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  type="button" 
                  className="btn-cancel-booking" 
                  onClick={() => setModalOpen(false)} 
                  style={{ border: 'none', cursor: 'pointer', padding: '10px 18px', fontSize: '0.85rem' }}
                >
                  Close Logs
                </button>
                <button 
                  type="button" 
                  className="admin-solid-btn" 
                  onClick={() => handleDeleteMessage(selectedMessage._id)} 
                  style={{ backgroundColor: '#ef4444', color: '#fff', border: 'none', cursor: 'pointer', padding: '10px 18px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <FiTrash2 /> Purge Log
                </button>
              </div>
            </div>

          </div>
        </div>,
        document.body
      )}

    </div>
  );
};

export default ContactManager;
