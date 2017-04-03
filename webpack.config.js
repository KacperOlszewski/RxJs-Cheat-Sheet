const NODE_ENV = process.env.NODE_ENV || 'dev';

console.log("Build for environment: ", NODE_ENV);
module.exports = require('./config/webpack/webpack.' + NODE_ENV);
