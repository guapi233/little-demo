// 不靠谱的方法，原因是v8的sort()在如果排序元素小于10位长度时会使用插入排序
// 在插入排序的算法中，当待排序元素跟有序元素进行比较时，一旦确定了位置，就不会再跟位置前面的有序元素进行比较，所以就乱序的不彻底。
let arr = [1, 2, 3, 4, 5]

arr.sort(() => Math.random() - 0.5)

console.log(arr)

// 运行这个demo，你会发现，各种情况出现的概率不是平等的
var times = 100000;
var res = {};

for (var i = 0; i < times; i++) {
    
    var arr1 = [1, 2, 3];
    arr1.sort(() => Math.random() - 0.5);
    
    var key = JSON.stringify(arr1);
    res[key] ? res[key]++ :  res[key] = 1;
}

// 为了方便展示，转换成百分比
for (var key in res) {
    res[key] = res[key] / times * 100 + '%'
}

console.log(res)


// ------------------------------------------------
function shuffle(arr) {
  for (let i = arr.length; i; i--) {
    let j = Math.floor(Math.random() * i) ;  // 这里必须要加 “;”，不加的话会出现 ()[] 导致报错

    [arr[i - 1], arr[j]] = [arr[j], arr[i - 1]]
  }

  return arr
}

// 各种情况出现的概率大致相同
var times = 100000;
var res = {};

for (var i = 0; i < times; i++) {
    var arr2 = shuffle([1, 2, 3]);

    var key = JSON.stringify(arr2);
    res[key] ? res[key]++ :  res[key] = 1;
}

// 为了方便展示，转换成百分比
for (var key in res) {
    res[key] = res[key] / times * 100 + '%'
}

console.log(res)