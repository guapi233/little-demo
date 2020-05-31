const blogHandler = require("./router/blog")
const userHandler = require("./router/user")
const querstring = require("querystring")
const { getPostData, checkSession } = require("./controller/public")

async function serverHandler(req, res) {
  let handledData = null
  req.path = req.url.split("?")[0]
  req.query = querstring.parse(req.url.split("?")[1])

  // 设置响应数据类型
  res.setHeader("Content-type", "application/json;charset=utf-8")

  // 设置跨域，处理OPTIONS请求
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Headers", "Content-type")
  res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS")
  if (req.method === "OPTIONS") {
    res.writeHeader(200)
    res.end()
    return
  }
  // 检测session
  await checkSession(req, res)

  // 获取POST数据
  req.method === "POST" && (req.postData = await getPostData(req))

  // 处理博客相关路由
  handledData = await blogHandler(req, res)
  if (handledData) {res.end(JSON.stringify(handledData)); return}

  // 处理用户相关路由
  handledData = await userHandler(req, res)
  if (handledData) {res.end(JSON.stringify(handledData)); return}

  // 404
  res.writeHeader(404, {"Content-type": "text/plain; charset=utf-8"})
  res.write("404了")
  res.end()
}

module.exports = serverHandler