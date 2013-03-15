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
	this.mapctx = mapcanvas.getContext('2d');
	// this.mapctx.scale(scale, scale);
	this.atseactx = atsea.getContext('2d');
	this.atseactx.scale(scale, scale);

	this.newWorld();

	this.onload = true;
	var img = new Image();
	img.loaded = false;
	this.atsea = img;
	this.atsea.doneloaded = false;
	this.atsea.src = "res/seamap3.png";

	this.atseatext = new Image();
	this.atseatext.src = "res/atsea.png";
	this.hull = 100;
}

MapSprite.prototype.newWorld = function() {
	this.discovered = 0;
	this.sunimg = createOffScreenImage(World.currentWidth + 2 * this.OFFSET
			+ World.EXTENT, 36 * scale);
	this.sunctx = this.sunimg.getContext('2d');
	this.img = createOffScreenImage((World.currentWidth + 2 * this.OFFSET
			+ World.EXTENT + 64), (World.currentHeight + 2 * this.OFFSET));

	this.ctx = this.img.getContext('2d');
	// this.ctx.scale(scale, scale);
	this.drawMap();
	this.done = -1;
};

MapSprite.prototype.drawMap = function() {
	this.days = 0;

	this.sunctx.fillStyle = '#ddedec';
	this.sunctx.strokeStyle = '#ddedec';
	this.sunctx.fillRect(0, 0, this.sunimg.width, this.sunimg.height);
	this.sunctx.lineWidth = 0.2;
	this.sunctx.beginPath();
	this.sunctx.fillStyle = '#000000';
	this.sunctx.strokeStyle = '#000000';

	this.sunctx.moveTo(0, 0);
	this.sunctx.lineTo(this.sunimg.width - 1, 0);
	this.sunctx.lineTo(this.sunimg.width - 1, this.sunimg.height - 1);
	this.sunctx.lineTo(0, this.sunimg.height - 1);
	this.sunctx.lineTo(0, 0);
	this.sunctx.stroke();

	this.ctx.beginPath();

	this.ctx.fillStyle = '#ddedec';
	this.ctx.strokeStyle = '#ddedec';
	this.ctx.lineWidth = 0.2;

	this.ctx.beginPath();

	this.ctx.fillRect(0, 0, this.img.width, this.img.height);

	var delta = 16;
	this.ctx.fillStyle = '#000000';
	this.ctx.strokeStyle = '#000000';

	this.ctx.moveTo(0, 0);
	this.ctx.lineTo(this.img.width - 1, 0);
	this.ctx.lineTo(this.img.width - 1, this.img.height - 1);
	this.ctx.lineTo(0, this.img.height - 1);
	this.ctx.lineTo(0, 0);
	this.ctx.stroke();
	this.ctx.beginPath();

	this.ctx.fillStyle = '#9a9d9d';
	this.ctx.strokeStyle = '#9a9d9d';

	this.ctx.moveTo(this.OFFSET - 2, this.OFFSET - 2);
	this.ctx.lineTo(this.img.width + this.OFFSET + 2, this.OFFSET - 2);
	this.ctx.moveTo(this.OFFSET - 2, this.OFFSET - 2);
	this.ctx.lineTo(this.OFFSET - 2, this.img.height + this.OFFSET + 2);
	this.ctx.moveTo(this.OFFSET - 2, this.img.height + this.OFFSET + 2);
	this.ctx.lineTo(this.img.width - this.OFFSET + 2, this.img.height
			+ this.OFFSET + 2);
	this.ctx.moveTo(this.img.width - this.OFFSET + 2, this.img.height
			+ this.OFFSET + 2);
	this.ctx.lineTo(this.img.width - this.OFFSET + 2, this.OFFSET - 2);
	this.ctx.moveTo(this.OFFSET, this.OFFSET);
	this.ctx.lineTo(this.img.width + this.OFFSET, this.OFFSET);
	this.ctx.moveTo(this.OFFSET, this.OFFSET);
	this.ctx.lineTo(this.OFFSET, this.img.height + this.OFFSET);
	this.ctx.moveTo(this.OFFSET, this.img.height + this.OFFSET);
	this.ctx
			.lineTo(this.img.width + this.OFFSET, this.img.height + this.OFFSET);
	this.ctx
			.moveTo(this.img.width + this.OFFSET, this.img.height + this.OFFSET);
	this.ctx.lineTo(this.img.width + this.OFFSET, this.OFFSET);

	for ( var i = delta; i < this.img.width; i += delta) {
		this.ctx.moveTo(this.OFFSET + i, this.OFFSET);
		this.ctx.lineTo(this.OFFSET + i, this.img.height + this.OFFSET);
	}
	for ( var i = delta; i < this.img.height; i += delta) {
		this.ctx.moveTo(this.OFFSET, this.OFFSET + i);
		this.ctx.lineTo(this.img.width + this.OFFSET, this.OFFSET + i);
	}

	this.ctx.stroke();
	this.ctx.fillStyle = '#606060';
	this.ctx.strokeStyle = '#606060';

	this.maplogo = new Image();
	this.maplogo.src = "res/map1.png";
	this.ux = -10 + myRandom(0, 20);
	this.uy = -10 + myRandom(0, 20);
	this.ctx.beginPath();

	this.cross = new Image();
	this.cross.src = "res/crosshair.png";

	this.redcross = new Image();
	this.redcross.src = "res/redcrosshair.png";

	this.visible = true;
	this.daystart = new Date().getTime();
	this.day = true;
	this.sun = new Image();
	this.sun.src = "res/sun.png";
	this.numbers = new Image();
	this.numbers.src = "res/numbers.png";

	this.posx = undefined;
	this.posy = undefined;
	this.timedelta = 0;
	this.timeoff = -0.5 * Math.random();
	this.changed = true;

	var i = new Image();
	var context = this.ctx;
	i.src = "res/map2.png";

	i.onload = function() {
		context.drawImage(i, -16, -16, i.width, i.height);
	};

};

copyPrototype(MapSprite, Sprite);

MapSprite.prototype.setNight = function(b) {
	// this.atsea.doneloaded= true;

	this.daystart = new Date().getTime();
	this.day = b;
	if (b) {
		this.days++;
		this.changed = true;
		this.timedelta += this.timeoff * Math.random();
	}
};

MapSprite.prototype.paint = function(ctx) {
	// console.log("Map paint");
	// return;
	var c = this.mapctx;
	var delta = new Date().getTime() - this.daystart;
	if (!this.visible) {
		return;
	}

	var x1;
	var y1;

	c.drawImage(this.sunimg, 0, 0, mapcdx, 36 * scale);

	if (this.day) {
		var phi = delta / daylength * Math.PI;
		x1 = Math
				.floor(-12 * scale + (mapcdx + 24 * scale) * delta / daylength);
		y1 = Math.floor(36 - (36) * Math.sin(phi));
		var start = 24 * 4 - 24 * Math.floor(((delta * 2) / daylength * 4));
		if (start < 0)
			start = +4 * 24;
		var se1 = 12;
		if (y1 > 24) {
			se1 -= y1 - 24;

		}
		try {
			c.drawImage(this.sun, 0, start, 24, se1 * 2, x1, y1 * scale,
					12 * scale, 12 * scale);
		} catch (e) {
			this.changed = true;
		}
	}

	if (!this.changed && this.atsea.doneloaded) {
		return;
	}
	this.changed = false;
	if (this.posx == undefined) {
		this.posx = ship.getTileX();
	}
	
	var tx = this.posx+this.OFFSET;
	var ty = this.posy+this.OFFSET;
	
	try {
		c.drawImage(this.img, 0, 0, this.img.width, this.img.height, 0,
				36 * scale, mapcdx, (mapcdy - 36 * scale));
		c.drawImage(this.maplogo, mapcdx - 52 * scale, mapcdy - 24 * scale,
				(32 * 1.5) * scale, (14 * 1.5) * scale);
		x1 = (tx / (World.currentWidth + 2 * this.OFFSET + World.EXTENT + 64) * mapcdx);
		y1 = (ty * (mapcdy - 36*scale) / (World.currentHeight + 2 * this.OFFSET));
	//	console.log("x1: " + x1 + " y1: " + y1 + " " + (36 * scale) + " "
		//		+ mapcdy + " " + (36 - this.cross.height / 2 * scale + y1));
		var rc = false;
		if (x1 < 0) {
			rc = true;
			x1 = 0;
		}

		if (y1 < 0) {
			rc = true;
			y1 = 0;
		}

		if (y1 > mapcdy-36*scale) {
			rc = true;
			y1 = mapcdy-36*scale;
		}

		c.drawImage(rc ? this.redcross : this.cross, x1 - this.cross.width / 2
				* scale, 36*scale - this.cross.height / 2 * scale + y1,
				this.cross.width * scale, this.cross.height * scale);
		
		this.atseactx.drawImage(this.atsea, 0, 0, 332, 156);
		this.atseactx.drawImage(this.atseatext, 20, 16, 192, 128);
		this.drawNumber(this.days, 192 + this.calcNumberLength(this.days, 0),
				16, this.atseactx);
		this.drawNumber(this.hull, 192 + this.calcNumberLength(this.hull, 0),
				82, this.atseactx);
	} catch (e) {
		// console.log(e);
		this.changed = true;
	}

};

MapSprite.prototype.collision = function(c) {
	this.hull += c;
	this.changed = true;
};

MapSprite.prototype.calcNumberLength = function(d, x) {
	var start = [ 4, 32, 50, 78, 106, 130, 156, 182, 204, 224, 288 ];
	var end = [ 24, 48, 72, 98, 126, 150, 170, 202, 222, 244, 294 ];
	if (d > 9) {
		var d1 = Math.round((d / 10 - Math.floor(d / 10)) * 10);
		x += this.calcNumberLength(Math.floor(d / 10), x);
		d = d1;
	}
	return x + end[d] - start[d];
};

MapSprite.prototype.drawNumber = function(d, x, y, c) {
	var start = [ 4, 32, 50, 78, 106, 130, 156, 182, 204, 224, 288 ];
	var end = [ 24, 48, 72, 98, 126, 154, 178, 202, 222, 244, 294 ];

	if (d > 9) {
		var d1 = Math.round((d / 10 - Math.floor(d / 10)) * 10);
		this.drawNumber(Math.floor(d / 10), x - (end[d1] - start[d1]), y, c);
		d = d1;
	}
	try {
		c.drawImage(this.numbers, start[d], 0, end[d] - start[d], 38, x, y,
				(end[d] - start[d]), 38);
	} catch (e) {
		// console.log(e);

	}
};

MapSprite.prototype.navigate = function() {
	if (!this.day)
		return;

	var delta = new Date().getTime() - this.daystart;
	this.posx = ship.getTileX() + Math.round(this.timedelta);
	this.posy = ship.getTileY() + (2 * (daylength / 2 - delta) / daylength)
			* World.currentHeight / 2;
	this.changed = true;
	this.paint(null);
};

MapSprite.prototype.tileDiscovered = function(x, y, t) {
	this.changed = true;
	if (t <= Region.LAND || t >= Region.LAND + 15)
		return;
	this.ctx.fillRect((this.OFFSET + x), (this.OFFSET + y), 1, 1);
	if (t >= 4) {
		this.discovered++;
	}
};
