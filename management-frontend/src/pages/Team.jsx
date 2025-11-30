import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import AddMemberModal from '../components/TeamManagement/AddMemberModal';
import EditMemberModal from '../components/TeamManagement/EditMemberModal';
import DeleteConfirmModal from '../components/TeamManagement/DeleteConfirmModal';
import userAvatar from '../assets/image.svg';
import '../styles/team.css';

const Team = () => {
  const [team, setTeam] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const { user } = useAuth();

  const fetchTeam = async () => {
    try {
      const res = await api.get('/team');
      setTeam(res.data || []);
    } catch (error) {
      console.error('Failed to fetch team', error);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const handleAdd = async (data) => {
    try {
      await api.post('/team', data);
      setShowAdd(false);
      fetchTeam();
    } catch (err) {
      throw err;
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      await api.put(`/team/${id}`, data);
      setShowEdit(false);
      setSelectedMember(null);
      fetchTeam();
    } catch (err) {
      throw err;
    }
  };

  const handleDeleteConfirm = async (id) => {
    try {
      await api.delete(`/team/${id}`);
      setShowDelete(false);
      setSelectedMember(null);
      fetchTeam();
    } catch (err) {
      console.error('Failed to delete member', err);
    }
  };

  return (
    <div className="team-page">
      <div className="page-header">
        <h1>Team</h1>
      </div>

      <div className="team-table-wrapper">
        <table className="team-table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Role</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {team.map(member => (
              <tr key={member._id} className="team-row">
                <td className="col-name">
                  <div className="name-cell">
                    <div className="avatar">
                      <img src={userAvatar} alt={member.name} />
                    </div>
                    <div className="name-block">
                      <div className="member-name">{member.name}</div>
                      <div className="member-sub">{member.email}</div>
                    </div>
                  </div>
                </td>
                <td className="col-phone">{member.phone || '--'}</td>
                <td className="col-email">{member.email}</td>
                <td className="col-role">{member.role === 'admin' ? 'Admin' : 'Member'}</td>
                <td className="col-actions">
                  {(user.role === 'admin' || user._id === member._id) && (
                    <div className="action-buttons">
                      <button
                        className="icon-btn edit"
                        title="Edit"
                        onClick={() => { setSelectedMember(member); setShowEdit(true); }}
                      >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5.345 13.2417L13.7967 4.78999L12.6183 3.61166L4.16667 12.0633V13.2417H5.345ZM6.03583 14.9083H2.5V11.3725L12.0292 1.84332C12.1854 1.6871 12.3974 1.59933 12.6183 1.59933C12.8393 1.59933 13.0512 1.6871 13.2075 1.84332L15.565 4.20082C15.7212 4.3571 15.809 4.56902 15.809 4.78999C15.809 5.01096 15.7212 5.22288 15.565 5.37916L6.03583 14.9083ZM2.5 16.575H17.5V18.2417H2.5V16.575Z" fill="#545454" />
                        </svg>
                      </button>
                      {user.role === 'admin' && member.role !== 'admin' && (
                        <button
                          className="icon-btn delete"
                          title="Delete"
                          onClick={() => { setSelectedMember(member); setShowDelete(true); }}
                        >
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.00033 15.8333C5.00033 16.2754 5.17592 16.6993 5.48848 17.0118C5.80104 17.3244 6.22496 17.5 6.66699 17.5H13.3337C13.7757 17.5 14.1996 17.3244 14.5122 17.0118C14.8247 16.6993 15.0003 16.2754 15.0003 15.8333V5.83333H5.00033V15.8333ZM6.66699 7.5H13.3337V15.8333H6.66699V7.5ZM12.917 3.33333L12.0837 2.5H7.91699L7.08366 3.33333H4.16699V5H15.8337V3.33333H12.917Z" fill="#545454" />
                          </svg>
                        </button>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {user.role === 'admin' && (
        <div className="add-member-container">
          <button className="add-team-btn" onClick={() => setShowAdd(true)}>
            <svg className="btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            <span className="btn-text">Add Team members</span>
          </button>
        </div>
      )}

      {showAdd && (
        <AddMemberModal
          onClose={() => setShowAdd(false)}
          onSave={handleAdd}
        />
      )}

      {showEdit && selectedMember && (
        <EditMemberModal
          member={selectedMember}
          currentUser={user}
          onClose={() => setShowEdit(false)}
          onSave={handleUpdate}
        />
      )}

      {showDelete && selectedMember && (
        <DeleteConfirmModal
          member={selectedMember}
          onClose={() => setShowDelete(false)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
};

export default Team;