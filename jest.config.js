module.exports = {
  verbose: true,
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  collectCoverage: true,
  collectCoverageFrom: ['**/src/**', '!**/*.stories.tsx'],
  coverageReporters: ['text', 'json'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['../jest.setup.js'],
};
