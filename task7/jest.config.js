module.exports = {
    collectCoverageFrom: ['src/**/*.js'],
    coverageDirectory: 'reports/coverage',
    coverageReporters: ['lcov', 'text'],
    coverageThreshold: {
        global: {
            branches: 0,
            functions: 0,
            lines: 0,
            statements: 0
        }
    },
    testPathIgnorePatterns: ['/node_modules/'],
    testMatch: ['**/*.test.js'],
    moduleFileExtensions: ['js', 'json', 'node'],
    testEnvironment: 'node',
    roots: ['test'],
    verbose: true
};
