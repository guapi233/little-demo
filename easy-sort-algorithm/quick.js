function partition(arr, left, right){
    while(left != right){
        while(left != right && arr[right] >= arr[left]){
            right--;
        }
        [arr[left], arr[right]] =[arr[right], arr[left]];

        while(left != right && arr[left] < arr[right]){
            left++;
        }
        [arr[left], arr[right]] =[arr[right], arr[left]];   
    }

    return left;
}

function quickSort(arr, left, right){
    if(left < right){
        let mid = partition(arr, left, right);

        quickSort(arr, left, mid);
        quickSort(arr, mid+1, right);
    }
}

let arr = [6, 3, 7, 5, 2, 9, 1];
quickSort(arr, 0, arr.length-1);
console.log(arr)