const exec = require("../db/mysql")

/**
 * 获取博客列表
 * @param {*} author 作者
 * @param {*} keyword 关键字
 */
async function getList(author, keyword) {
  let sql = "select * from blog where 1=1 "

  author && (sql += `and author=${author} `)
  keyword && (sql += `and title like '%${keyword}%' `)

  sql += "order by createtime desc;"

  let result = await exec(sql)

  return result
}


/**
 * 获取博客详情
 * @param {*} id 博客id
 */
async function getDetail (id) {
  let sql = `select * from blog where id=${id}`

  let result = await exec(sql)

  return result[0]
}
 

/**
 * 新建博客
 * @param {*} blogObj 文章相关内容
 */
async function newBlog(blogObj) {
  let title = blogObj.title, content = blogObj.content, createtime = blogObj.createtime, author = blogObj.author
  
  if (!title || !content || !createtime || !author) return false

  let sql = `insert into blog (title, content, createtime, author) values('${title}', '${content}', ${createtime}, '${author}')`

  let result = await exec(sql)

  return result.insertId
}


/**
 * 更新博客
 * @param {*} id 需要被更新的id
 * @param {*} content 新内容
 * @param {*} title 新标题
 */
async function updateBlog(id, title, content) {
  let sql = `update blog set title='${title}', content='${content}' where id=${id}`

  let result = await exec(sql)

  if (result.affectedRows > 0) return true
  return false
}


/**
 * 删除博客
 * @param {*} id 需要被删除的博客
 */
async function delBlog(id, author) {
  let sql = `update blog set state=0 where id=${id} and author='${author}'`

  let result = await exec(sql)
  
  if (result.affectedRows > 0) return true
  return false
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}