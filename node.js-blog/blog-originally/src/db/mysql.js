const mysql = require("mysql")
const { db_conf } = require("../conf/db")

const db = mysql.createConnection(db_conf)

function exec(sql) {
  console.log(sql)
  return new Promise((resolve, reject) => {
    db.query(sql, (error, data) => {
      if (error) {
        reject(error)
      } else {
        resolve(data)
      }
    })
  })
}

module.exports = exec