// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  globals: {
    NODE_ENV: 'test',
  },
  testEnvironment: 'jsdom',
  // Indicates whether each individual test should be reported during the run
  verbose: true,
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
  // The directory where Jest should output its   files
  coverageDirectory: 'coverage',
  // The glob patterns Jest uses to detect test files
  testMatch: [
    '**/tests/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
  ],
  // A map from regular expressions to module names that allow to stub out resources with a single module
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^Components(.*)$': '<rootDir>/src/components$1',
    '^Config(.*)$': '<rootDir>/src/config$1',
    '^Constants(.*)$': '<rootDir>/src/constants$1',
    '^Contexts(.*)$': '<rootDir>/src/contexts$1',
    '^Pages(.*)$': '<rootDir>/src/pages$1',
    '^Public(.*)$': '<rootDir>/public$1',
    '^Hooks(.*)$': '<rootDir>/src/hooks$1',
    '^Fonts(.*)$': '<rootDir>/src/fonts$1',
    '^Images(.*)$': '<rootDir>/src/images$1',
    '^Layouts(.*)$': '<rootDir>/src/layouts$1',
    '^Routes(.*)$': '<rootDir>/src/routes$1',
    '^Services(.*)$': '<rootDir>/src/services$1',
    '^Styles(.*)$': '<rootDir>/src/styles$1',
    '^Utils(.*)$': '<rootDir>/src/utils$1',
    '\\.(css|less|scss)$': 'identity-obj-proxy',
  },
  // A map from regular expressions to paths to transformers
  transform: {
    '\\.[jt]sx?$': 'babel-jest',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': 'jest-transform-stub',
  },
};