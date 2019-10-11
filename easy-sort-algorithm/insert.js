function insertSort(arr) {
    let len = arr.length;
    for (let i = 1; i < len; i++) {
        let valve = arr[i];
        for (var j = i - 1; j >= 0 && arr[j] > valve; j--){
            arr[j+1] = arr[j];
        }
        arr[j+1] = valve;
    }
}

let arr = [6, 3, 7, 5, 2, 9, 1];

insertSort(arr);

console.log(arr)