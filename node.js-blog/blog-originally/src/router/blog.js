const { getList, getDetail, newBlog, updateBlog, delBlog } = require("../controller/blog")
const { SuccessModel, FailModel } = require("../model/resModel")
const { loginCheck } = require("../controller/public")

async function blogHandler(req, res) {
  const method = req.method
  const id = req.query.id

  // 获取博客列表
  if (method === "GET" && req.path === "/api/blog/list") {


    let resData = await getList(req.query.author || "", req.query.keyword || "")

    return new SuccessModel(resData, "成功获取列表")
  }

  // 获取博客详情
  if (method === "GET" && req.path === "/api/blog/detail") {
    let resData = await getDetail(id)

    if (!resData) return FailModel("查找失败")

    return new SuccessModel(resData, "详情在这")
  }

  // 新建一篇博客
  if (method === "GET" && req.path === "/api/blog/new") {
    // 登录验证
    let checkResult = null
    if (checkResult = loginCheck(req)) return checkResult

    // req.postData.author = req.session.username
    // let result = await newBlog(req.postData)
    req.query.author = req.session.username
    let result = await newBlog(req.query)

    if (!result) return new FailModel("新建失败")

    return new SuccessModel(result, "新建成功")
  }

  // 更新一篇博客
  if (method === "GET" && req.path === "/api/blog/update") {
    // 登录验证
    let checkResult = null
    if (checkResult = loginCheck(req)) return checkResult

    // let result = await updateBlog(id, req.postData.title, req.postData.content)
    let result = await updateBlog(id, req.query.title, req.query.content)

    if (result) return new SuccessModel("更新成功")

    return new FailModel("更新失败")
  }

  // 删除一篇博客
  if (method === "GET" && req.path === "/api/blog/del") {
    // 登录验证
    let checkResult = null
    if (checkResult = loginCheck(req)) return checkResult

    let result = await delBlog(id, req.session.username)

    if (result) return new SuccessModel("删除成功")

    return new FailModel("删除失败")
  }
}

module.exports = blogHandler