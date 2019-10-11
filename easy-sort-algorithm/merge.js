// 顺序合并两个数组
function merge(arr, left, mid, right) {
    let leftArr = [], rightArr = [];
    for (let i = left; i < mid; i++) {
        leftArr[i - left] = arr[i];
    }

    for (let i = mid; i <= right; i++) {
        rightArr[i - mid] = arr[i];
    }

    let i = left, j = 0, k = 0;
    while (leftArr[j] && rightArr[k]) {
        if (leftArr[j] < rightArr[k]) {
            arr[i++] = leftArr[j++];
        } else {
            arr[i++] = rightArr[k++];
        }
    }

    while (leftArr[j]) {
        arr[i++] = leftArr[j++];
    }
    while (rightArr[k]) {
        arr[i++] = rightArr[k++];
    }
}

// 主函数，需要分治法思想
function mergeSort(arr, left, right) {
    if (right == left) return;
    else {
        let mid = Math.floor((left + right) / 2);

        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid + 1, right);
    }
}

let arr = [6, 8, 10, 9, 4, 5, 2];

mergeSort(arr, 0, arr.length - 1)
console.log(arr)














// 或者，你也可以这样 
/*
    function merge(arr, left, mid, right){
        let leftArr = [], rightArr = [];
        for(let i=left;i<mid;i++){
            leftArr[i-left] =  arr[i];
        }

        for(let i=mid;i<right;i++){
            rightArr[i-mid] = arr[i];
        }

        let i=left, j=0, k=0;
        while(leftArr[j] && rightArr[k]){
            if(leftArr[j] < rightArr[k]){
                arr[i++] = leftArr[j++];
            }else{
                arr[i++] = rightArr[k++];
            }
        }

        while(leftArr[j]){
            arr[i++] = leftArr[j++];
        }
        while(rightArr[k]){
            arr[i++] = rightArr[k++];
        }
    }

    // 主函数，需要分治法思想
    function mergeSort(arr, left, right){
        if(right-left == 1)return;
        else{
            let mid = Math.floor((left+right)/2);

            mergeSort(arr, left, mid);
            mergeSort(arr, mid, right);
            merge(arr, left, mid, right);
        }
    }

    let arr = [6,8,10,9,4,5,2];

    mergeSort(arr, 0, arr.length)
    console.log(arr)
*/