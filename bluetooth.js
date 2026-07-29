let b21Device = null;

let b21Characteristic = null;



async function connectB21(){


try{


b21Device =

await navigator.bluetooth.requestDevice({

filters:[

{
namePrefix:"B21"
}

],


optionalServices:[

"000018f0-0000-1000-8000-00805f9b34fb"

]


});



let server =

await b21Device.gatt.connect();



let service =

await server.getPrimaryService(

"000018f0-0000-1000-8000-00805f9b34fb"

);



b21Characteristic =

await service.getCharacteristic(

"00002af1-0000-1000-8000-00805f9b34fb"

);



document.getElementById(
"b21Status"
).innerHTML =

"🟢 B21已連線";



}

catch(e){


alert(
"B21連線失敗"
);


}


}
