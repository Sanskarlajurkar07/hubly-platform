import api from './authAPI';

export const settingsAPI = {
  // Get chat bot settings
  getSettings: async () => {
    return await api.get('/settings');
  },

  // Update chat bot settings
  updateSettings: async (settingsData) => {
    return await api.put('/settings', settingsData);
  }
};