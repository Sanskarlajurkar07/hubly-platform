import api from './authAPI';

export const teamAPI = {
  // Get all team members
  getAll: async () => {
    return await api.get('/team');
  },

  // Add new team member (admin only)
  create: async (memberData) => {
    return await api.post('/team', memberData);
  },

  // Update team member
  update: async (id, memberData) => {
    return await api.put(`/team/${id}`, memberData);
  },

  // Delete team member (admin only)
  delete: async (id) => {
    return await api.delete(`/team/${id}`);
  }
};