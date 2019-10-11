/**
 * create date: 2019-10-11
 * descripton: connection phase of originated Websocket connection
 */

const net = require("net")
const crypto = require("crypto") // node提供的算法集合API

// 建立原始TCP连接
let io = net.createServer(sock => {
  sock.once("data", buffer => {
    // 获取请求头(字符串类型)
    let reqHeader = buffer.toString()

    // 解析请求头
    reqHeader = parseHeader(reqHeader)

    if (reqHeader["upgrade"] != "websocket") {
      // socket升级请求无效
      sock.end()
    } else if (reqHeader["sec-websocket-version"] != "13") {
      // socket版本不统一
      sock.end()
    } else {
      // 升级请求许可的证明是返回指定格式的文本 (将请求头中的key与指定uuid结合，返回sha1验算的base64版本)
      let key = reqHeader["sec-websocket-key"]
      let uuid = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11"
      let resKey = crypto.createHash("sha1")
      resKey.update(key+uuid)
      resKey = resKey.digest("base64")

      // 返回相应头
      sock.write(`HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: upgrade\r\nSec-Websocket-Accept: ${resKey}\r\n\r\n`)
    }
  })
})

io.listen(7070)


function parseHeader (header) {
  // 将字符串类型的request header 解析为可读的对象类型
  let data = header.split("\r\n").filter(line => line)

  data.shift()
  let result = {}

  data.forEach(line => {
    let [name, value] = line.split(":")

    name = name.replace(/^\s|\s$/g, "").toLowerCase()
    value = value.replace(/^\s|\s$/g, "")
    
    result[name] = value
  })
  
  return result
}