/**
 * Configuration file for all URLs and constants
 */

const config = {
  // Base URLs
  baseURL: 'https://pratyusha.com.np',
  adminBaseURL: 'https://microsoft.pratyusha.com.np',

  // Page URLs
  urls: {
    home: '/',
    signup: '/auth/register',
    login: '/login',
    dashboard: '/dashboard',
    profile: '/profile',
    adminLogin: '/admin/auth/login',
    adminDashboard: '/admin/dashboard',
  },

  // Test data
  testData: {
    user: {
      firstName: 'Admin',
      lastName: 'User',
      email: 'microsoft01@yopmail.com',
      password: 'Password@123',
    },
  },

  // Timeouts
  timeouts: {
    short: 3000,
    medium: 5000,
    long: 10000,
  },
};

module.exports = config;
