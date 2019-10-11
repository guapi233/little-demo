function selectSort(arr){
    let len = arr.length;
    for(let i=0; i<len; i++){
        let minimum = i;
        for(let j=i+1;j<len;j++){
            if(arr[j] < arr[minimum]){
                minimum = j;
            }
        }

        if(minimum != i){
            [arr[minimum], arr[i]] = [arr[i], arr[minimum]];
        }
    }
}

let arr = [6,3,7,5,2,9,1];
selectSort(arr)
console.log(arr)