const path = require('path');

module.exports = {
  apps: [
    {
      name: 'test-app',
      script: path.resolve('dist', 'back', 'index.js'),
      env_production: {
        PORT: 33000,
        MESSAGE: 'THIS IS MESSAGE FROM PM2'
      }
    }
  ]
}