let order = [];

let total = 0;


// =================
// 訂單號碼
// =================

let orderNumber =
Number(localStorage.getItem("orderNumber")) || 1;



// =================
// 今日資料
// =================

let todaySales =
Number(localStorage.getItem("todaySales")) || 0;


let todayOrders =
Number(localStorage.getItem("todayOrders")) || 0;


let todayCount =
Number(localStorage.getItem("todayCount")) || 0;



// =================
// 訂單紀錄
// =================

let orderHistory =

JSON.parse(
localStorage.getItem("orderHistory")
)
|| [];



const price = 130;




// =================
// 點餐
// =================

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



// =================
// 加起司
// =================

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

item.price +=10;



}else{


order.push({

name:"加起司",

qty:1,

price:10

});


}



total +=10;


showOrder();


}




// =================
// 顯示訂單
// =================

function showOrder(){


let text="";



order.forEach((item,index)=>{


text +=

(index+1)+". "+

item.name+

" × "+

item.qty+

" = "+

item.price+

"元<br>";



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





// =================
// 清空目前訂單
// =================

function clearOrder(){


order=[];

total=0;


showOrder();


}






// =================
// 完成訂單
// =================

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



todayOrders++;


todaySales += total;



let bowls=0;



order.forEach(item=>{


if(item.name!=="加起司"){


bowls += item.qty;


}


});



todayCount += bowls;




let saveOrder={


number:number,


items:
JSON.parse(
JSON.stringify(order)
),


total:total


};




orderHistory.push(saveOrder);



localStorage.setItem(

"orderHistory",

JSON.stringify(orderHistory)

);



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



localStorage.setItem(

"orderNumber",

orderNumber+1

);





// 建立B21貼紙

createB21Queue(saveOrder);




alert(

"完成訂單\n\n"+

"號碼："+number+

"\n金額："+total+"元"

);



orderNumber++;


order=[];


total=0;



showOrder();

showReport();

showHistory();


}






// =================
// 今日營業
// =================

function showReport(){



document.getElementById(
"report"
).innerHTML =


"訂單數："+todayOrders+"筆<br>"+

"總碗數："+todayCount+"碗<br>"+

"營業額："+todaySales+"元";



}







// =================
// 訂單明細
// =================

function showHistory(){



let text="";



orderHistory.forEach(o=>{


text +=

"<hr>"+

o.number+

"號<br>";



o.items.forEach(item=>{


text +=

item.name+

" × "+

item.qty+

" "+

item.price+

"元<br>";



});



text +=

"總額："+o.total+"元<br>";



});



document.getElementById(

"orderHistory"

).innerHTML =

text || "目前沒有訂單";



}







// =================
// 清除今日營業
// =================

function clearSales(){


if(confirm(
"確定清除今日營業資料嗎？"
)){


todaySales=0;

todayOrders=0;

todayCount=0;


orderHistory=[];



localStorage.removeItem(
"todaySales"
);


localStorage.removeItem(
"todayOrders"
);


localStorage.removeItem(
"todayCount"
);


localStorage.removeItem(
"orderHistory"
);



showReport();

showHistory();


}

}






// =================
// B21貼紙資料
// =================


let b21Queue =

JSON.parse(

localStorage.getItem("b21Queue")

)

|| [];







// =================
// 建立單碗貼紙
// =================


function createB21Queue(orderData){



let num=1;



let cheese=0;



orderData.items.forEach(item=>{


if(item.name==="加起司"){


cheese=item.qty;


}


});





orderData.items.forEach(item=>{


if(item.name!=="加起司"){



for(let i=0;i<item.qty;i++){



b21Queue.push({

id:

orderData.number+"-"+num,


name:

item.name,


cheese:false,


printed:false


});



num++;


}


}


});





for(let i=0;i<cheese;i++){



let index=

b21Queue.length-1-i;



if(index>=0){


b21Queue[index].cheese=true;


}


}




saveB21();



}







// =================
// 顯示B21列表
// =================


function showB21Queue(){



let box=

document.getElementById(
"b21Queue"
);



if(!box)return;



let text="";



b21Queue.forEach((item,index)=>{


text +=


`

<div class="b21-card">

<b>${item.id}</b>

<br>

🍲 宋爽爽

<br>

${item.name}

<br>

${item.cheese?"🧀 加起司":""}

<br>

${item.printed?
"✅ 已列印":
"⏳ 待列印"}

<br>

<button onclick="printB21One(${index})">

🖨️ 重印

</button>

</div>

`;



});



box.innerHTML=

text || "目前沒有貼紙";




document.getElementById(
"waitCount"
).innerHTML =

b21Queue.filter(
x=>!x.printed
).length;



document.getElementById(
"doneCount"
).innerHTML =

b21Queue.filter(
x=>x.printed
).length;



}







// =================
// 單張列印
// =================


function printB21One(index){



let item=b21Queue[index];



let label=

"🍲宋爽爽\n\n"+

item.id+

"\n\n"+

item.name+

"\n"+

(item.cheese?
"🧀加起司":
"");



navigator.clipboard.writeText(label);



item.printed=true;



saveB21();



alert(
"已準備 "+item.id
);



}







// =================
// 全部列印
// =================


function printAllB21(){



let text="";



b21Queue.forEach(item=>{


if(!item.printed){



text +=

"🍲宋爽爽\n"+

item.id+

"\n"+

item.name+

"\n"+

(item.cheese?
"🧀加起司":
"")+

"\n\n";



item.printed=true;


}


});



if(text===""){


alert(
"沒有待列印貼紙"
);


return;


}



navigator.clipboard.writeText(text);



saveB21();



alert(
"全部貼紙已準備"
);



}






// =================
// 儲存B21
// =================

function saveB21(){


localStorage.setItem(

"b21Queue",

JSON.stringify(b21Queue)

);



showB21Queue();


}







// =================
// 清除已列印
// =================

function clearPrintedB21(){



if(confirm(
"清除已列印貼紙？"
)){


b21Queue =

b21Queue.filter(
x=>!x.printed
);



saveB21();


}


}






// =================
// 啟動
// =================


showOrder();

showReport();

showHistory();

showB21Queue();
