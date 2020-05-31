let array = [2, {value: 1}, 2, 1, {value: 1}]

// 循环判断版
function unique(array) {
  let res = []

  for (let i = 0; i < array.length; i++) {
    // for (var j = 0; j < res.length; j++) {
    //   if (array[i] === res[j]) {
    //     break
    //   }
    // }

    // if (j === res.length) res.push(array[i])

    // 简化为↓

    if (res.indexOf(array[i]) === -1) {
      res.push(array[i])
    }
  }

  return res
}

// 对象判断版（去重最彻底版）
function unique2(array) {
  let tempObj = {}

  return array.filter(item => {
    return tempObj[typeof item + JSON.stringify(item)] ?false :(tempObj[typeof item + JSON.stringify(item)] = true)
  })
}

// ES6版（Map）
function unique4(array) {
  let tempMap = new Map()

  return array.filter(item => !tempMap.has(item) && tempMap.set(item, 1))
}

// ES6版（Set）
let unique3 = array => [...new Set(array)]

console.log(unique4(array))



