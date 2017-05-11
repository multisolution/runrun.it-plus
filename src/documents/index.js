const config = require('../../config')
const electron = require('electron')
const fs = require('fs')
const FTP = require('ftp')
const { parse } = require('@multisolution/multipart-parser')
const redisMod = require('redis')

const { shell } = electron
const redis = redisMod.createClient(config.redis)
const webview = document.getElementById('webview')
const ftp = new FTP()

redis.on('error', err => {
  throw err
})

webview.addEventListener('new-window', event => {
  const { url } = event
  const downloadRegexp = /https:\/\/secure\.runrun\.it\/documents\/(\d+)\/download/
  const matches = url.match(downloadRegexp)

  if (matches && matches.length > 1) {
    const docId = matches[1]

    redis.get(docId, (err, data) => {
      if (err) throw err

      if (data === null) {
        shell.openExternal(url)
        return
      }

      const docJson = data.toString()
      const docMeta = JSON.parse(docJson)
      const { ext } = docMeta
      const downloadUrl = `http://${config.ftp.host}/${docId}.${ext}`

      shell.openExternal(downloadUrl)
    })

    return
  }

  shell.openExternal(url)
})

webview.addEventListener('dom-ready', event => {
  const contents = webview.getWebContents()
  const { session } = contents
  const { webRequest } = session

  webRequest.onBeforeRequest({
    urls: ['https://s3.amazonaws.com/runrunit']
  }, (details, callback) => {
    const { uploadData } = details

    callback({ cancel: false })

    if (typeof uploadData === 'undefined') {
      return
    }

    const raw = uploadData[0].bytes.toString('utf8')
    const data = parse(raw)

    const [, docId] = (/data\/(\d+)\//).exec(data.key.value)
    const [, ext] = (/\.([A-z]+)$/).exec(data.key.value)
    const { file } = uploadData[1]

    ftp.on('ready', event => {
      ftp.put(file, `/var/www/html/${docId}.${ext}`, err => {
        if (err) throw err
        redis.set(docId, JSON.stringify({ ext }))
        ftp.end()
      })
    })

    ftp.connect(config.ftp)
  })
})
