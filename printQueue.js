async function printQueue(){


let list =

b21Queue.filter(

x=>!x.printed

);



for(let item of list){



let label =


"宋爽爽\n\n"+

item.id+

"\n"+

item.name+

"\n"+

(item.cheese?
"加起司":
"");



await printB21(label);



item.printed=true;


}



saveB21();



alert(
"列印完成"
);


}
