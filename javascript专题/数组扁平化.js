// 利用ES6实现的相对简单的一版
// function flatten(arr) {
//   while (arr.some(item => Array.isArray(item))) {
//     arr = [].concat(...arr)
//   }

//   return arr
// }

// 只能说牛B了，下面一行代码模拟了...拓展符
// 1.bind将Funtion.apply的this修改为[].concat（apply方法的this就是要被修改this的函数）
// 2.bind将第二个参数[]作为apply函数的第一个参数传进去，这个[]将会作为被修改函数的this（这里的被修改函数是[].concat）
// 3.上面流程执行完，当前的flatten函数相当于： [].concat.apply([], arr) ，但是apply不能做到柯里化
flatten = Function.apply.bind([].concat, [])


var arr = [1, [2, [3, 4]]];
console.log(flatten(arr))
console.log()
