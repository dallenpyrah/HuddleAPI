module.exports = {
  apps: [
    {
      name: 'demo-app',
      script: 'dist/index.js',
      instances: 0,
      exec_mode: 'cluster',
      watch: '.'
    }
  ]
}
