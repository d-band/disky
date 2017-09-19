module.exports = (config) => {
  config.target = 'electron-renderer';
  config.entry = {
    index: './src/index.js'
  };
  return config;
}