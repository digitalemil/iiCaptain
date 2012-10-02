var daylength = 8000;
var nightlength = 2000;
var sextantimg = new Image();
var ctx;
var alldiv;
var retina = 1;
var tilesimg = new Image();
var nightimg = new Image();
var timer, nightTimer, services, ship, home;
var canvaswidth = 384, canvasheight = 384, tiledim = 24;
var simple = true;
var canvas, mapcanvas, atsea;
var seaimg;
var canvaswidth, canvasheight;
var w, h, scale, sX, sY;
var localworld= false;

var server= "iicaptain.cloudfoundry.com"
var user= "guest";
var passwd= "guest";
var vita= false;
		 if(navigator.userAgent.match(".*Vita.*")){
    	scale= 1;
    	sx= sy= 1;
    	vita= true;
    	}
    	else {
    	server= localStorage.server;
    	user=localStorage.user;
    	passwd= localStorage.passwd;
    	}

var startSettings= function() {
	if(server== null)
		server= "iicaptain.cloudfoundry.com";
	if(user== null)
		user= "guest";
	if(passwd== null)
		passwd= "guest";
	
	cleanStartScreen();
	var bgimg = new Image();
	bgimg.src = "res/start.png";
	bgimg.setAttribute("id", "start");
	alldiv.appendChild(bgimg);
	
	bgimg.setAttribute("style", "position:absolute; top:0px; left:0px; width: "
			+ window.innerWidth + "px; height: " + window.innerHeight + "px;");
	var userimg = new Image();
	userimg.src = "res/yourname.png";
	userimg.setAttribute("id", "userimg");
	userimg.setAttribute("style", "position:absolute; top:"+ (280*sY)+"px; left:"+(((960-512-140)/2)*sX)+"px; width: "
			+ (256*sX*1.5) + "px; height: " + (128*sY*1.5) + "px;");
	alldiv.appendChild(userimg);	
	
	var ui= document.createElement("input");
	ui.setAttribute("id", "user");
	ui.type= "text";
	ui.value=user;
	ui.setAttribute("style", "position:absolute; top:"+ (360*sY)+"px; left:"+(((200+960-256)/2)*sX)+"px; width: "
			+ (220*sX) + "px; height: " + (32*sY*1.5) + "px;");
	alldiv.appendChild(ui);

	var pimg = new Image();
	pimg.src = "res/password.png";
	pimg.setAttribute("id", "passwdimg");
	pimg.setAttribute("style", "position:absolute; top:"+ (340*sY)+"px; left:"+(((960-512-180)/2)*sX)+"px; width: "
			+ (256*sX*1.5) + "px; height: " + (128*sY*1.5) + "px;");
	alldiv.appendChild(pimg);	
	
	
	var pi= document.createElement("input");
	pi.setAttribute("id", "passwd");
	pi.type= "text";
	pi.value=passwd;
	pi.setAttribute("style", "position:absolute; top:"+ (420*sY)+"px; left:"+(((200+960-256)/2)*sX)+"px; width: "
			+ (220*sX) + "px; height: " + (32*sY*1.5) + "px;");
	alldiv.appendChild(pi);

	var simg = new Image();
	simg.src = "res/server.png";
	simg.setAttribute("id", "serverimg");
	simg.setAttribute("style", "position:absolute; top:"+ (400*sY)+"px; left:"+(((960-512-224)/2)*sX)+"px; width: "
			+ (256*sX*1.5) + "px; height: " + (128*sY*1.5) + "px;");
	alldiv.appendChild(simg);	
	
	
	var si= document.createElement("input");
	si.setAttribute("id", "server");
	si.type= "text";
	si.value=server;
	si.setAttribute("style", "position:absolute; top:"+ (480*sY)+"px; left:"+(((200+960-256)/2)*sX)+"px; width: "
			+ (220*sX) + "px; height: " + (32*sY*1.5) + "px;");
	alldiv.appendChild(si);

	var okimg = new Image();
	okimg.src = "res/ok.png";
	okimg.setAttribute("id", "okimg");
	okimg.setAttribute("onclick", "user= document.getElementById('user').value; passwd= document.getElementById('passwd').value; server= document.getElementById('server').value; if(!vita) {localStorage.user= user; localStorage.passwd= passwd; localStorage.server= server; }cleanSettingsScreen(); iiCaptainSetup(alldiv);");
	okimg.setAttribute("style", "position:absolute; top:"+ (520*sY)+"px; left:"+(((960+460)/2)*sX)+"px; width: "
			+ (48*sX*1.5) + "px; height: " + (48*sY*1.5) + "px;");
	alldiv.appendChild(okimg);	
	
}


var cleanStartScreen= function() {
	alldiv.removeChild(document.getElementById("start"));
	alldiv.removeChild(document.getElementById("sj"));
	alldiv.removeChild(document.getElementById("slj"));
	alldiv.removeChild(document.getElementById("settings"));
	alldiv.removeChild(document.getElementById("cont"));
}

var cleanSettingsScreen= function() {
	alldiv.removeChild(document.getElementById("start"));
	alldiv.removeChild(document.getElementById("user"));
	alldiv.removeChild(document.getElementById("passwd"));
	alldiv.removeChild(document.getElementById("server"));
	alldiv.removeChild(document.getElementById("userimg"));
	alldiv.removeChild(document.getElementById("passwdimg"));
	alldiv.removeChild(document.getElementById("serverimg"));
	alldiv.removeChild(document.getElementById("okimg"));
}

var startGame= function(local) {
	console.log("NONAPP: "+NONAPP);
	if(!local && server== null && NONAPP!= false) {
		alert('Please provide server details first (Under Settings).');
		return;
	}
	localworld= local;
	cleanStartScreen();
	iiCaptainShipSetup(alldiv)
}

var iiCaptainDisable = function() {
	timer.stop = true;
	nightTimer.stop = true;
	timer = undefined;
	nightTimer = undefined;
	services = undefined;
	ctx = undefined;
	tilesimg = undefined;
	nightimg = undefined;
	ship = home = undefined;

	alldiv.removeChild(bgimg);
	alldiv.removeChild(seaimg2);
	alldiv.removeChild(mapimg);
	alldiv.removeChild(sextantimg);
	alldiv.removeChild(canvas);
	alldiv.removeChild(mapcanvas);
	alldiv.removeChild(atsea);

	sextantimg = undefined;
	canvas = mapcanvas = atsea = seaimg = undefined;
	bgimg = seaimg2 = mapimg = undefined;
	alldiv = undefined;
	// while(document.get)

}

var iiCaptainSetup = function(id) {

	w = window.innerWidth;
	h = window.innerHeight;
	// 920, 576
	var perfcor = 0;
	scale = Math.min((w - perfcor * 64) / 960, (h - perfcor * 64) / 640);
	sX= (w - perfcor * 64) / 960;
	sY= (h - perfcor * 64) / 640;
		 if(navigator.userAgent.match(".*Vita.*")){
    	scale= 1;
    	sx= sy= 1;
    	vita= true;
 }
	alldiv = id;
	dialog = new Dialog();
	dialog.off();

	var bgimg = new Image();
	bgimg.src = "res/start.png";
	bgimg.setAttribute("id", "start");
	id.appendChild(bgimg);
	
	bgimg.setAttribute("style", "position:absolute; top:0px; left:0px; width: "
			+ window.innerWidth + "px; height: " + window.innerHeight + "px;");

	var cont = new Image();
	cont.src = "res/continue.png";
	cont.setAttribute("id", "cont");
	cont.setAttribute("style", "position:absolute; top:"+ (360*sY)+"px; left:"+(((960-256*1.5)/2)*sX)+"px; width: "
			+ (256*sX*1.5) + "px; height: " + (48*sY*1.5) + "px;");
	id.appendChild(cont);	
	var sj = new Image();
	sj.src = "res/startjourney.png";
	sj.setAttribute("id", "sj");
	sj.setAttribute("onclick", "startGame(false)");	
	sj.setAttribute("style", "position:absolute; top:"+ (410*sY)+"px; left:"+((960-256*1.5)/2)*sX+"px; width: "
			+ (256*sX*1.5) + "px; height: " + (48*sY*1.5) + "px;");
	id.appendChild(sj);	
	var slj = new Image();
	slj.src = "res/startlocaljourney.png";
	slj.setAttribute("onclick", "startGame(true)");	
	slj.setAttribute("id", "slj");
	slj.setAttribute("style", "position:absolute; top:"+ (460*sY)+"px; left:"+((960-256*1.5)/2)*sX+"px; width: "
			+ (256*sX*1.5) + "px; height: " + (48*sY*1.5) + "px;");
	id.appendChild(slj);	
	
	var settings = new Image();
	settings.src = "res/settings.png";
	settings.setAttribute("id", "settings");
	settings.setAttribute("onclick", "startSettings()");	

	settings.setAttribute("style", "position:absolute; top:"+ (510*sY)+"px; left:"+((960-256*1.5)/2)*sX+"px; width: "
			+ (256*sX*1.5) + "px; height: " + (48*sY*1.5) + "px;");
	id.appendChild(settings);	
}

var iiCaptainShipSetup = function(id) {
	w = window.innerWidth;
	h = window.innerHeight;
	// 920, 576
	var perfcor = 0;
	scale = Math.min((w - perfcor * 64) / 960, (h - perfcor * 64) / 640);
	// scale= 1.0;
	 if(navigator.userAgent.match(".*Vita.*")){
    	scale= 1;
    	vita= true;
 }
   
	alldiv = id;
	var bgimg = new Image();
	bgimg.src = "res/bgimg2.png";
	bgimg.setAttribute("id", "bgimg");
	bgimg.setAttribute("style", "position:absolute; top:0px; left:0px; width: "
			+ window.innerWidth + "px; height: " + window.innerHeight + "px;");
	
	id.appendChild(bgimg);
	
	
	seaimg = new Image();
	var seaimg2 = new Image();
	seaimg2.src = "res/seamap2.png";
	seaimg2.setAttribute("id", "seaimg2");
	id.appendChild(seaimg2);
	var mapimg = new Image();
	mapimg.src = "res/seamap2.png";
	mapimg.setAttribute("id", "mapimg");

	id.appendChild(mapimg);
	sextantimg = new Image();
	sextantimg.src = "res/sextant.png";
	sextantimg.setAttribute("id", "sextantimg");
	id.appendChild(sextantimg);

	canvas = document.createElement('canvas');
	mapcanvas = document.createElement('canvas');
	atsea = document.createElement('canvas');
	id.appendChild(canvas);
	id.appendChild(mapcanvas);
	id.appendChild(atsea);

	canvas.setAttribute("id", "canvas");
	canvas.setAttribute("width", canvaswidth * scale);
	canvas.setAttribute("height", canvasheight * scale);
	canvas.setAttribute("style", "position:absolute; top:" + 72 * scale
			+ "px; left: " + 62 * scale + "px;");
	mapcanvas.setAttribute("id", "mapcanvas");
	mapcanvas.setAttribute("style", "position:absolute; top:" + 80 * scale
			+ "px; left: " + 580 * scale + "px;");
	mapcanvas.setAttribute("width", 384 * scale + "px;");
	mapcanvas.setAttribute("height", 384 * scale + "px;");

	mapimg.setAttribute("style", "position:absolute; top: " + 54 * scale
			+ "px; left: " + 552 * scale + "px; width:" + 320 * scale
			+ "px; height:" + 220 * scale + "px;");
	sextantimg.setAttribute("style", "position:absolute; top: " + 80 * scale
			+ "px; left: " + 794 * scale + "px;  width:" + 42 * scale
			+ "px; height:" + 42 * scale + "px;");
	atsea.setAttribute("id", "atsea");
	atsea.setAttribute("style", "position:absolute; top:" + 324 * scale
			+ "px; left: " + 556 * scale + "px; width:" + 320 * scale
			+ "px; height:" + 200 * scale + "px;");
	seaimg2.setAttribute("style", "position:absolute; top: " + 16 * scale
			+ "px; left: " + 8 * scale + "px; width:" + 500 * scale + "px;");

	canvas.setAttribute("onMouseDown", "iicaptainclick(event);");
	canvas.setAttribute("onMouseUp", "mousedown=false");
	// canvas.setAttribute("ontouchstart","click(event)");
	canvas.setAttribute("ontouchend", "mousedown=false; lastkey= -1");
	mapcanvas.setAttribute("onMouseDown",
			"services.getView().mapSprite.navigate();");
	mapcanvas.setAttribute("ontouchstart",
			"services.getView().mapSprite.navigate();");
 
		if(vita) {
	sextantimg.setAttribute("style", "position:absolute; top: "+80*scale+"px; left: "+812*scale+"px;  width:"+42*scale+"px; height:"+42*scale+"px;");
	mapimg.setAttribute("style", "position:absolute; top: "+54*scale+"px; left: "+552*scale+"px; width:"+340*scale+"px; height:"+240*scale+"px;");
	seaimg2.setAttribute("style", "position:absolute; top: "+16*scale+"px; left: "+8*scale+"px; width:"+548*scale+"px;");

}
	load();
	ship.setNight(false);
	ship.mapSprite.paint(ctx);
}

// var TheRegion;
function iicaptainclick(e) {
	e.preventDefault();
	var event;
	if (e.touches != undefined) {
		event = e.touches[0];
	} else {
		event = e;
	}

	var ex = event.clientX - canvas.offsetLeft - alldiv.offsetLeft
			+ document.body.scrollLeft;
	var ey = event.clientY - canvas.offsetTop - alldiv.offsetTop
			+ document.body.scrollTop;
	ex /= scale;
	ey /= scale;

	var x = ex - canvaswidth / 2;
	var y = canvasheight / 2 - ey;

	var newdir = Math.atan2(y, x);
	if (newdir < 0) {
		newdir += 2 * Math.PI;
	}
	services.getView().setCourse(newdir * 360 / 2 / Math.PI, ex, ey);
	return;
}

var createOffScreenImage = function(width, height) {
	var buffer = document.createElement('canvas');
	buffer.width = width;
	buffer.height = height;
	return buffer;
};
var req;

function loadData(url) {
	req = false;
	// branch for native XMLHttpRequest object

	console.log("Load url: "+url);
	if (window.XMLHttpRequest) {
		try {
			req = new XMLHttpRequest();
		} catch (e) {
			req = false;
		}
		// branch for IE/Windows ActiveX version
	} else {
		if (window.ActiveXObject) {
			try {
				req = new ActiveXObject("Msxml2.XMLHTTP");
			} catch (e) {
				try {
					req = new ActiveXObject("Microsoft.XMLHTTP");
				} catch (e) {
					req = false;
				}
			}
		}
	}
	if (req) {
		req.onreadystatechange = processReqChange;
		req.open("GET", url, true);
		req.send("");
	} else {
		alert("req== false");
	}

}

function processReqChange() {

	if (req.readyState != 4)
		return;

	// ...processing statements go here...
	var response = req.responseText;
	var obj = eval('(' + response + ')');
	World.map = obj.map;
	World.currentWidth = obj.width;
	World.currentHeight = obj.height;
}

function load() {
	seaimg.src = 'res/newsea.png';
	tilesimg.src = 'res/newtiles.png';
	nightimg.src = 'res/night.png';
	sextantimg.src = 'res/sextant.png';
	var dim = [ 128, 128 ];
	if (!localworld) {
		World = new NWorld();
		// World.createMap(dim[0], dim[1]);
		/*
		 * console.log("{ \"width\": "+dim[0]+", \"height\": "+dim[1]+",
		 * \"map\": ["); var line= new String(); for(var x= 0; x<
		 * World.MAXWIDTH+ World.EXTENT; x++) { line= "["; for(var y= 0; y<
		 * World.MAXHEIGHT; y++) { line+= World.get(x,
		 * y)+((y==(World.MAXHEIGHT-1))?"":", "); } if(x<
		 * World.MAXWIDTH+World.EXTENT-1) console.log(line+"],"); else
		 * console.log(line+"]] }"); }
		 */
		//loadData("js/World.json");
		if(NONAPP== true && (server== null || server=='')) {
			loadData("world/create?width="+dim[0]+"&height="+dim[1]+"&type=java");
		}
		else {
			if(server!= null)
				loadData("http://"+server+"/world/create?width="+dim[0]+"&height="+dim[1]+"&type=java");
		}
		World.currentWidth = dim[0];
		World.currentHeight = dim[1];

		init();
		// ship.mapSprite= new MapSprite();
		ship.dx = World.currentWidth + 4;
		ship.dy = World.currentHeight / 2;

	} else {
		var worker = new Worker('js/CreatorWorker.js');
		worker.onmessage = function(event) {
			World = new NWorld();
			World.currentWidth = dim[0];
			World.currentHeight = dim[1];
			var d = new String(event.data);
			var m = d.split(",");
			var w = World.MAXWIDTH + World.EXTENT;
			for ( var y = 0; y < World.MAXHEIGHT; y++) {
				for ( var x = 0; x < w; x++) {
					World.map[x][y] = parseInt(m[y + x * World.MAXHEIGHT]);
				}
			}
			init();
		};
		worker.postMessage(dim);
	}
}

function init() {
	 canvas = document.getElementById("canvas");
	ctx = canvas.getContext('2d');
	ctx.scale(scale, scale);
	// scale= 1.0;
	
	services = new Services();
	ship = new Ship();

	home = new Home();
	// services.setView(home);
	services.setView(ship);
	services.getView().paint();
	timer = new MyTimer(itsTime);

	var opts = [];
	opts[0] = "Simple";
	opts[1] = "  Full  ";
	var callbacks = [];
	callbacks[0] = "simple"
	callbacks[1] = "full";

	simple = false;
	if (simple) {
		timer.start(250);
	} else {
		timer.start(40);
	}
	// services.getDialog().setOptions("res/newland.png", "Choose the Mode",
	// opts, null, callbacks);
	// services.getDialog().on();
	/*
	 * timer = new MyTimer(itsTime); if (simple) timer.start(256); else
	 * timer.start(40);
	 */
	nightTimer = new MyTimer(itsNight);
	nightTimer.start(daylength);
}

function simple() {
	alert("Simple");
}

function Dialog() {
	this.visible = false;
	this.dialog = document.getElementById("dialog");
	this.obj;
	this.cb;
}

Dialog.prototype.on = function() {
	this.visible = true;
	this.dialog.text = this.text;
	document.body.removeChild(alldiv);
	// document.body.removeChild(canvas);
	this.dialog.setAttribute("style", "width: 960px; height: 640px; text-align: center");
	document.body.appendChild(this.dialog);
}

Dialog.prototype.off = function(n1) {
	if(document.getElementById("dialog")== null)
		return;
	if (this.obj == null && n1 == "simple") {
		simple = true;
		timer.start(256);
	}
	if (this.obj == null && n1 == "full") {
		simple = false;
		timer.start(40);
	}
	if (!(this.obj == undefined))
		this.obj[n1](this.obj);
	this.visible = true;
	document.body.appendChild(alldiv);
	document.body.removeChild(this.dialog);
	while (this.dialog.hasChildNodes()) {
		this.dialog.removeChild(this.dialog.firstChild);
	}
	this.obj = undefined;
}

Dialog.prototype.paint = function() {
	this.visible = false;
}

Dialog.prototype.set = function(img, text) {
	var i = new Image();
	var t = document.createElement("div");
	var b = document.createElement("input");
	b.setAttribute("onClick", "services.getDialog().off();");
	b.style = "align: center";
	b.value = "Ok";
	b.type = "button";
	t.innerHTML = "</br>" + text + "</br>";
	i.id = "dialog.image";
	i.src = img;
	this.dialog.appendChild(i);
	this.dialog.appendChild(t);
	this.dialog.appendChild(b);
}

Dialog.prototype.setOptions = function(img, text, options, obj, callbacks) {
	// = text; //+"<img id='dialog.img' style='center'/><Button
	// onClick='services.getDialog().off();' style='align: center'>Ok</Button>";
	this.cb = callbacks;
	var i = new Image();
	var t = document.createElement("div");
	t.innerHTML = "</br>" + text + "</br>";
	i.id = "dialog.image";
	i.src = img;
	this.dialog.appendChild(i);
	this.dialog.appendChild(t);

	for ( var i = 0; i < options.length; i++) {
		var b = document.createElement("input");
		if (callbacks == undefined)
			b.setAttribute("onClick", "services.getDialog().off(" + i + ")");
		else {
			// alert(callbacks[i]);
			this.obj = obj;
			b.setAttribute("onClick", "services.getDialog().off('"
					+ callbacks[i] + "')");
		}
		b.style = "align: center";
		b.value = options[i];
		b.type = "button";
		this.dialog.appendChild(document.createElement("br"));
		this.dialog.appendChild(b);
	}
}

function Services() {
	this.view;
	this.dialog = new Dialog();
}

Services.prototype.getView = function() {
	return this.view;
}

Services.prototype.setView = function(v) {
	if (this.getView())
		this.getView().setActive(false);
	this.view = v;
	this.getView().setActive(true);
}

Services.prototype.getDialog = function() {
	return dialog;
}

function itsTime(timer) {

	if (timer.stopped || services == undefined)
		return;
	if (services.getDialog().visible == true) {
		services.getDialog().paint(null);
	} else {
		services.getView().update(timer);
	}
}

function itsNight(timer) {
	if (timer.stopped || services == undefined)
		return;

	if (services.getView() == ship) {
		if (!services.getView().night) {
			timer.timeout = nightlength;
		} else {
			timer.timeout = daylength;
		}
		services.getView().setNight(!services.getView().night);
	}
}

/*
 * function click(e) { e.preventDefault(); var event; if (e.touches !=
 * undefined) { event = e.touches[0]; } else { event = e; }
 * 
 * var ex = (event.clientX -
 * document.getElementById("canvas").offsetLeft)/scale; var ey = (event.clientY -
 * document.getElementById("canvas").offsetTop)/scale; console.log("ex: "+ex+ "
 * ey: "+ey) var x = (ex - canvaswidth / 2); var y = (canvasheight / 2 - ey);
 * var newdir = Math.atan2(y, x); if (newdir < 0) { newdir += 2 * Math.PI; }
 * services.getView().setCourse(newdir * 360 / 2 / Math.PI, ex, ey); return; }
 */
