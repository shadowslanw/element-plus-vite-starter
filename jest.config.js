const path = require('path');

module.exports = {
    rootDir: path.join(__dirname, 'src'),
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1', // 配合vite.config.ts 中的resolve.alias['@']
        // 'ant-design-vue$': '<rootDir>/node_modules/ant-design-vue/lib/index.js',
    },
    // 浏览器环境项目，需要设置此选项
    testEnvironment: 'jsdom', 
    // 转义
    transform: {
      '^.+\\.vue$': 'vue-jest',
      '^.+\\js$': 'babel-jest',
      '^.+\\.(t|j)sx?$': 'ts-jest'
    },
    transformIgnorePatterns: [
        '/dist/',
        // Ignore modules without es dir.
        // Update: @babel/runtime should also be transformed
        'node_modules/(?!.*(@babel|lodash-es))[^/]+?/(?!(es|node_modules)/)',
    ],
    moduleFileExtensions: ['vue', 'js', 'json', 'jsx', 'ts', 'tsx', 'node'],
    // 开启测试报告
    collectCoverage: true, 
    coverageDirectory: '../testReport/coverage',
    // 定义需要收集测试覆盖率信息的文件
    collectCoverageFrom: [
        '**/*.{js,ts,vue}',
        '!**/node_modules/**',
        '!<rootDir>/main.ts'
    ], 
    coverageReporters: ['html', 'text-summary'],
    setupFiles: [path.join(__dirname, 'jest.setup.js')],
    globals: {
        'ts-jest': {
            babelConfig: true,
        },
    },

    // jest-stare
    reporters: [
        'default',
        [
            'jest-stare',
            {
                resultDir: './testReport/jest-stare',
                reportTitle: '测试报告',
                reportSummary: false,
                additionalResultsProcessors: [
                    'jest-junit',
                ],
                coverageLink: '../coverage/index.html',
                jestStareConfigJson: 'jest-stare.json',
                jestGlobalConfigJson: 'globalStuff.json'
            },
        ],
    ],
}