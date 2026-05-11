module.exports = {
  collectCoverageFrom: ['app.js', '!**/node_modules/**', '!**/coverage/**'],
  coverageThreshold: {
    global: {
      statements: 70,
      branches: 60,
      functions: 70,
      lines: 70,
    },
  },
  testEnvironment: 'node',
  verbose: true,
};
