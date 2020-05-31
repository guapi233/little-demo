
// 需求：返回调用该函数的第一次时间，注意是第一次 
function foo() {
  let t = new Date()
  
  foo = function () {
    return t
  }

  return foo() // 这里的话直接返回t也行，不过考虑普遍不会只有这一句逻辑，通常还是会调用修改后的函数
}

console.log(foo())
console.log(foo())
console.log(foo())





// 解决一：普通方法
var t;
function foo() {
    if (t) return t;
    t = new Date()
    return t;
}
// 问题有两个，一是污染了全局变量，二是每次调用 foo 的时候都需要进行一次判断。

// 解决二：闭包
// 我们很容易想到用闭包避免污染全局变量。

var foo = (function() {
    var t;
    return function() {
        if (t) return t;
        t = new Date();
        return t;
    }
})();
// 然而还是没有解决调用时都必须进行一次判断的问题。

// 解决三：函数对象
// 函数也是一种对象，利用这个特性，我们也可以解决这个问题。

function foo() {
    if (foo.t) return foo.t;
    foo.t = new Date();
    return foo.t;
}
// 依旧没有解决调用时都必须进行一次判断的问题。