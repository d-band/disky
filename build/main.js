module.exports = (config) => {
  config.target = 'electron-main';
  config.entry = {
    main: './src/main.js'
  };
  config.node = {
    __dirname: false,
    __filename: false
  };
  return config;
}