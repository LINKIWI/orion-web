module.exports = {
  collectCoverageFrom: ['<rootDir>/src/**/*.js'],
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
  },
  setupFiles: ['./test/setup.js'],
  verbose: true,
};
