function bubbleSort(arr){
    let len = arr.length;
    for(let i=0;i<len;i++){
        let valve = true;
        for(let j=1;j<len-i;j++){

            if(arr[j-1] > arr[j]) {
                [arr[j], arr[j-1]] =[arr[j-1], arr[j]];
                valve = false;
            }
        }
        if(valve){return;}
    }
}

let arr = [6,3,7,5,2,9,1];

bubbleSort(arr);

console.log(arr)