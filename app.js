// =================================
// 宋爽爽 Night POS V2.0 第十一版
// app.js
// B21 自動列印佇列版
// =================================


let order = [];

let total = 0;


// 訂單號碼

let orderNumber =
Number(localStorage.getItem("orderNumber")) || 1;



// 今日資料

let todaySales =
Number(localStorage.getItem("todaySales")) || 0;


let todayOrders =
Number(localStorage.getItem("todayOrders")) || 0;


let todayCount =
Number(localStorage.getItem("todayCount")) || 0;



// 訂單紀錄

let orderHistory =
JSON.parse(
localStorage.getItem("orderHistory")
)
|| [];



// B21列印佇列

let b21Queue =
JSON.parse(
localStorage.getItem("b21Queue")
)
|| [];



const price = 130;





// ======================
// 加入商品
// ======================

function addItem(name){


let item =
order.find(
x=>x.name===name
);



if(item){


item.qty++;

item.price =
item.qty * price;



}else{


order.push({

name:name,

qty:1,

price:price

});


}



total += price;


showOrder();


}







// ======================
// 加起司
// ======================

function addCheese(){


if(order.length===0){

alert(
"請先選擇口味"
);

return;

}



let item =
order.find(
x=>x.name==="加起司"
);



if(item){


item.qty++;

item.price+=10;


}else{


order.push({

name:"加起司",

qty:1,

price:10

});


}


total+=10;


showOrder();


}







// ======================
// 顯示訂單
// ======================

function showOrder(){


let text="";


order.forEach((item,index)=>{


text +=

`${index+1}.
${item.name}
×${item.qty}
${item.price}元<br>`;


});



document.getElementById(
"orderList"
).innerHTML =

text || "目前沒有訂單";



document.getElementById(
"total"
).innerHTML =

"總金額："+total+"元";


}








// ======================
// 完成訂單
// ======================

function finishOrder(){



if(order.length===0){

alert(
"目前沒有訂單"
);

return;

}



let number =
String(orderNumber)
.padStart(3,"0");



let saveOrder = {


number:number,


items:
JSON.parse(
JSON.stringify(order)
),


total:total


};




// 保存訂單

orderHistory.push(saveOrder);



localStorage.setItem(

"orderHistory",

JSON.stringify(orderHistory)

);





// 統計

todayOrders++;

todaySales += total;



order.forEach(item=>{


if(item.name!=="加起司"){

todayCount += item.qty;

}


});




localStorage.setItem(
"todaySales",
todaySales
);


localStorage.setItem(
"todayOrders",
todayOrders
);


localStorage.setItem(
"todayCount",
todayCount
);



// 建立B21列印

createB21Queue(saveOrder);



// 下一號

orderNumber++;


localStorage.setItem(

"orderNumber",

orderNumber

);





alert(

"訂單完成\n\n"+
"號碼："+number+
"\nB21貼紙已加入列印"

);




order=[];

total=0;



showOrder();

showReport();

showHistory();

showB21Queue();



// 呼叫App列印

autoPrintB21();


}








// ======================
// 建立B21單碗貼紙
// ======================


function createB21Queue(data){



let count=1;



data.items.forEach(item=>{


if(item.name!=="加起司"){



for(let i=0;i<item.qty;i++){



b21Queue.push({


id:
data.number+"-"+count,


name:
item.name,


cheese:false,


printed:false


});



count++;


}


}


});





// 加起司附加最後一碗

let cheese =
data.items.find(
x=>x.name==="加起司"
);



if(cheese){


for(
let i=0;
i<cheese.qty;
i++
){


let index =
b21Queue.length-1-i;


if(index>=0){

b21Queue[index].cheese=true;

}


}


}



saveB21();


}








// ======================
// B21 自動列印接口
// ======================


function autoPrintB21(){



let wait =

b21Queue.filter(
x=>!x.printed
);



if(wait.length===0){

return;

}



// 未來接 Capacitor B21 SDK

if(
window.B21Printer
){


window.B21Printer.print(
wait
);


}else{


console.log(
"B21等待列印",
wait
);


}


}








// ======================
// B21列表
// ======================


function showB21Queue(){


let box =
document.getElementById(
"b21Queue"
);



if(!box)return;



let text="";



b21Queue.forEach((item,index)=>{


text+=`

<div class="b21-card">

<b>${item.id}</b>

<br>

🍲宋爽爽

<br>

${item.name}

<br>

${item.cheese?"🧀加起司":""}

<br>

${item.printed?
"✅完成":
"⏳等待列印"}

<br>

<button onclick="rePrintB21(${index})">

重新列印

</button>

</div>

`;



});



box.innerHTML =
text || "目前沒有貼紙";



}








// ======================
// 重印
// ======================


function rePrintB21(index){


let item =
b21Queue[index];



item.printed=false;


saveB21();


autoPrintB21();


}






// ======================
// 儲存B21
// ======================

function saveB21(){


localStorage.setItem(

"b21Queue",

JSON.stringify(b21Queue)

);


showB21Queue();


}






// ======================
// 今日營業
// ======================


function showReport(){


document.getElementById(
"report"
).innerHTML=

"訂單數："+todayOrders+"筆<br>"+
"總碗數："+todayCount+"碗<br>"+
"營業額："+todaySales+"元";


}








// ======================
// 訂單明細
// ======================

function showHistory(){


let text="";


orderHistory.forEach(o=>{


text+=

"<hr>"+
o.number+
"號<br>";



o.items.forEach(item=>{


text+=

item.name+
" × "+
item.qty+
" "+
item.price+
"元<br>";

});


text+=
"總額："+o.total+"元<br>";

});


document.getElementById(
"orderHistory"
).innerHTML=

text||"目前沒有訂單";


}







// 啟動

showOrder();

showReport();

showHistory();

showB21Queue();
