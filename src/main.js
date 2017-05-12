const settings = require('../settings')
const Raven = require('raven')

Raven.config(settings.sentry.dsn).install()
Raven.context(function () {
  const { app, BrowserWindow } = require('electron')
  const path = require('path')
  const url = require('url')

  const appReady = () => {
    const window = new BrowserWindow({ width: 1280, height: 1024 })

    window.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    }))
  }

  app.on('ready', appReady)

  require('./menu')
})
