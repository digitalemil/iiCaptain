var daylength = 8000;
var nightlength = 2000;
var sextantimg = new Image();
var ctx;
var alldiv;
var retina= 1;
var tilesimg= new Image();
var nightimg= new Image();
var timer, nightTimer, services, ship, home;
var canvaswidth= 384, canvasheight= 384, tiledim= 24;
var simple= true;
var canvas, mapcanvas, atsea;
var seaimg;

var iiCaptainDisable= function() {
	timer.stop= true;
	nightTimer.stop= true;
	timer= undefined;
	nightTimer= undefined;
	services= undefined;
	ctx= undefined;
	tilesimg= undefined;
	nightimg= undefined;
	ship= home= undefined;
	
	alldiv.removeChild(bgimg);
	alldiv.removeChild(seaimg2);
	alldiv.removeChild(mapimg);
	alldiv.removeChild(sextantimg);
	alldiv.removeChild(canvas);
	alldiv.removeChild(mapcanvas);
	alldiv.removeChild(atsea);
	
	sextantimg= undefined;
	canvas= mapcanvas= atsea= seaimg= undefined;
	bgimg= seaimg2= mapimg= undefined;
	alldiv= undefined;
//	while(document.get)
	
}

var iiCaptainSetup= function(id) {
	alldiv= id;
	var bgimg= new Image();
	bgimg.src= "res/bgimg2.png";
	bgimg.setAttribute("id", "bgimg");
	id.appendChild(bgimg);
	seaimg= new Image();
	var seaimg2= new Image();
	seaimg2.src="res/seamap2.png";
	seaimg2.setAttribute("id", "seaimg2");
	id.appendChild(seaimg2);
	var mapimg= new Image();
	mapimg.src="res/seamap2.png";
	mapimg.setAttribute("id", "mapimg");
	
	id.appendChild(mapimg);
	sextantimg= new Image();
	sextantimg.src="res/sextant.png";
	sextantimg.setAttribute("id", "sextantimg");
	id.appendChild(sextantimg);
	
	canvas= document.createElement('canvas');
	mapcanvas= document.createElement('canvas');
	atsea= document.createElement('canvas');
	id.appendChild(canvas);
	id.appendChild(mapcanvas);
	id.appendChild(atsea);

	canvas.setAttribute("id", "canvas");
	canvas.setAttribute("width", canvaswidth);
	canvas.setAttribute("height", canvasheight);
	canvas.setAttribute("style", "position:absolute; top:"+72+"px; left: "+62+"px;");
	mapcanvas.setAttribute("id", "mapcanvas");
	mapcanvas.setAttribute("style", "position:absolute; top:"+80+"px; left: "+580+"px;");
	mapcanvas.setAttribute("width", 384);
	mapcanvas.setAttribute("height", 384);
	
	mapimg.setAttribute("style", "position:absolute; top: "+54+"px; left: "+552+"px; width:"+320+"px; height:"+220+"px;");
	sextantimg.setAttribute("style", "position:absolute; top: "+80+"px; left: "+794+"px;");
	atsea.setAttribute("id", "atsea");
	atsea.setAttribute("width", "320px;");
	atsea.setAttribute("height", "200px;");
	atsea.setAttribute("style", "position:absolute; top:"+324+"px; left: "+556+"px;");
	bgimg.setAttribute("style", "position:absolute; top:0px; left:0px; width: "+960+"px; height: "+640+"px;");
	seaimg2.setAttribute("style", "position:absolute; top: "+16+"px; left: "+8+"px; width:"+500+"px;");

	canvas.setAttribute("onMouseDown", "iicaptainclick(event);");
	canvas.setAttribute("onMouseUp", "mousedown=false");
	//canvas.setAttribute("ontouchstart","click(event)");
	canvas.setAttribute("ontouchend", "mousedown=false; lastkey= -1");
	mapcanvas.setAttribute("onMouseDown", "services.getView().mapSprite.navigate();");
	mapcanvas.setAttribute("ontouchstart", "services.getView().mapSprite.navigate();");

	load();
	ship.setNight(false);
	ship.mapSprite.paint(ctx);				 
	
}

//var TheRegion;
function iicaptainclick(e) {
		e.preventDefault();
        var event;
        if (e.touches != undefined) {
                event = e.touches[0];
        } else {
                event = e;
        }
      
            var ex = event.clientX - canvas.offsetLeft- alldiv.offsetLeft + document.body.scrollLeft;
        var ey = event.clientY - canvas.offsetTop- alldiv.offsetTop+  document.body.scrollTop;
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
   
    if(window.XMLHttpRequest) {
        try {
            req = new XMLHttpRequest();
        } catch(e) {
            req = false;
        }
    // branch for IE/Windows ActiveX version
    } 
    else {
        if(window.ActiveXObject) {
            try {
                req = new ActiveXObject("Msxml2.XMLHTTP");
            } 
            catch(e) {
                try {
                    req = new ActiveXObject("Microsoft.XMLHTTP");
                } 
                catch(e) {
                    req = false;
                }
            }
        }
    }
    if(req) {
        req.onreadystatechange = processReqChange;
        req.open("GET", url, true);
        req.send("");
    }
    else {
        alert("req== false");
    }
	
}

function processReqChange() {
	  
	if (req.readyState != 4) 
        return;
    
    // ...processing statements go here...
    var response  = req.responseText;
    var obj= eval('(' + response + ')');	
    World.map= obj.map;
    World.currentWidth= obj.width;
    World.currentHeight= obj.height;
}	

function load() {
    seaimg.src = 'res/newsea.png';
    tilesimg.src = 'res/newtiles.png';
    nightimg.src = 'res/night.png';
    sextantimg.src = 'res/sextant.png';
    var dim = [ 128, 128];
    if (true) {
        World = new NWorld();
        //	World.createMap(dim[0], dim[1]);
        /*
		console.log("{ \"width\": "+dim[0]+", \"height\": "+dim[1]+", \"map\": ["); 
		var line= new String();
		for(var x= 0; x< World.MAXWIDTH+ World.EXTENT; x++) {			
			line= "[";
			for(var y= 0; y< World.MAXHEIGHT; y++) {			
				line+= World.get(x, y)+((y==(World.MAXHEIGHT-1))?"":", ");
			}
			if(x< World.MAXWIDTH+World.EXTENT-1)
				console.log(line+"],");
			else
				console.log(line+"]] }");
		}*/
        loadData("js/World.json");
        World.currentWidth = dim[0];
        World.currentHeight = dim[1];
	
        init();
        //ship.mapSprite= new MapSprite();
        ship.dx= World.currentWidth+4;
        ship.dy= World.currentHeight/2;	


    } else {
        var worker = new Worker('js/CreatorWorker.js');
        worker.onmessage = function(event) {
            World = new NWorld();
            World.currentWidth = dim[0];
            World.currentHeight = dim[1];
            var d= new String(event.data);
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
   // canvas = document.getElementById("canvas");
    ctx = canvas.getContext('2d');
    dialog = new Dialog();
    dialog.off();
    services = new Services();
    ship = new Ship();

	
    home = new Home();
    // services.setView(home);
    services.setView(ship);
    services.getView().paint();
    timer = new MyTimer(itsTime);

    var opts= [];
    opts[0]= "Simple";
    opts[1]= "  Full  ";
    var callbacks= [];
    callbacks[0]=  "simple"
    callbacks[1]= "full";
	
	
	
        simple= false;
        timer.start(40);
//    services.getDialog().setOptions("res/newland.png", "Choose the Mode", opts, null, callbacks);
 //   services.getDialog().on();
    /*		
	timer = new MyTimer(itsTime);
	if (simple)
		timer.start(256);
	else
		timer.start(40);
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
    //	document.body.removeChild(canvas);
    document.body.appendChild(this.dialog);
}

Dialog.prototype.off = function(n1) {
    if(this.obj== null && n1== "simple") {
        simple= true;
        timer.start(256);
    }
    if(this.obj== null && n1== "full") {
        simple= false;
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
    this.cb= callbacks;
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
	
	if(timer.stopped || services== undefined)
		return;
    if (services.getDialog().visible == true) {
        services.getDialog().paint(null);
    } else {
        services.getView().update(timer);
    }
}

function itsNight(timer) {
	if(timer.stopped || services== undefined)
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

function click(e) {
    e.preventDefault();
    var event;
    if (e.touches != undefined) {
        event = e.touches[0];
    } else {
        event = e;
    }

    var ex = event.clientX - document.getElementById("canvas").offsetLeft;
    var ey = event.clientY - document.getElementById("canvas").offsetTop;
    var x = ex - canvaswidth / 2;
    var y = canvasheight / 2 - ey;
    var newdir = Math.atan2(y, x);
    if (newdir < 0) {
        newdir += 2 * Math.PI;
    }
    services.getView().setCourse(newdir * 360 / 2 / Math.PI, ex, ey);
    return;
}

