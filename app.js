<!DOCTYPE html>
<html lang="zh-TW">

<head>

<meta charset="UTF-8">

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>宋爽爽 Night POS</title>

<link rel="stylesheet" href="style.css">

<link rel="manifest" href="manifest.json">

<meta name="theme-color" content="#c0392b">

</head>


<body>


<header>

<h1>🍲 宋爽爽花枝蝦滑湯</h1>

<div class="order-number">

訂單號碼：
<span id="orderNumber">
001
</span>

</div>

</header>



<section>

<h2>🍜 選擇口味</h2>


<div class="menu-grid">


<button onclick="addItem('蜀香麻辣')">

🌶️<br>
蜀香麻辣<br>
130元

</button>



<button onclick="addItem('石頭火鍋')">

🪨<br>
石頭火鍋<br>
130元

</button>



<button onclick="addItem('田園蕃茄')">

🍅<br>
田園蕃茄<br>
130元

</button>



<button onclick="addItem('濃郁牛奶')">

🥛<br>
濃郁牛奶<br>
130元

</button>



<button onclick="addItem('烏溜溜黑蒜')">

🧄<br>
烏溜溜黑蒜<br>
130元

</button>



<button onclick="addItem('酸菜魚')">

🥬<br>
酸菜魚<br>
130元

</button>


</div>

</section>





<section class="order-box">


<h2>
🧾 目前訂單
</h2>


<div id="orderList">

目前沒有訂單

</div>



<h2 id="total">

總金額：0元

</h2>



<button class="add-btn"
onclick="addCheese()">

🧀 加起司 +10元

</button>



<div class="action">


<button class="clear-btn"
onclick="clearOrder()">

清空

</button>



<button class="finish-btn"
onclick="finishOrder()">

✅ 完成訂單

</button>


</div>


</section>







<section>


<h2>
📊 今日營業
</h2>


<div id="report">

今日尚無資料

</div>


<button onclick="clearSales()">

🗑️ 清除今日營業

</button>


</section>







<section>


<h2>
🧾 今日訂單明細
</h2>


<div id="orderHistory">

目前沒有訂單

</div>


</section>








<section>


<h2>
🏷️ B21 單碗貼紙管理
</h2>



<div class="print-status">


⏳ 待列印：

<span id="waitCount">
0
</span>

張


<br>


✅ 已列印：

<span id="doneCount">
0
</span>

張


</div>





<div id="b21Queue">

目前沒有貼紙

</div>





<button onclick="printAllB21()">

🖨️ 全部列印

</button>




<button onclick="clearPrintedB21()">

🗑️ 清除已列印

</button>



</section>







<script src="app.js"></script>





<script>


if("serviceWorker" in navigator){


navigator.serviceWorker.register(
"service-worker.js"
);


}


</script>



</body>


</html>
