import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FiEdit, FiTrash2, FiPlus, FiGlobe, FiFileText, FiCompass, FiBriefcase, FiSliders, FiHome, FiTrendingUp, FiUserCheck, FiAnchor, FiLayers } from 'react-icons/fi';
import API from '../../api';
import { getImageUrl, handleImageError } from '../../utils/imageHelper';

const AVAILABLE_ICONS = [
  { value: 'FiGlobe', label: 'Global (FiGlobe)', component: FiGlobe },
  { value: 'FiFileText', label: 'Document (FiFileText)', component: FiFileText },
  { value: 'FiCompass', label: 'Compass (FiCompass)', component: FiCompass },
  { value: 'FiBriefcase', label: 'Briefcase (FiBriefcase)', component: FiBriefcase },
  { value: 'FiSliders', label: 'Sliders (FiSliders)', component: FiSliders },
  { value: 'FiHome', label: 'Home (FiHome)', component: FiHome },
  { value: 'FiTrendingUp', label: 'Trending Up (FiTrendingUp)', component: FiTrendingUp },
  { value: 'FiUserCheck', label: 'User Verification (FiUserCheck)', component: FiUserCheck },
  { value: 'FiAnchor', label: 'Anchor (FiAnchor)', component: FiAnchor },
  { value: 'FiLayers', label: 'Layers (FiLayers)', component: FiLayers },
];

const PremiumServiceManager = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    icon: 'FiGlobe',
    shortDescription: '',
    title: '',
    about: '',
    order: 0,
    status: 'active'
  });
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const fetchServices = async () => {
    try {
      const res = await API.get('/premium-services/all');
      setServices(res.data.data || []);
    } catch (err) {
      console.error('Failed to retrieve premium services', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleOpenModal = (service = null) => {
    if (service) {
      setEditingId(service._id);
      setFormData({
        name: service.name,
        icon: service.icon || 'FiGlobe',
        shortDescription: service.shortDescription,
        title: service.title,
        about: service.about,
        order: service.order || 0,
        status: service.status || 'active'
      });
      setImagePreview(getImageUrl(service.image));
    } else {
      setEditingId(null);
      setFormData({
        name: '',
        icon: 'FiGlobe',
        shortDescription: '',
        title: '',
        about: '',
        order: services.length + 1,
        status: 'active'
      });
      setImagePreview(null);
    }
    setFile(null);
    setModalOpen(true);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you absolutely sure you want to delete this premium service? This action is permanent.")) return;
    try {
      await API.delete(`/premium-services/${id}`);
      fetchServices();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete service.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('icon', formData.icon);
    data.append('shortDescription', formData.shortDescription);
    data.append('title', formData.title);
    data.append('about', formData.about);
    data.append('order', formData.order);
    data.append('status', formData.status);
    if (file) {
      data.append('image', file);
    }

    try {
      if (editingId) {
        await API.put(`/premium-services/${editingId}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await API.post('/premium-services', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      setModalOpen(false);
      fetchServices();
    } catch (err) {
      alert(err.response?.data?.message || "Operation failed to commit service.");
    }
  };

  const renderIconComponent = (iconName) => {
    const match = AVAILABLE_ICONS.find(i => i.value === iconName);
    if (match) {
      const Icon = match.component;
      return <Icon size={20} />;
    }
    return <FiGlobe size={20} />;
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ color: 'var(--text-white)', marginTop: '0px' }}>Our Specialized Premium Services</h2>
        <button className="btn-premium" onClick={() => handleOpenModal(null)}>
          <FiPlus /> Add Premium Service
        </button>
      </div>

      {loading ? <p style={{ color: 'var(--text-muted)' }}>Loading premium services inventory...</p> : (
        <div className="admin-flat-table-container">
          <table className="admin-flat-table">
            <thead>
              <tr>
                <th>Cover</th>
                <th>Service Name</th>
                <th>Icon</th>
                <th>Title Coordinate</th>
                <th>Order</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map(service => (
                <tr key={service._id}>
                  <td data-label="Cover">
                    <img 
                      src={getImageUrl(service.image)} 
                      alt={service.name} 
                      style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px', border: '1px solid rgba(255, 255, 255, 0.1)' }} 
                      onError={handleImageError} 
                    />
                  </td>
                  <td data-label="Service Name" style={{ fontWeight: 600, color: 'var(--text-white)' }}>{service.name}</td>
                  <td data-label="Icon" style={{ color: 'var(--primary-gold)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {renderIconComponent(service.icon)}
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{service.icon}</span>
                    </div>
                  </td>
                  <td data-label="Title Coordinate" style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>{service.title}</td>
                  <td data-label="Order" style={{ color: 'var(--text-white)' }}>{service.order}</td>
                  <td data-label="Status">
                    <span className={`admin-badge ${service.status === 'active' ? 'active' : 'inactive'}`}>
                      {service.status}
                    </span>
                  </td>
                  <td data-label="Actions" style={{ textAlign: 'right' }}>
                    <button onClick={() => handleOpenModal(service)} style={{ background: 'none', border: 'none', color: '#3498db', cursor: 'pointer', marginRight: '15px' }}><FiEdit size={18} /></button>
                    <button onClick={() => handleDelete(service._id)} style={{ background: 'none', border: 'none', color: '#ff6b6b', cursor: 'pointer' }}><FiTrash2 size={18} /></button>
                  </td>
                </tr>
              ))}
              {services.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ padding: '30px', textAlign: 'center', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                    No specialized premium services catalogued. Please seed or add services.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {modalOpen && createPortal(
        <div className="admin-modal-backdrop" onClick={() => setModalOpen(false)} style={{ zIndex: 9999 }}>
          <div className="admin-modal" style={{ maxWidth: '800px', background: '#0a101d', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'var(--text-white)' }} onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <h3 style={{ color: 'var(--text-white)' }}>{editingId ? 'Edit Premium Service' : 'Add Premium Service'}</h3>
              <button className="admin-modal-close" onClick={() => setModalOpen(false)} style={{ color: 'var(--text-muted)' }}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="admin-modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxHeight: '70vh', overflowY: 'auto', padding: '25px' }}>
                <div className="admin-grid-1-2">
                  <div className="booking-form-group" style={{ marginBottom: '0' }}>
                    <label style={{ color: 'var(--text-light)' }}>Premium Service Name</label>
                    <input 
                      type="text" 
                      className="auth-input" 
                      style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'var(--text-white)' }}
                      value={formData.name} 
                      onChange={e => setFormData({...formData, name: e.target.value})} 
                      required 
                    />
                  </div>
                  <div className="booking-form-group" style={{ marginBottom: '0' }}>
                    <label style={{ color: 'var(--text-light)' }}>Service Icon Symbol</label>
                    <select 
                      className="auth-input" 
                      style={{ background: '#0d1626', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'var(--text-white)', height: '46px' }}
                      value={formData.icon} 
                      onChange={e => setFormData({...formData, icon: e.target.value})}
                      required
                    >
                      {AVAILABLE_ICONS.map(i => (
                        <option key={i.value} value={i.value} style={{ background: '#0a101d' }}>{i.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="booking-form-group" style={{ marginBottom: '0' }}>
                  <label style={{ color: 'var(--text-light)' }}>Detailed Narrative Title</label>
                  <input 
                    type="text" 
                    className="auth-input" 
                    style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'var(--text-white)' }}
                    value={formData.title} 
                    onChange={e => setFormData({...formData, title: e.target.value})} 
                    placeholder="e.g. VIP Yacht Charters: Ocean Splendors & Private Sailing"
                    required 
                  />
                </div>

                <div className="booking-form-group" style={{ marginBottom: '0' }}>
                  <label style={{ color: 'var(--text-light)' }}>Short Description</label>
                  <textarea 
                    className="auth-input" 
                    style={{ minHeight: '80px', resize: 'vertical', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'var(--text-white)' }} 
                    value={formData.shortDescription} 
                    onChange={e => setFormData({...formData, shortDescription: e.target.value})} 
                    placeholder="Brief 1-2 sentence description shown on the home page card grids..."
                    required 
                  />
                </div>

                <div className="booking-form-group" style={{ marginBottom: '0' }}>
                  <label style={{ color: 'var(--text-light)' }}>About (Detailed Exposition)</label>
                  <textarea 
                    className="auth-input" 
                    style={{ minHeight: '120px', resize: 'vertical', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'var(--text-white)', lineHeight: '1.6' }} 
                    value={formData.about} 
                    onChange={e => setFormData({...formData, about: e.target.value})} 
                    placeholder="Full luxury narrative detailing what makes this VVIP concierge service unique. Supports multi-line copy..."
                    required 
                  />
                </div>

                <div style={{ display: 'flex', gap: '20px' }}>
                  <div className="booking-form-group" style={{ flex: 1, marginBottom: '0' }}>
                    <label style={{ color: 'var(--text-light)' }}>Display Sequencing Order</label>
                    <input 
                      type="number" 
                      className="auth-input" 
                      style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'var(--text-white)' }}
                      value={formData.order} 
                      onChange={e => setFormData({...formData, order: e.target.value})} 
                    />
                  </div>
                  <div className="booking-form-group" style={{ flex: 1, marginBottom: '0' }}>
                    <label style={{ color: 'var(--text-light)' }}>Operational Status</label>
                    <select 
                      className="auth-input" 
                      style={{ background: '#0d1626', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'var(--text-white)', height: '46px' }}
                      value={formData.status} 
                      onChange={e => setFormData({...formData, status: e.target.value})}
                    >
                      <option value="active" style={{ background: '#0a101d' }}>Active</option>
                      <option value="inactive" style={{ background: '#0a101d' }}>Inactive</option>
                    </select>
                  </div>
                </div>

                <div className="booking-form-group" style={{ marginBottom: '0' }}>
                  <label style={{ color: 'var(--text-light)' }}>Upload Cover Luxury Image {editingId && '(Leave blank to keep current)'}</label>
                  <input 
                    type="file" 
                    onChange={handleFileChange} 
                    accept="image/*" 
                    style={{ color: 'var(--text-light)', marginTop: '8px' }} 
                  />
                </div>

                {imagePreview && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '240px' }}>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Cover Preview</label>
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      style={{ width: '100%', height: '130px', objectFit: 'cover', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.1)' }} 
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  </div>
                )}
              </div>
              <div className="admin-modal-footer" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', padding: '20px 25px' }}>
                <button type="button" className="btn-cancel-booking" onClick={() => setModalOpen(false)} style={{ border: 'none', cursor: 'pointer', padding: '12px 24px' }}>Cancel</button>
                <button type="submit" className="btn-premium" style={{ border: 'none', cursor: 'pointer', padding: '12px 24px' }}>Save Changes</button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default PremiumServiceManager;
