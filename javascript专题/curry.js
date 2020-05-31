
// ES6高颜值写法
var curry = fn =>
  judge = (...args) =>
    args.length === fn.length
      ? fn(...args)
      : (...arg) => judge(...args, ...arg)


function add (a, b, c) {
  return a + b + c
}


let addPlus = curry(add)

let a = addPlus(1)
console.log(a(2, 3))