/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  clearMocks: true,

  collectCoverage: true,

  coverageDirectory: 'coverage',
  preset: 'ts-jest',
  testEnvironment: 'node'
};