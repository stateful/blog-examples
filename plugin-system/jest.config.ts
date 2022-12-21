import type { Config } from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  transform: {
    '\\.(ts|tsx)$': 'ts-jest',
  },
  testRegex: '/test/.*\\.test.(ts|tsx|js)$',
  testEnvironment: 'jest-environment-node',
  globals: {
    'ts-jest': {
      isolatedModules: false,
    },
  },
};

export default config;
