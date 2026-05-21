import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';
import API from '../../api';
import { getImageUrl, handleImageError } from '../../utils/imageHelper';

const WhyTravelManager = () => {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    order: 0,
    status: 'active'
  });
  const [file, setFile] = useState(null);

  const fetchFeatures = async () => {
    try {
      const res = await API.get('/why-travel/all');
      setFeatures(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeatures();
  }, []);

  const handleOpenModal = (feature = null) => {
    if (feature) {
      setEditingId(feature._id);
      setFormData({
        title: feature.title,
        description: feature.description,
        order: feature.order,
        status: feature.status
      });
    } else {
      setEditingId(null);
      setFormData({
        title: '',
        description: '',
        order: 0,
        status: 'active'
      });
    }
    setFile(null);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this feature?")) return;
    try {
      await API.delete(`/why-travel/${id}`);
      fetchFeatures();
    } catch (err) {
      alert("Failed to delete");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('order', formData.order);
    data.append('status', formData.status);
    if (file) {
      data.append('icon', file);
    }

    try {
      if (editingId) {
        await API.put(`/why-travel/${editingId}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await API.post('/why-travel', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      setModalOpen(false);
      fetchFeatures();
    } catch (err) {
      alert(err.response?.data?.message || "Operation failed");
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ color: 'var(--text-white)', marginTop: '0px' }}>Why Travel Features</h2>
        <button className="btn-premium" onClick={() => handleOpenModal(null)}>
          <FiPlus /> Add Feature
        </button>
      </div>

      {loading ? <p>Loading...</p> : (
        <table className="admin-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left' }}>
              <th style={{ padding: '15px' }}>Icon</th>
              <th style={{ padding: '15px' }}>Title</th>
              <th style={{ padding: '15px' }}>Order</th>
              <th style={{ padding: '15px' }}>Status</th>
              <th style={{ padding: '15px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {features.map(feature => (
              <tr key={feature._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '15px' }}>
                  {feature.icon ? (
                    <img src={getImageUrl(feature.icon)} alt={feature.title} style={{ height: '40px', width: '40px', objectFit: 'contain' }} onError={handleImageError} />
                  ) : (
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No Icon</span>
                  )}
                </td>
                <td style={{ padding: '15px' }}>{feature.title}</td>
                <td style={{ padding: '15px' }}>{feature.order}</td>
                <td style={{ padding: '15px' }}>
                  <span className={`admin-badge ${feature.status === 'active' ? 'active' : 'inactive'}`}>{feature.status}</span>
                </td>
                <td style={{ padding: '15px' }}>
                  <button onClick={() => handleOpenModal(feature)} style={{ background: 'none', border: 'none', color: '#3498db', cursor: 'pointer', marginRight: '10px' }}><FiEdit size={18} /></button>
                  <button onClick={() => handleDelete(feature._id)} style={{ background: 'none', border: 'none', color: '#ff6b6b', cursor: 'pointer' }}><FiTrash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {modalOpen && createPortal(
        <div className="admin-modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="admin-modal" style={{ maxWidth: '800px' }} onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>{editingId ? 'Edit Why Travel Feature' : 'Add Why Travel Feature'}</h3>
              <button className="admin-modal-close" onClick={() => setModalOpen(false)}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="admin-modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="booking-form-group" style={{ marginBottom: '0' }}>
                  <label>Feature Title</label>
                  <input type="text" className="auth-input" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
                </div>
                <div className="booking-form-group" style={{ marginBottom: '0' }}>
                  <label>Description</label>
                  <textarea className="auth-input" style={{ minHeight: '100px', resize: 'vertical' }} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required />
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
                  <label>Feature Icon File {editingId && '(Leave blank to keep current)'}</label>
                  <input type="file" onChange={e => setFile(e.target.files[0])} accept="image/*" style={{ color: 'var(--dark-soft)' }} required={!editingId} />
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

export default WhyTravelManager;
