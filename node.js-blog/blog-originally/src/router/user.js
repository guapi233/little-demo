const { login } = require("../controller/user")
const { SuccessModel, FailModel } = require("../model/resModel")
const API = "/api/user/"
const { set } = require("../db/redis")

async function userHandler(req, res) {
  const method = req.method
  const postData = req.postData

  if (method === "GET" && req.path === `${API}login`) {
    // let result = await login(postData.username, postData.password)
    let result = await login(req.query.username, req.query.password)
    
    if (result.username) {
      // 设置session
      req.session.username = result.username
      req.session.realname = result.realname

      // 同步到redis
      set(req.sessionId, req.session)

      return new SuccessModel("登陆成功")
    }

    return new FailModel("登陆失败")
  }

  if (method === "GET" && req.path === `${API}checklogin`) {
    if (req.session && req.session.username) {
      return new SuccessModel({
        username: req.session.username
      })
    }

    return new FailModel("尚未登录")
  }
}

module.exports = userHandler