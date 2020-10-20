import mongoose from 'mongoose'
const config = rootRequire('config')
let connection

// DB configuration
if (config.database.use === 'mongodb') {
  connection = mongoose.createConnection(config.database.mongoURL + 'timetable_management') // database name
  connection.on('error', (err) => console.log(err))
} else {
  console.log("failed to establish with db connection")
}

module.exports = connection
