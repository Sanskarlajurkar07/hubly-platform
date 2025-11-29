import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import '../styles/Team.css';

const Team = () => {
  const [team, setTeam] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '', role: 'team_member' });
  const { user } = useAuth();

  const fetchTeam = async () => {
    try {
      const res = await api.get('/team');
      setTeam(res.data);
    } catch (error) {
      console.error('Failed to fetch team', error);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/team', formData);
      setShowModal(false);
      setFormData({ name: '', email: '', phone: '', password: '', role: 'team_member' });
      fetchTeam();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to add member');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure? This will reassign their tickets to Admin.')) {
      try {
        await api.delete(`/team/${id}`);
        fetchTeam();
      } catch (error) {
        console.error('Failed to delete member', error);
      }
    }
  };

  return (
    <div className="team-page">
      <div className="page-header">
        <h1>Team Management</h1>
        {user.role === 'admin' && (
          <button className="add-btn" onClick={() => setShowModal(true)}>+ Add Member</button>
        )}
      </div>

      <div className="team-grid">
        {team.map(member => (
          <div key={member._id} className="member-card">
            <div className="member-avatar">{member.name.charAt(0)}</div>
            <div className="member-info">
              <h3>{member.name}</h3>
              <p className="role">{member.role.replace('_', ' ')}</p>
              <p className="email">{member.email}</p>
              <p className="phone">{member.phone}</p>
            </div>
            {user.role === 'admin' && member.role !== 'admin' && (
              <button className="delete-btn" onClick={() => handleDelete(member._id)}>Remove</button>
            )}
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add Team Member</h2>
            <form onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} required />
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required />
              <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleInputChange} required />
              <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} required />
              <select name="role" value={formData.role} onChange={handleInputChange}>
                <option value="team_member">Team Member</option>
                <option value="admin">Admin</option>
              </select>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="primary">Add</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Team;