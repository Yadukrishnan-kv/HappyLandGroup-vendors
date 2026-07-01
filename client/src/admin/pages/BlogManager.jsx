import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';
import API from '../../api';

const BlogManager = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: 'Admin',
    tags: ''
  });
  const [file, setFile] = useState(null);

  const fetchBlogs = async () => {
    try {
      const res = await API.get('/blogs');
      setBlogs(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleOpenModal = (blog = null) => {
    if (blog) {
      setEditingId(blog._id);
      setFormData({
        title: blog.title,
        excerpt: blog.excerpt,
        content: blog.content,
        author: blog.author,
        tags: blog.tags.join(', ')
      });
    } else {
      setEditingId(null);
      setFormData({
        title: '',
        excerpt: '',
        content: '',
        author: 'Admin',
        tags: ''
      });
    }
    setFile(null);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this journal entry?")) return;
    try {
      await API.delete(`/blogs/${id}`);
      fetchBlogs();
    } catch (err) {
      alert("Failed to delete");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('excerpt', formData.excerpt);
    data.append('content', formData.content);
    data.append('author', formData.author);
    data.append('tags', formData.tags);
    if (file) {
      data.append('coverImage', file);
    }

    try {
      if (editingId) {
        await API.put(`/blogs/${editingId}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await API.post('/blogs', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      setModalOpen(false);
      fetchBlogs();
    } catch (err) {
      alert(err.response?.data?.message || "Operation failed");
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ color: 'var(--text-white)', marginTop: '0px' }}>Journal Entries</h2>
        <button className="btn-premium" onClick={() => handleOpenModal(null)}>
          <FiPlus /> Add Entry
        </button>
      </div>

      {loading ? <p>Loading...</p> : (
        <div className="admin-flat-table-container">
          <table className="admin-flat-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map(blog => (
                <tr key={blog._id}>
                  <td data-label="Title">{blog.title}</td>
                  <td data-label="Author">{blog.author}</td>
                  <td data-label="Date">{new Date(blog.publishedAt).toLocaleDateString()}</td>
                  <td data-label="Actions">
                    <button onClick={() => handleOpenModal(blog)} style={{ background: 'none', border: 'none', color: '#3498db', cursor: 'pointer', marginRight: '10px' }}><FiEdit size={18} /></button>
                    <button onClick={() => handleDelete(blog._id)} style={{ background: 'none', border: 'none', color: '#ff6b6b', cursor: 'pointer' }}><FiTrash2 size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {modalOpen && createPortal(
        <div className="admin-modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>{editingId ? 'Edit Journal Entry' : 'Publish Bespoke Journal Entry'}</h3>
              <button className="admin-modal-close" onClick={() => setModalOpen(false)}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="admin-modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="booking-form-group" style={{ marginBottom: '0' }}>
                  <label>Title</label>
                  <input type="text" className="auth-input" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
                </div>
                <div className="booking-form-group" style={{ marginBottom: '0' }}>
                  <label>Excerpt</label>
                  <input type="text" className="auth-input" value={formData.excerpt} onChange={e => setFormData({...formData, excerpt: e.target.value})} required />
                </div>
                <div className="booking-form-group" style={{ marginBottom: '0' }}>
                  <label>Content (HTML)</label>
                  <textarea className="auth-input" style={{ minHeight: '150px', resize: 'vertical' }} value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} required />
                </div>
                <div style={{ display: 'flex', gap: '20px' }}>
                  <div className="booking-form-group" style={{ flex: 1, marginBottom: '0' }}>
                    <label>Author</label>
                    <input type="text" className="auth-input" value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} />
                  </div>
                  <div className="booking-form-group" style={{ flex: 1, marginBottom: '0' }}>
                    <label>Tags (comma separated)</label>
                    <input type="text" className="auth-input" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} />
                  </div>
                </div>
                <div className="booking-form-group" style={{ marginBottom: '0' }}>
                  <label>Cover Image {editingId && '(Leave blank to keep current)'}</label>
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

export default BlogManager;
