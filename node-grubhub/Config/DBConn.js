var mysql = require('mysql')
var pool = mysql.createPool({
  connectionLimit: 10000,
  host: 'localhost',
  user: 'Vamsi',
  password: 'Sakura',
  database: '2_gym_database'
})
var dbParameters = require('./DBdetails')
exports.executeQuery = function (sql, callback) {
  var conn = mysql.createConnection(dbParameters.dbDetails)
  conn.connect(function (err) {
    console.log(sql)
    if (err) throw err
    conn.query(sql, function (err, result) {
      if (err) throw err
      callback(err, result)
    })
  })
}
