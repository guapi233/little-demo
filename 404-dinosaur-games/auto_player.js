/**
 * 将代码粘贴到chrome控制台运行即可
 * 
 * 代码的速度差值不够精准，无法无限的让小恐龙跑下去，
 * 如果你有时间，可以尝试修改inc速度变量来让小恐龙跑得更远
 */

var event = new Event('keydown');
var inc=-30;
event.keyCode = 32;//keys(Runner.keycodes.JUMP)[0];
event.which = event.keyCode;
event.altKey = false;
event.ctrlKey = true;
event.shiftKey = false;
event.metaKey = false;

var ctx=document.getElementsByClassName("runner-canvas")[0].getContext('2d');

var sec = setInterval(function(){
if (Math.max(...ctx.getImageData(120,125,50+inc,1).data)==255)  document.dispatchEvent(event);
if (Math.max(...ctx.getImageData(120,95,30+inc,1).data)==255) document.dispatchEvent(event);
if (Runner.instance_.crashed) {inc=-30; Runner.instance_.restart()};
if (Runner.instance_.paused) Runner.instance_.play();
},2);
    
var sec = setInterval(function(){
if (inc<100)inc=(inc+0.1)
},300);