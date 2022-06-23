import type { Configuration } from 'webpack';

module.exports = {
  entry: {
    background: 'src/background.ts',
    content_scripts: 'src/content_scripts.ts',
  },
} as Configuration;
