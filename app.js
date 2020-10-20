import express from 'express'
import bodyParser from 'body-parser'
import initAPISVersions from './api'

const app = express()

global.rootRequire = function (name) {
  return require(`${__dirname}/${name}`)
}
global.rootPath = __dirname

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

// initilize API versions
initAPISVersions(app, '')

module.exports = app
