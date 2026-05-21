import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';
import API from '../../api';
import { getImageUrl, handleImageError } from '../../utils/imageHelper';

const TrustLogoManager = () => {
  const [logos, setLogos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    website: '',
    order: 0,
    status: 'active'
  });
  const [file, setFile] = useState(null);

  const fetchLogos = async () => {
    try {
      const res = await API.get('/trust-logos/all');
      setLogos(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogos();
  }, []);

  const handleOpenModal = (logo = null) => {
    if (logo) {
      setEditingId(logo._id);
      setFormData({
        name: logo.name,
        website: logo.website || '',
        order: logo.order,
        status: logo.status
      });
    } else {
      setEditingId(null);
      setFormData({
        name: '',
        website: '',
        order: 0,
        status: 'active'
      });
    }
    setFile(null);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this partner logo?")) return;
    try {
      await API.delete(`/trust-logos/${id}`);
      fetchLogos();
    } catch (err) {
      alert("Failed to delete");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('website', formData.website);
    data.append('order', formData.order);
    data.append('status', formData.status);
    if (file) {
      data.append('logo', file);
    }

    try {
      if (editingId) {
        await API.put(`/trust-logos/${editingId}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await API.post('/trust-logos', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      setModalOpen(false);
      fetchLogos();
    } catch (err) {
      alert(err.response?.data?.message || "Operation failed");
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ color: 'var(--text-white)', marginTop: '0px' }}>Partner Logos</h2>
        <button className="btn-premium" onClick={() => handleOpenModal(null)}>
          <FiPlus /> Add Logo
        </button>
      </div>

      {loading ? <p>Loading...</p> : (
        <table className="admin-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left' }}>
              <th style={{ padding: '15px' }}>Logo</th>
              <th style={{ padding: '15px' }}>Name</th>
              <th style={{ padding: '15px' }}>Order</th>
              <th style={{ padding: '15px' }}>Status</th>
              <th style={{ padding: '15px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {logos.map(logo => (
              <tr key={logo._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '15px' }}>
                  <img src={getImageUrl(logo.logo)} alt={logo.name} style={{ height: '40px' }} onError={handleImageError} />
                </td>
                <td style={{ padding: '15px' }}>{logo.name}</td>
                <td style={{ padding: '15px' }}>{logo.order}</td>
                <td style={{ padding: '15px' }}>
                  <span className={`admin-badge ${logo.status === 'active' ? 'active' : 'inactive'}`}>{logo.status}</span>
                </td>
                <td style={{ padding: '15px' }}>
                  <button onClick={() => handleOpenModal(logo)} style={{ background: 'none', border: 'none', color: '#3498db', cursor: 'pointer', marginRight: '10px' }}><FiEdit size={18} /></button>
                  <button onClick={() => handleDelete(logo._id)} style={{ background: 'none', border: 'none', color: '#ff6b6b', cursor: 'pointer' }}><FiTrash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {modalOpen && createPortal(
        <div className="admin-modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="admin-modal" style={{ maxWidth: '750px' }} onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>{editingId ? 'Edit Partner Logo' : 'Add Partner Logo'}</h3>
              <button className="admin-modal-close" onClick={() => setModalOpen(false)}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="admin-modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="booking-form-group" style={{ marginBottom: '0' }}>
                  <label>Partner Name</label>
                  <input type="text" className="auth-input" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
                </div>
                <div className="booking-form-group" style={{ marginBottom: '0' }}>
                  <label>Website URL (Optional)</label>
                  <input type="text" className="auth-input" value={formData.website} onChange={e => setFormData({...formData, website: e.target.value})} />
                </div>
                <div style={{ display: 'flex', gap: '20px' }}>
                  <div className="booking-form-group" style={{ flex: 1, marginBottom: '0' }}>
                    <label>Display Order</label>
                    <input type="number" className="auth-input" value={formData.order} onChange={e => setFormData({...formData, order: e.target.value})} />
                  </div>
                  <div className="booking-form-group" style={{ flex: 1, marginBottom: '0' }}>
                    <label>Status</label>
                    <select className="auth-input" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                <div className="booking-form-group" style={{ marginBottom: '0' }}>
                  <label>Upload Logo {editingId && '(Leave blank to keep current)'}</label>
                  <input type="file" onChange={e => setFile(e.target.files[0])} accept="image/*" style={{ color: 'var(--dark-soft)' }} />
                </div>
              </div>
              <div className="admin-modal-footer">
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

export default TrustLogoManager;
