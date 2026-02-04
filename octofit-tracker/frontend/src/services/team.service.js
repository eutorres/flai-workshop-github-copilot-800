import { apiService } from './api.service';
import { API_ENDPOINTS } from '../constants/api';

/**
 * Team Service - Handles all team-related API calls
 */
export const teamService = {
  /**
   * Get all teams
   */
  async getAll() {
    const data = await apiService.get(API_ENDPOINTS.TEAMS);
    return data.results || data;
  },

  /**
   * Get team by ID
   */
  async getById(id) {
    return apiService.get(`${API_ENDPOINTS.TEAMS}${id}/`);
  },

  /**
   * Create new team
   */
  async create(teamData) {
    return apiService.post(API_ENDPOINTS.TEAMS, teamData);
  },

  /**
   * Update team
   */
  async update(id, teamData) {
    return apiService.put(`${API_ENDPOINTS.TEAMS}${id}/`, teamData);
  },

  /**
   * Delete team
   */
  async delete(id) {
    return apiService.delete(`${API_ENDPOINTS.TEAMS}${id}/`);
  },
};
