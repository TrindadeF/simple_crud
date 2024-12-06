/** @type {import('jest').Config} */
const config = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  clearMocks: true,
  coverageDirectory: "coverage",
  collectCoverage: true,
  coverageReporters: ["text", "lcov"],
};

module.exports = config;
