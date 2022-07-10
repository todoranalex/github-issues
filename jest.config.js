function getCoverageReporters() {
  let coverageReporters = ['html'];

  if (process.env.COV_CONSOLE_OUTPUT === 'true') {
    // Show coverage in console output, but hide report lines for fully-covered files
    // Useful when you want to collect coverage for a file in isolation
    coverageReporters = [...coverageReporters, ['text', {skipFull: true}]];
  }

  return coverageReporters;
}

module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFiles: ['./__tests__/setup.js'],
  collectCoverageFrom: ['<rootDir>/**/*.{ts,tsx}'],
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: getCoverageReporters(),
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  testPathIgnorePatterns: [
    '\\.snap$',
    '<rootDir>/node_modules/',
    '<rootDir>/__tests__/setup.js',
    '<rootDir>/__tests__/resources.ts',
    '<rootDir>/__tests__/mockData',
    '<rootDir>/__tests__/utils.ts',
  ],
  transformIgnorePatterns: ['node_modules/(?!@react-native|react-native)'],
};
