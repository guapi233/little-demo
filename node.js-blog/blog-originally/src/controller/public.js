const { get, set } = require("../db/redis")
const { FailModel } = require("../model/resModel")

// 解析POST数据
function getPostData(req) { 
  let resData = ""

  return new Promise((resolve, reject) => {

    if (req.headers["content-type"] !== "application/json") {
      resolve({})
      return
    }

    req.on("data", data => {
      resData += data.toString()
    })

    req.on("end", () => {
      resData && resolve(JSON.parse(resData))
      resolve({})
    })
  })

}


// 解析cookie
function checkCookie(req) {
  req.cookie = {}
  let cookieStr = req.headers.cookie || ""

  if (!cookieStr) return

  cookieStr.split(";").forEach(item => {
    let arr = item.split("="), 
    key = arr[0].trim(), 
    val = arr[1].trim()

    req.cookie[key] = val
  })
}


// 解析session
async function checkSession(req, res) {
  checkCookie(req)
  
  // 获取从浏览器传来的session标识
  let userId = req.cookie.userid, needSetCookie = false, exsited = false
  // 如果存在标识且标识有对应的对象，则什么也不做；如果没有对应的对象，则新建一个
  if (userId) {
    let result = await get(userId)
    !result && (set(userId, {}))
    result && (exsited = true)
  } else { // 如果浏览器不存在标识，则新建一个表示并在存储中添加该标识对应的对象，并且将needSetCookie设置为true，在返回浏览器时将该标识设置上
    needSetCookie = true
    userId = `${Date.now()}_${Math.random()}`
    set(userId, {})
  }

  // 将req.session设置为标识对应的对象，方便进行登录判断以及后续操作
  exsited ?req.session = await get(userId) :req.session = {}
  req.sessionId = userId
    
  if (needSetCookie) res.setHeader("set-Cookie", `userid=${userId}; path="/";httpOnly`)
}


// 判断登录
function loginCheck(req) {
  if (!req.session || !req.session.username) {
    return new FailModel("尚未登录")
  }
}


module.exports = {
  getPostData,
  checkSession,
  loginCheck
}