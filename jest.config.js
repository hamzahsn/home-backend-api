module.exports = {
    rootDir: 'src',
    roots: ['<rootDir>'],
    testMatch: ['<rootDir>/__tests__/**/*.test.(ts|tsx|js|jsx)'],
    coverageDirectory: '<rootDir>/__tests__/coverage/',
    moduleDirectories: ['node_modules', 'src'],
    collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/src/**/*.test.ts', '!**/*.{d.ts}'],
    testEnvironment: 'node',
    transform: {
        '^.+\\.ts?$': 'ts-jest'
    },
    moduleFileExtensions: ['ts', 'js', 'json', 'node']
}
