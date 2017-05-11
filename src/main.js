const config = require('../config')

const Raven = require('raven')
Raven.config(config.sentryUrl).install();

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
