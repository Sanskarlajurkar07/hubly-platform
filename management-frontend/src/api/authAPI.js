import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Pass through network errors for fallback handling
    if (!error.response) {
      return Promise.reject(error);
    }

    console.error('API Error:', error);
    
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    
    const errorData = error.response?.data || {};
    const errorMessage = errorData.message || errorData.error || error.message || 'An error occurred';
    
    return Promise.reject({
      message: errorMessage,
      status: error.response?.status,
      data: errorData
    });
  }
);

// Mock users for development
const mockUsers = [
  {
    _id: '1',
    name: 'Admin User',
    email: 'admin@hubly.com',
    password: 'admin123',
    role: 'admin'
  },
  {
    _id: '2',
    name: 'Team Member',
    email: 'team@hubly.com',
    password: 'team123',
    role: 'team'
  },
  {
    _id: '3',
    name: 'Supervisor',
    email: 'supervisor@hubly.com',
    password: 'supervisor123',
    role: 'supervisor'
  }
];

// Mock authentication helper
const generateMockToken = (user) => {
  return `mock_token_${user._id}_${Date.now()}`;
};

// Mock API calls
const mockAuthAPI = {
  signup: async (userData) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newUser = {
      _id: String(mockUsers.length + 1),
      name: userData.name,
      email: userData.email,
      role: 'team'
    };
    return {
      user: newUser,
      token: generateMockToken(newUser)
    };
  },

  login: async (credentials) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const user = mockUsers.find(u => u.email === credentials.email && u.password === credentials.password);
    if (!user) {
      throw {
        message: 'Invalid email or password'
      };
    }
    const { password, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      token: generateMockToken(user)
    };
  },

  me: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
      user: mockUsers[0]
    };
  },

  updateProfile: async (profileData) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
      user: { ...mockUsers[0], ...profileData }
    };
  }
};

// Try real API first, fallback to mock if network error
const createAuthAPI = () => {
  return {
    signup: async (userData) => {
      try {
        return await api.post('/auth/signup', userData);
      } catch (error) {
        if (error.code === 'ERR_NETWORK' || error.status === undefined) {
          console.log('Backend unavailable, using mock authentication');
          return await mockAuthAPI.signup(userData);
        }
        throw error;
      }
    },

    login: async (credentials) => {
      try {
        return await api.post('/auth/login', credentials);
      } catch (error) {
        if (error.code === 'ERR_NETWORK' || error.status === undefined) {
          console.log('Backend unavailable, using mock authentication');
          return await mockAuthAPI.login(credentials);
        }
        throw error;
      }
    },

    me: async () => {
      try {
        return await api.get('/auth/me');
      } catch (error) {
        if (error.code === 'ERR_NETWORK' || error.status === undefined) {
          return await mockAuthAPI.me();
        }
        throw error;
      }
    },

    updateProfile: async (profileData) => {
      try {
        return await api.put('/auth/update-profile', profileData);
      } catch (error) {
        if (error.code === 'ERR_NETWORK' || error.status === undefined) {
          return await mockAuthAPI.updateProfile(profileData);
        }
        throw error;
      }
    },

    logout: () => {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  };
};

export const authAPI = createAuthAPI();

export default api;