// const env = process.env.NODE_ENV

let db_conf = {
  host: "localhost",
  user: "root",
  password: "root",
  port: 3306,
  database: "blog20200528"
}

let redis_conf = {
  host: "localhost",
  port: 6379
}

module.exports = {
  db_conf,
  redis_conf
}