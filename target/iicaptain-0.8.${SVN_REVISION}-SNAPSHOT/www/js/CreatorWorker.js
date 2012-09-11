
importScripts('Creator.js');

onmessage = function (event) {
	World= new NWorld();
	var d= new String(event.data).split(",");
	var w= parseInt(d[0]);
	var h= parseInt(d[1]);
	World.createMap(w, h);

	postMessage(World.map);
};