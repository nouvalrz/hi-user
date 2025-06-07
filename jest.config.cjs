module.exports = {
  testEnvironment: 'jsdom',
  coverageProvider: 'v8',

  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/pages/(.*)$': '<rootDir>/src/pages/$1',
  },

  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },


  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/components/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/pages/**/*.{js,jsx,ts,tsx}',
  ],

  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
};
