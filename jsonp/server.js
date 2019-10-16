const http = require("http")
const url = require("url")

// 后台用于帮助前台调用想要起作用的函数，同时可以向前台期待的参数中传值

const server = http.createServer((req, res) => {
  let {param, cb} = url.parse(req.url, true).query
  let data = `server data`

  // jsonp 不安全的原因↓
  let resText = `eval("${cb}('${param}', '${data}')")`

  res.write(resText)
  res.end()

}).listen(8080)