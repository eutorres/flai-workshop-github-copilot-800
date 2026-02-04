// API Configuration
const CODESPACE_NAME = process.env.REACT_APP_CODESPACE_NAME;

export const API_BASE_URL = CODESPACE_NAME 
  ? `https://${CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

export const API_ENDPOINTS = {
  USERS: '/users/',
  TEAMS: '/teams/',
  ACTIVITIES: '/activities/',
  WORKOUTS: '/workouts/',
  LEADERBOARD: '/leaderboard/',
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};
