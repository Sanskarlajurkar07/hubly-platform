import { useState } from 'react';

function EditMemberModal({ member, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: member.name || '',
    email: member.email || '',
    phone: member.phone || '',
    password: '',
    role: member.role || 'team'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name) {
      setError('Name is required');
      return;
    }

    try {
      setLoading(true);
      const updateData = { ...formData };
      if (!updateData.password) {
        delete updateData.password;
      }
      delete updateData.email; // Email cannot be changed
      
      await onSave(member._id, updateData);
    } catch (err) {
      setError(err.message || 'Failed to update member');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Edit Team Member</h2>
          <button className="modal-close-btn" onClick={onClose}>
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="modal-body">
          {error && (
            <div className="modal-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">User name</label>
              <input
                type="text"
                name="name"
                className="form-input"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email ID</label>
              <input
                type="email"
                name="email"
                className="form-input"
                value={formData.email}
                disabled
                title="Email cannot be changed"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone</label>
              <input
                type="tel"
                name="phone"
                className="form-input"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">New Password (Leave blank to keep current)</label>
              <input
                type="password"
                name="password"
                className="form-input"
                placeholder="New password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Designation</label>
              <select
                name="role"
                className="form-select"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="team">Member</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditMemberModal;