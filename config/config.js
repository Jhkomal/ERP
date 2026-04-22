/**
 * Configuration file for all URLs and constants
 */

const config = {
  // Base URL
  baseURL: 'https://pratyusha.com.np',

  // Page URLs
  urls: {
    home: '/',
    signup: '/signup',
    login: '/login',
    dashboard: '/dashboard',
    profile: '/profile',
  },

  // Test data
  testData: {
    user: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'Test@1234',
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
