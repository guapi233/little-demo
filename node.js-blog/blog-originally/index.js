const http = require("http")
const serverHandler = require("./src/app")

http.createServer(serverHandler).listen(8080)