module.exports = {
  testEnvironment: 'jsdom',
  coverageProvider: 'v8',

  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@/hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@/contexts/(.*)$': '<rootDir>/src/contexts/$1',
    '^@/constants/(.*)$': '<rootDir>/src/constants/$1',
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
