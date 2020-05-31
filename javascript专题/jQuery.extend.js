// 浅拷贝版本
function extendShadow() {

  let args = Array.from(arguments)
  let target = args.shift()

  args.forEach(item => {
    for (let i in item) {
      target[i] = item[i]
    }
  })

  return target
}

// -----------------------------------------------


function extendDeep() {
  let deep = false, args = Array.from(arguments), target

  if (typeof arguments[0] === "boolean") {
    deep = args.shift()
    target = args.shift()
  } else {
    target = args.shift()
  }

  // 如果target为基本类型就无法合并了，所以我们将它设置为对象
  if (typeof target !== "object") {
    target = args[0] instanceof Array ? [] : {}
  }

  args.forEach(item => {
    for (let i in item) {
      if (target === item[i]) continue

      if (typeof item[i] === "object" && deep) {
        // 这里出了问题 ↓ 明明把递归后组合的对象赋值给了target["b"]，却导致target自身被覆盖了  (已修复, target忘了声明，成了全局变量了)
        // console.log("递归之前：", target, i)
        target[i] = extendDeep(deep, target[i], item[i])
        // console.log("递归之后：", target)
      } else {
        target[i] = item[i]
      }
    }
  })

  return target
}



// -----------------------------------------------


var a = {name : b};
var b = {name : a}

var c = extendDeep(a, b);
console.log(c);