async function printB21(text){


if(!b21Characteristic){


alert(
"請先連線B21"
);


return;


}



let encoder =

new TextEncoder();



let data =

encoder.encode(text);



await b21Characteristic.writeValue(

data

);


}
