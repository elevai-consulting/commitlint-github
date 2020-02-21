module.exports = {
  collectCoverageFrom: ['packages/**/*.(ts)', '!packages/commitlint-github-e2e-tests/**'],
  coverageThreshold: {
    global: {
      statements: 90,
      branches: 90,
      functions: 95,
      lines: 95,
    },
  },
  testRegex: 'tests/.*\\.test\\.ts$',
  testPathIgnorePatterns: ['/packages/commitlint-github-e2e-tests/'],
  preset: 'ts-jest',
};
