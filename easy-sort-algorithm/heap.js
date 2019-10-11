// 一次堆转换
function heapify(arr, len, father){
    if(father >= len)return;
    let son1 = father*2+1;
    let son2 = father*2+2;
    let max = father;


    if(son1 < len && arr[son1] > arr[max]){
        max = son1;
    }
    if(son2 < len && arr[son2] > arr[max]){
        max = son2;
    }

    if(max != father){
        [arr[max], arr[father]] = [arr[father], arr[max]];
        heapify(arr, len, max);
    }
}

// 构建堆
function buildHeap(arr, len){
    let father = Math.floor((len-2)/2);
    for(father;father>=0;father--){
        heapify(arr, len, father);
    }
}

// 排序主函数
function heapSort(arr){
    let len = arr.length;
    buildHeap(arr, len);
    for(let i=len-1; i>0;i--){
        [arr[i], arr[0]] = [arr[0], arr[i]];
        heapify(arr, i, 0);      
    }
}

let arr = [6, 3, 7, 5, 2, 9, 1];

heapSort(arr);

console.log(arr)