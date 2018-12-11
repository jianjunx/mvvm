import Config from './config/index.js';

const TARGET = process.env.TARGET;

export default {
    input: './src/index.js',
    ...Config[TARGET]
  };