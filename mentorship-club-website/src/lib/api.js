// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

/**
 * Make an API request to the backend
 * @param {string} endpoint - API endpoint (e.g., '/api/auth/login')
 * @param {object} options - Fetch options (method, body, headers, etc.)
 * @returns {Promise} - Response data
 */
export async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Get token from localStorage if available
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  
  // Default headers
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  // Add authorization header if token exists
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  // Default options
  const defaultOptions = {
    headers,
    ...options,
  };
  
  try {
    const response = await fetch(url, defaultOptions);
    
    // Try to parse JSON response
    let data;
    try {
      data = await response.json();
    } catch (parseError) {
      // If response is not JSON, throw a network error
      throw new Error(`Invalid response from server: ${response.status} ${response.statusText}`);
    }
    
    // Backend uses { success: false, message: "..." } for errors
    // Return the data even if HTTP status is not ok (401, 400, etc.)
    // The calling code will check data.success to handle errors
    return data;
  } catch (error) {
    // Handle network errors or JSON parsing errors
    console.error('API Request Error:', error);
    
    // If it's a network error (not a parsed error from backend), wrap it
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Network error. Please check if the backend server is running.');
    }
    
    throw error;
  }
}

/**
 * Auth API functions
 */
export const authAPI = {
  login: async (email, password) => {
    const response = await apiRequest('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    // Transform backend response to match frontend expectations
    if (response.success && response.data) {
      return {
        success: true,
        token: response.data.token,
        user: response.data.user,
      };
    }
    return response;
  },
  
  signup: async (userData) => {
    const response = await apiRequest('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    
    // Transform backend response to match frontend expectations
    if (response.success && response.data) {
      return {
        success: true,
        token: response.data.token,
        user: response.data.user,
      };
    }
    return response;
  },
  
  getMe: async () => {
    return apiRequest('/api/auth/me');
  },
  
  logout: async () => {
    return apiRequest('/api/auth/logout', {
      method: 'POST',
    });
  },
  
  forgotPassword: async (email) => {
    return apiRequest('/api/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },
  
  resetPassword: async (token, newPassword) => {
    return apiRequest('/api/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, newPassword }),
    });
  },
};

export default apiRequest;

