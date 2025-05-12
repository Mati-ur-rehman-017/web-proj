// jest.config.js
export default {
  transform: {
    "^.+\\.js$": "babel-jest"
  },
  testEnvironment: "node",
  collectCoverage: true,
  collectCoverageFrom: [
    "controllers/**/*.js",
    "routes/**/*.js",
    "models/**/*.js",
    "server.js"
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "html"]
};
