/**
 * @author emil
 */
function MapSprite() {	
	this.init();
	this.maxy;
	this.state = 0;
	this.ux;
	this.uy;
	this.n;
	this.OFFSET = 5;
	this.mapctx= mapcanvas.getContext('2d');
	this.atseactx= atsea.getContext('2d');
	this.newWorld();

	this.onload= true;
	var img= new Image();
	img.loaded= false;
	this.atsea= img; 
	this.atsea.doneloaded= false;
	this.atsea.src= "res/seamap3.png";

	this.atseatext= new Image();
	this.atseatext.src= "res/atsea.png";
	this.hull= 100;
}

MapSprite.prototype.newWorld= function() {
	this.discovered = 0;
	this.sunimg= createOffScreenImage(World.currentWidth + 2 * this.OFFSET+ World.EXTENT+64, 36);
	this.sunctx= this.sunimg.getContext('2d');
	this.img= createOffScreenImage(World.currentWidth + 2 * this.OFFSET+ World.EXTENT+64, World.currentHeight + 2 * this.OFFSET);
	this.ctx= this.img.getContext('2d');
	this.drawMap();
	this.done= -1;
}

MapSprite.prototype.drawMap= function() {
	this.days= 0;
	
	this.sunctx.fillStyle   = '#ddedec';
	this.sunctx.strokeStyle = '#ddedec';
	this.sunctx.fillRect(0, 0, this.sunimg.width, this.sunimg.height);
	this.sunctx.lineWidth   = 0.2;
	this.sunctx.beginPath();
	this.sunctx.fillStyle   = '#000000';
	this.sunctx.strokeStyle = '#000000';
	
	this.sunctx.moveTo(0, 0);
	this.sunctx.lineTo(this.sunimg.width-1, 0);
	this.sunctx.lineTo(this.sunimg.width-1, this.sunimg.height-1);
	this.sunctx.lineTo(0, this.sunimg.height-1);
	this.sunctx.lineTo(0, 0);
	this.sunctx.stroke();
	
	this.ctx.beginPath();
	
	this.ctx.fillStyle   = '#ddedec';
	this.ctx.strokeStyle = '#ddedec';
	this.ctx.lineWidth   = 0.2;

	this.ctx.beginPath();
	
	this.ctx.fillRect(0, 0, this.img.width, this.img.height);

	var delta = 16;
	this.ctx.fillStyle   = '#000000';
	this.ctx.strokeStyle = '#000000';
	
	this.ctx.moveTo(0, 0);
	this.ctx.lineTo(this.img.width-1, 0);
	this.ctx.lineTo(this.img.width-1, this.img.height-1);
	this.ctx.lineTo(0, this.img.height-1);
	this.ctx.lineTo(0, 0);
	this.ctx.stroke();
	this.ctx.beginPath();
	
	this.ctx.fillStyle   = '#9a9d9d';
	this.ctx.strokeStyle = '#9a9d9d';
	
	this.ctx.moveTo(this.OFFSET-2,  this.OFFSET-2);
	this.ctx.lineTo(this.img.width + this.OFFSET+2,  this.OFFSET-2);
	this.ctx.moveTo(this.OFFSET-2,  this.OFFSET-2);
	this.ctx.lineTo(this.OFFSET-2,  this.img.height + this.OFFSET+2);
	this.ctx.moveTo(this.OFFSET-2,  this.img.height + this.OFFSET+2)
	this.ctx.lineTo(this.img.width - this.OFFSET+2,  this.img.height + this.OFFSET+2);
	this.ctx.moveTo(this.img.width - this.OFFSET+2,  this.img.height + this.OFFSET+2);
	this.ctx.lineTo(this.img.width - this.OFFSET+2,  this.OFFSET-2);
	this.ctx.moveTo(this.OFFSET,  this.OFFSET);
	this.ctx.lineTo(this.img.width + this.OFFSET,  this.OFFSET);
	this.ctx.moveTo(this.OFFSET,  this.OFFSET);
	this.ctx.lineTo(this.OFFSET,  this.img.height + this.OFFSET);
	this.ctx.moveTo(this.OFFSET,  this.img.height + this.OFFSET);
	this.ctx.lineTo(this.img.width + this.OFFSET,  this.img.height + this.OFFSET);
	this.ctx.moveTo(this.img.width + this.OFFSET,  this.img.height + this.OFFSET);
	this.ctx.lineTo(this.img.width + this.OFFSET,  this.OFFSET);

	for (var i = delta; i < this.img.width; i += delta) {
		this.ctx.moveTo(this.OFFSET + i,  this.OFFSET);
		this.ctx.lineTo(this.OFFSET+i,  this.img.height+this.OFFSET);
	}
	for (var i = delta; i < this.img.height; i += delta) {
		this.ctx.moveTo(this.OFFSET,  this.OFFSET + i);
		this.ctx.lineTo(this.img.width+this.OFFSET,  this.OFFSET + i);
	}

	this.ctx.stroke();
	this.ctx.fillStyle   = '#606060';
	this.ctx.strokeStyle = '#606060';      
	
	this.maplogo= new Image();
	this.maplogo.src= "res/map1.png";
	this.ux = -10 + myRandom(0, 20);
	this.uy = -10 + myRandom(0, 20);
	this.ctx.beginPath();
	var sy= this.img.height/124;	
	
	this.cross= new Image();
	this.cross.src= "res/crosshair.png";
	
	this.redcross= new Image();
	this.redcross.src= "res/redcrosshair.png";
	
	this.visible= true;
	this.daystart= new Date().getTime();
	this.day= true;
	this.sun= new Image();
	this.sun.src= "res/sun.png";
	this.numbers= new Image();
	this.numbers.src= "res/numbers.png";
	
	this.posx=  undefined;
	this.posy=	undefined;
	this.timedelta= 0;
	this.timeoff= -0.5* Math.random();
	this.changed= true;
	
	var i = new Image();
	var context= this.ctx;
	i.src= "res/map2.png";
	
	i.onload = function() {
		context.drawImage(i, -16, -16, i.width, i.height);   
	}
	
}

copyPrototype(MapSprite, Sprite);

MapSprite.prototype.setNight= function(b) {
	//this.atsea.doneloaded= true;

	this.daystart= new Date().getTime();
	this.day= b;
	if(b) {
		this.days++;
		this.changed= true;
		this.timedelta+= this.timeoff*Math.random();
	}
}

MapSprite.prototype.paint= function(ctx) {
	console.log("Map paint");
	var c= this.mapctx;
	var delta= new Date().getTime()- this.daystart;
	if (!this.visible) {
		return;
	}

	var x1;
	var y1;
	var sy= 124/this.img.height/retina;	
	c.drawImage(this.sunimg, 0, 0, sy*this.img.width, 36/retina); 
	if(this.day) {
		var phi= delta/daylength * Math.PI;
		x1= Math.floor(8+ (this.img.width-16)*delta/daylength);
		y1= Math.floor(36-	(36)*Math.sin(phi));	
		var start= 24*4- 24* Math.floor(((delta*2)/daylength*4));
		if(start< 0)
			start= +4*24;
		var se1= 12;
		if(y1> 24) {
			se1-= y1-24;
		}

		try {
			c.drawImage(this.sun, 0, start, 24, se1*2, sy*x1, sy*y1, 12/retina, se1/retina);
		}
		catch(e) {		
			this.changed= true;
		}
	}
	//console.log("return: "+this.atsea.doneloaded);
	
	if(!this.changed && this.atsea.doneloaded) {
		return;
	}
	this.changed= false;
	if(this.posx== undefined) {		
		this.posx=  ship.getTileX();
		this.posy=	ship.getTileY();
	}
	var tx = this.posx;
	var ty = this.posy;
	
	try {
	c.drawImage(this.img, 0, 36, sy*this.img.width, 124/retina); 	 
	c.drawImage(this.maplogo, sy*(this.img.width-64), 36+124/retina-sy*28, sy*64, sy*28);
	
	x1= sy*Math.max(0, Math.min(this.img.width-8, this.OFFSET+ tx)-8);
	y1= sy*(36+Math.max(-8, Math.min(this.img.height-8,  this.OFFSET+ ty)-8));	
	if(tx< 0 || tx>= World.currentWidth+World.EXTENT || ty<0 || ty>= World.currentHeight)
		c.drawImage(this.redcross, x1, y1, this.redcross.width/retina, this.redcross.height/retina);	
	else
		c.drawImage(this.cross, x1, y1, this.cross.width/retina, this.cross.height/retina);
		this.atseactx.drawImage(this.atsea, 0, 0, 332, 156);
		this.atseactx.drawImage(this.atseatext, 20, 16);
		this.drawNumber(this.days, 192+this.calcNumberLength(this.days, 0), 16, this.atseactx);
		this.drawNumber(this.hull, 192+this.calcNumberLength(this.hull, 0), 82, this.atseactx);
	}
	catch(e) {
	//	console.log(e);
		this.changed= true;
	}

}

MapSprite.prototype.collision= function(c) {
	this.hull+= c;
	this.changed= true;
}

MapSprite.prototype.calcNumberLength= function(d, x) {
	var start= [4,32, 50, 78, 106, 130, 156, 182, 204, 224, 288];
	var end= [24, 48, 72, 98, 126, 150, 170, 202, 222, 244, 294];
	if(d> 9) {
		var d1= Math.round((d/10-Math.floor(d/10))*10);		
		x+= this.calcNumberLength(Math.floor(d/10), x);
		d= d1;
	} 
	return x+end[d]-start[d];
}

MapSprite.prototype.drawNumber= function(d, x, y, c) {
	var start= [4,32, 50, 78, 106, 130, 156, 182, 204, 224, 288];
	var end= [24, 48, 72, 98, 126, 154, 178, 202, 222, 244, 294];
	
	if(d> 9) {
		var d1= Math.round((d/10-Math.floor(d/10))*10);		
		this.drawNumber(Math.floor(d/10), x-(end[d1]-start[d1]), y, c);
		d= d1;
	} 
	try {
		c.drawImage(this.numbers, start[d], 0, end[d]-start[d], 38, x, y, end[d]-start[d], 38);
	}
	catch(e) {
	//	console.log(e);
		
	};
}

MapSprite.prototype.navigate= function() {
	if(!this.day)
		return;
	
	var delta= new Date().getTime()- this.daystart;
	this.posx=  ship.getTileX()+ Math.round(this.timedelta);
	this.posy=	ship.getTileY()+ (2*(daylength/2-delta)/daylength)*World.currentHeight/2;
	this.changed= true;
	this.paint(null);
}

MapSprite.prototype.tileDiscovered= function(x, y, t) {
	this.changed= true;
	if(t <= Region.LAND || t >= Region.LAND + 15) 
		return;
	this.ctx.fillRect((this.OFFSET + x),( this.OFFSET+ y), 1, 1);
	if (t >= 4) {
		this.discovered++;
	}
}


