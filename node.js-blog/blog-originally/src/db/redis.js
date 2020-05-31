const { redis_conf } = require("../conf/db")
const redis = require("redis")

let db = redis.createClient(redis_conf.port, redis_conf.host)

function get(key) {
  return new Promise((resolve, reject) => {
    db.get(key, (error, data) => {
      if (error) {
        reject(error)
        return
      }

      try {
        resolve(JSON.parse(data))
      } catch(e) {
        resolve(data)
      }
    })
  })
}

function set(key, val) {
  if (typeof val === "object") {
    val = JSON.stringify(val)
  }

  db.set(key, val, db.print)
}

module.exports = {
  get,
  set
}
