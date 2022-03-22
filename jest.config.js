module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFiles: ['./__tests__/setup.js'],
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
