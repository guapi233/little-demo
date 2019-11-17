const Koa = require("koa")
const fs = require("fs")
const urllib = require("url")
const kBody = require("koa-body")

let server = new Koa()

server.use(kBody({
  multipart: true
}))

server.use(async ctx => {
  let path = urllib.parse(ctx.url).path
  
  if (path == "/") {
    let res = fs.readFileSync("./index.html")
    ctx.set("Content-Type", "text/html")

    ctx.body = res
  } else if (path == "/upload") {
    let { img } = ctx.request.files

    if (img) {
      try {
        let file = fs.readFileSync(img.path)
        fs.writeFileSync("./test.jpg", file)
      } catch (e) {
        ctx.body = e
      }

    } else {
      ctx.body = "没有上传图片"
    }

  }
})

server.listen(3400)
