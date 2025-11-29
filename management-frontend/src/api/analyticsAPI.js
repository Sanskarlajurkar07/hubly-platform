import api from './authAPI';

export const analyticsAPI = {
  // Get analytics metrics
  getMetrics: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return await api.get(`/analytics/metrics${query ? `?${query}` : ''}`);
  },

  // Get dashboard stats
  getStats: async () => {
    return await api.get('/analytics/stats');
  }
};