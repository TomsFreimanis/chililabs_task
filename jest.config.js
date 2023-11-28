const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const config = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  preset: 'ts-jest',
  moduleNameMapper: {
    '^@lib/(.*)$': '<rootDir>/lib/$1', // Adjust this path based on your project structure
  },
};

module.exports = createJestConfig(config);
