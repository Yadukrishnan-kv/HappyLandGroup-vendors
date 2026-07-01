import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import BlogManager from './BlogManager';
import TrustLogoManager from './TrustLogoManager';
import WhyTravelManager from './WhyTravelManager';
import PremiumServiceManager from './PremiumServiceManager';
import ContactManager from './ContactManager';
import { FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { getImageUrl } from '../../utils/imageHelper';
import '../../styles/pages/inner.css';

const ResourceManagers = ({ isEmbedded = false, showBranding = true, showBrandingOnly = false }) => {
  const { user, settings, updateSettingsLogo } = useAuth();
  const [activeTab, setActiveTab] = useState(showBrandingOnly ? 'settings' : 'blogs');

  // Branding settings form states
  const [logoText, setLogoText] = useState('');
  const [logoTextSpan, setLogoTextSpan] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [settingsSuccess, setSettingsSuccess] = useState(null);
  const [settingsError, setSettingsError] = useState(null);
  const [savingSettings, setSavingSettings] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (logoPreview) {
        URL.revokeObjectURL(logoPreview);
      }
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveFile = () => {
    if (logoPreview) {
      URL.revokeObjectURL(logoPreview);
    }
    setLogoFile(null);
    setLogoPreview(null);
  };

  useEffect(() => {
    if (settings) {
      setLogoText(settings.logoText || '');
      setLogoTextSpan(settings.logoTextSpan || '');
      setLogoUrl(settings.logoUrl || '');
    }
  }, [settings]);

  if (!isEmbedded && (!user || user.role !== 'admin' || sessionStorage.getItem('isAdminSession') !== 'true')) {
    return <Navigate to="/" />;
  }

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setSavingSettings(true);
    setSettingsSuccess(null);
    setSettingsError(null);
    
    const res = await updateSettingsLogo({ logoText, logoTextSpan, logoUrl, logoFile });
    if (res.success) {
      setSettingsSuccess('Website branding parameters updated successfully!');
      setLogoFile(null);
      setLogoPreview(null);
    } else {
      setSettingsError(res.message || 'Failed to commit system settings.');
    }
    setSavingSettings(false);
  };

  const renderContent = () => (
    <>
      <div style={{ display: 'flex', gap: '20px', marginBottom: '15px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px', flexWrap: 'wrap' }}>
        {!showBrandingOnly && (
          <>
            <button 
              className={`admin-text-btn ${activeTab === 'blogs' ? 'active' : ''}`}
              onClick={() => setActiveTab('blogs')}
              style={{ fontWeight: activeTab === 'blogs' ? 'bold' : 'normal', color: activeTab === 'blogs' ? 'var(--primary-gold)' : 'var(--text-light)', border: 'none', background: 'none', fontSize: '1.1rem', cursor: 'pointer' }}
            >
              Journals (Blogs)
            </button>
            <button 
              className={`admin-text-btn ${activeTab === 'trustLogos' ? 'active' : ''}`}
              onClick={() => setActiveTab('trustLogos')}
              style={{ fontWeight: activeTab === 'trustLogos' ? 'bold' : 'normal', color: activeTab === 'trustLogos' ? 'var(--primary-gold)' : 'var(--text-light)', border: 'none', background: 'none', fontSize: '1.1rem', cursor: 'pointer' }}
            >
              Partners (Trust Logos)
            </button>
            <button 
              className={`admin-text-btn ${activeTab === 'whyTravel' ? 'active' : ''}`}
              onClick={() => setActiveTab('whyTravel')}
              style={{ fontWeight: activeTab === 'whyTravel' ? 'bold' : 'normal', color: activeTab === 'whyTravel' ? 'var(--primary-gold)' : 'var(--text-light)', border: 'none', background: 'none', fontSize: '1.1rem', cursor: 'pointer' }}
            >
              Why Travel Features
            </button>
            <button 
              className={`admin-text-btn ${activeTab === 'premiumServices' ? 'active' : ''}`}
              onClick={() => setActiveTab('premiumServices')}
              style={{ fontWeight: activeTab === 'premiumServices' ? 'bold' : 'normal', color: activeTab === 'premiumServices' ? 'var(--primary-gold)' : 'var(--text-light)', border: 'none', background: 'none', fontSize: '1.1rem', cursor: 'pointer' }}
            >
              Premium Services
            </button>
            <button 
              className={`admin-text-btn ${activeTab === 'contact' ? 'active' : ''}`}
              onClick={() => setActiveTab('contact')}
              style={{ fontWeight: activeTab === 'contact' ? 'bold' : 'normal', color: activeTab === 'contact' ? 'var(--primary-gold)' : 'var(--text-light)', border: 'none', background: 'none', fontSize: '1.1rem', cursor: 'pointer' }}
            >
              Contact Us Manager
            </button>
          </>
        )}
        {showBranding && !showBrandingOnly && (
          <button 
            className={`admin-text-btn ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
            style={{ fontWeight: activeTab === 'settings' ? 'bold' : 'normal', color: activeTab === 'settings' ? 'var(--primary-gold)' : 'var(--text-light)', border: 'none', background: 'none', fontSize: '1.1rem', cursor: 'pointer' }}
          >
            Branding Settings
          </button>
        )}
      </div>

      <div className="cms-content-area glass-panel" style={{ marginTop: '0px', padding: '15px', borderRadius: 'var(--radius-lg)' }}>
        {showBrandingOnly ? (
          <div>
            <h2 style={{ color: 'var(--text-white)', marginTop: '0px', marginBottom: '20px' }}>Website Branding Settings</h2>
            <form onSubmit={handleSaveSettings} style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '600px' }}>
              <div className="booking-form-group" style={{ marginBottom: '0' }}>
                <label style={{ display: 'block', marginBottom: '8px' }}>Logo Text Primary</label>
                <input 
                  type="text" 
                  className="auth-input" 
                  value={logoText} 
                  onChange={e => setLogoText(e.target.value)} 
                  placeholder="e.g. Happy Land"
                  required 
                />
              </div>
              <div className="booking-form-group" style={{ marginBottom: '0' }}>
                <label style={{ display: 'block', marginBottom: '8px' }}>Logo Text Span (Sub-branding)</label>
                <input 
                  type="text" 
                  className="auth-input" 
                  value={logoTextSpan} 
                  onChange={e => setLogoTextSpan(e.target.value)} 
                  placeholder="e.g. Group"
                  required 
                />
              </div>
              <div className="booking-form-group" style={{ marginBottom: '0' }}>
                <label style={{ display: 'block', marginBottom: '8px' }}>Logo Image URL (Optional Overlay)</label>
                <input 
                  type="text" 
                  className="auth-input" 
                  value={logoUrl} 
                  onChange={e => setLogoUrl(e.target.value)} 
                  placeholder="https://example.com/logo.png" 
                />
              </div>

              {/* Logo File Upload */}
              <div className="booking-form-group" style={{ marginBottom: '0' }}>
                <label style={{ display: 'block', marginBottom: '8px' }}>Upload Logo File (Overrides URL)</label>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <label className="btn-premium" style={{ border: 'none', cursor: 'pointer', padding: '10px 20px', borderRadius: 'var(--radius-md)', fontSize: '0.9rem', display: 'inline-block' }}>
                    Choose File
                    <input 
                      type="file" 
                      accept="image/*" 
                      style={{ display: 'none' }} 
                      onChange={handleFileChange}
                    />
                  </label>
                  {logoFile && (
                    <button 
                      type="button" 
                      className="admin-text-btn" 
                      onClick={handleRemoveFile} 
                      style={{ color: '#ff6b6b', border: 'none', background: 'none', cursor: 'pointer', fontSize: '0.9rem' }}
                    >
                      Clear Selection
                    </button>
                  )}
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    {logoFile ? logoFile.name : 'No file chosen'}
                  </span>
                </div>
              </div>

              {/* Logo Preview Container */}
              {(logoPreview || logoUrl) && (
                <div style={{ padding: '15px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '200px' }}>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Logo Preview</label>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(5, 11, 24, 0.5)', height: '80px', borderRadius: 'var(--radius-sm)', border: '1px dashed rgba(255, 255, 255, 0.1)', padding: '10px' }}>
                    <img 
                      src={logoPreview || getImageUrl(logoUrl)} 
                      alt="Logo Preview" 
                      style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} 
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  </div>
                </div>
              )}

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

              <div style={{ marginTop: '10px' }}>
                <button type="submit" className="btn-premium" style={{ border: 'none', cursor: 'pointer' }} disabled={savingSettings}>
                  {savingSettings ? 'Saving Settings...' : 'Save Branding Config'}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <>
            {activeTab === 'blogs' && <BlogManager />}
            {activeTab === 'trustLogos' && <TrustLogoManager />}
            {activeTab === 'whyTravel' && <WhyTravelManager />}
            {activeTab === 'premiumServices' && <PremiumServiceManager />}
            {activeTab === 'contact' && <ContactManager />}
            {activeTab === 'settings' && (
              <div>
                <h2 style={{ color: 'var(--text-white)', marginTop: '0px', marginBottom: '20px' }}>Website Branding Settings</h2>
                <form onSubmit={handleSaveSettings} style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '600px' }}>
                  <div className="booking-form-group" style={{ marginBottom: '0' }}>
                    <label style={{ display: 'block', marginBottom: '8px' }}>Logo Text Primary</label>
                    <input 
                      type="text" 
                      className="auth-input" 
                      value={logoText} 
                      onChange={e => setLogoText(e.target.value)} 
                      placeholder="e.g. Happy Land"
                      required 
                    />
                  </div>
                  <div className="booking-form-group" style={{ marginBottom: '0' }}>
                    <label style={{ display: 'block', marginBottom: '8px' }}>Logo Text Span (Sub-branding)</label>
                    <input 
                      type="text" 
                      className="auth-input" 
                      value={logoTextSpan} 
                      onChange={e => setLogoTextSpan(e.target.value)} 
                      placeholder="e.g. Group"
                      required 
                    />
                  </div>
                  <div className="booking-form-group" style={{ marginBottom: '0' }}>
                    <label style={{ display: 'block', marginBottom: '8px' }}>Logo Image URL (Optional Overlay)</label>
                    <input 
                      type="text" 
                      className="auth-input" 
                      value={logoUrl} 
                      onChange={e => setLogoUrl(e.target.value)} 
                      placeholder="https://example.com/logo.png" 
                    />
                  </div>

                  {/* Logo File Upload */}
                  <div className="booking-form-group" style={{ marginBottom: '0' }}>
                    <label style={{ display: 'block', marginBottom: '8px' }}>Upload Logo File (Overrides URL)</label>
                    <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
                      <label className="btn-premium" style={{ border: 'none', cursor: 'pointer', padding: '10px 20px', borderRadius: 'var(--radius-md)', fontSize: '0.9rem', display: 'inline-block' }}>
                        Choose File
                        <input 
                          type="file" 
                          accept="image/*" 
                          style={{ display: 'none' }} 
                          onChange={handleFileChange}
                        />
                      </label>
                      {logoFile && (
                        <button 
                          type="button" 
                          className="admin-text-btn" 
                          onClick={handleRemoveFile} 
                          style={{ color: '#ff6b6b', border: 'none', background: 'none', cursor: 'pointer', fontSize: '0.9rem' }}
                        >
                          Clear Selection
                        </button>
                      )}
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                        {logoFile ? logoFile.name : 'No file chosen'}
                      </span>
                    </div>
                  </div>

                  {/* Logo Preview Container */}
                  {(logoPreview || logoUrl) && (
                    <div style={{ padding: '15px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '200px' }}>
                      <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Logo Preview</label>
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(5, 11, 24, 0.5)', height: '80px', borderRadius: 'var(--radius-sm)', border: '1px dashed rgba(255, 255, 255, 0.1)', padding: '10px' }}>
                        <img 
                          src={logoPreview || getImageUrl(logoUrl)} 
                          alt="Logo Preview" 
                          style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} 
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      </div>
                    </div>
                  )}

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

                  <div style={{ marginTop: '10px' }}>
                    <button type="submit" className="btn-premium" style={{ border: 'none', cursor: 'pointer' }} disabled={savingSettings}>
                      {savingSettings ? 'Saving Settings...' : 'Save Branding Config'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );

  if (isEmbedded) {
    return renderContent();
  }

  return (
    <div className="dashboard-section" style={{ padding: '40px 0 60px' }}>
      <div className="container">
        <h1 className="editorial-title" style={{ fontSize: '2.5rem', marginBottom: '10px' }}>
          Content <em>Management System</em>
        </h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '40px' }}>
          Manage your website's dynamic content and branding configurations in real-time.
        </p>
        {renderContent()}
      </div>
    </div>
  );
};

export default ResourceManagers;
