import api from './authAPI';

export const ticketAPI = {
  // Get all tickets with optional filters
  getAll: async (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    return await api.get(`/tickets${params ? `?${params}` : ''}`);
  },

  // Get single ticket by ID
  getById: async (id) => {
    return await api.get(`/tickets/${id}`);
  },

  // Search ticket by ticket ID
  searchByTicketId: async (ticketId) => {
    return await api.get(`/tickets/search/${ticketId}`);
  },

  // Update ticket status
  updateStatus: async (id, status) => {
    return await api.patch(`/tickets/${id}/status`, { status });
  },

  // Assign ticket to team member
  assignTicket: async (id, assignedTo) => {
    return await api.patch(`/tickets/${id}/assign`, { assignedTo });
  },

  // Delete ticket
  deleteTicket: async (id) => {
    return await api.delete(`/tickets/${id}`);
  },

  // Get dashboard stats
  getStats: async () => {
    return await api.get('/tickets/stats');
  }
};