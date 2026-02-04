import { apiService } from './api.service';
import { API_ENDPOINTS } from '../constants/api';

/**
 * User Service - Handles all user-related API calls
 */
export const userService = {
  /**
   * Get all users
   */
  async getAll() {
    const data = await apiService.get(API_ENDPOINTS.USERS);
    return data.results || data;
  },

  /**
   * Get user by ID
   */
  async getById(id) {
    return apiService.get(`${API_ENDPOINTS.USERS}${id}/`);
  },

  /**
   * Create new user
   */
  async create(userData) {
    // Normalize team field - empty string should be null
    const normalizedData = {
      ...userData,
      team: userData.team || null
    };
    return apiService.post(API_ENDPOINTS.USERS, normalizedData);
  },

  /**
   * Update user
   */
  async update(id, userData) {
    // Normalize team field - empty string should be null
    const normalizedData = {
      ...userData,
      team: userData.team || null
    };
    return apiService.put(`${API_ENDPOINTS.USERS}${id}/`, normalizedData);
  },

  /**
   * Delete user
   */
  async delete(id) {
    return apiService.delete(`${API_ENDPOINTS.USERS}${id}/`);
  },
};
