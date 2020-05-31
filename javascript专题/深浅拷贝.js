var arr = [{old: 'old'}, ['old']];

// var new_arr = arr.concat();
var new_arr = arr.slice(); // 二者都是浅拷贝

arr[0].old = 'new';
arr[1][0] = 'new';

// console.log(arr) // [{old: 'new'}, ['new']]
// console.log(new_arr) // [{old: 'new'}, ['new']]


// ----------------------------------------------------------
var arr = [function(){
  console.log(a)
}, {
  b: function(){
      console.log(b)
  }
}]

var new_arr = JSON.parse(JSON.stringify(arr)); // 深拷贝，但是不能拷贝函数

console.log(new_arr);

// ----------------------------------------------------------

function shadowCopy(obj) {
  let copyer = obj instanceof Array ?[] :{}

  for (let key in obj) {
    copyer[key] = obj[key]
  }

  return copyer
}


// ----------------------------------------------------------

function deepCopy(obj) {
  if (typeof obj !== "object") return

  let copyer = obj instanceof Array ?[] :{}

  for (let key in obj) {
    copyer[key] = typeof obj[key] === "object" ?deepCopy(obj[key]) :obj[key]
  }

  return copyer
}

let aa = [1, {value: 1}]
// shadowCopy(aa)[1].value = 2
deepCopy(aa)[1].value = 2

console.log(aa)
