const exec = require("../db/mysql")

/**
 * 登录函数
 * @param {*} username 用户名
 * @param {*} password 密码
 */
async function login(username, password) {
  let sql = `select username, realname from user where username='${username}' and password='${password}'`
  let result = await exec(sql)

  return result[0] || {}
}

module.exports = {
  login
}