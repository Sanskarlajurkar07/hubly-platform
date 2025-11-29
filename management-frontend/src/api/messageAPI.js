import api from './authAPI';

export const messageAPI = {
  getChats: (params) => api.get('/messages/chats', { params }),
  getMessages: (chatId) => api.get(`/messages/chats/${chatId}`),
  getChatDetails: (chatId) => api.get(`/messages/chats/${chatId}/details`),
  sendMessage: (chatId, data) => api.post(`/messages/chats/${chatId}`, data),
  editMessage: (chatId, messageId, data) => api.put(`/messages/chats/${chatId}/${messageId}`, data),
  deleteMessage: (chatId, messageId) => api.delete(`/messages/chats/${chatId}/${messageId}`),
  searchMessages: (params) => api.get('/messages/search', { params }),
  archiveChat: (chatId) => api.put(`/messages/chats/${chatId}/archive`),
  deleteChat: (chatId) => api.delete(`/messages/chats/${chatId}`)
};
