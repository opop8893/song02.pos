// ==============================
// 宋爽爽 Night POS V2.0
// Service Worker
// ==============================


const CACHE_NAME = "song-song-pos-v2.0";



const FILES_TO_CACHE = [


"./",

"./index.html",

"./style.css",

"./app.js",

"./manifest.json",

"./icon.png"


];




// 安裝

self.addEventListener(
"install",
event=>{


event.waitUntil(


caches.open(CACHE_NAME)

.then(cache=>{


return cache.addAll(
FILES_TO_CACHE
);


})


);



});






// 啟動

self.addEventListener(
"activate",
event=>{


event.waitUntil(


caches.keys()

.then(keys=>{


return Promise.all(


keys.map(key=>{


if(
key !== CACHE_NAME
){


return caches.delete(key);


}


})


);


})


);



});







// 離線讀取

self.addEventListener(
"fetch",
event=>{


event.respondWith(


caches.match(
event.request
)

.then(response=>{


return response || fetch(event.request);


})


);



});
