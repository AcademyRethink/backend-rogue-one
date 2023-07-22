/* 
 * For a detailed explanation regarding each configuration property and type check, visit:
 

export default {
  clearMocks: true,

  collectCoverage: true,

  coverageDirectory: 'coverage',

  preset: 'ts-jest'
}; */
 

/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  clearMocks: true,

  collectCoverage: true,

  coverageDirectory: 'coverage',
  preset: 'ts-jest',
  testEnvironment: 'node'
};