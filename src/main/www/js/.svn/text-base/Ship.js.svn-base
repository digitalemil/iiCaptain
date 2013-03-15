

function Ship() {
	this.dx= 128+Math.floor(16/2);
	this.dy= 64;
	this.dir= 30;

	this.olddx= this.dx;
	this.olddy= this.dy;
	this.olddir= this.dir;
	this.speed= 0;
	this.shipx= 0;
	this.shipy= 0;

	//if(simple)
	//	this.speed= tiledim;
	this.anker= true;     
	this.night= false;  
	this.onboard= true;
	this.captain= new Captain2Sprite((canvaswidth-26)/2, (canvasheight-48)/2);
	this.captain.visible= false;
	this.ship= new ShipSprite(this);
	//this.gundeck= new Gundeck((canvaswidth-256)/2, 8);
	//this.gundeck.setVisible(false);	
	this.sea= null;
	this.map= null;
	this.tx= -1; 
	this.ty= -1;

	this.vdx= 0;
	this.vdy= 0;
	this.vn= 0;
	this.visible= false;

	this.newcourse= this.dir;
	this.mapSprite= new MapSprite();
}

Ship.prototype.setActive= function(b) {
	if(b) {
		atsea.width= 320;
	//	atsea.getContext('2d').drawImage(atsea, 0, 0);  	
		this.newcourse=30;
		if(this.mapSprite!= undefined)
			this.mapSprite.navigate();
	}
	else {
		atsea.width= 0;
	}
};

Ship.prototype.setCourse= function(deg, x, y) {
	var shipdim= 20;

	
	if(this.speed>=0.5 && x> canvaswidth/2-shipdim*scale && x< canvaswidth/2+shipdim*scale && y< canvasheight/2+shipdim*scale && y> canvasheight/2-shipdim*scale) {
		if(!simple) {
			this.speed-= 0.5;
			if(this.speed< 0) {
				this.speed= 0;
				if(!this.onboard)
					this.captain.stopWalking();
			}
		}
		else {
			this.speed= 0;
			this.captain.stopWalking();
		}		
		if(this.onboard && !this.anker && this.speed== 0.0)
			this.anker= true;
		return;
	}

	if(!simple && this.anker && this.onboard && x> canvaswidth/2-shipdim*scale && x< canvaswidth/2+shipdim*scale && y< canvasheight/2+shipdim*scale && y> canvasheight/2-shipdim*scale) {
		var phip=this.dir+30;
		if(phip>= 60)
			phip-= 60;
		this.dx += 1.0 * cos[phip] / tiledim;
		this.dy -= 1.0 * sin[phip] / tiledim; 	
	}

	if(x< canvaswidth/2-shipdim*scale || x> canvaswidth/2+shipdim*scale || y> canvasheight/2+shipdim*scale || y< canvasheight/2-shipdim*scale) {
		if(this.onboard) {
			dx1= x- canvaswidth/2;
			dy1= y- canvasheight/2;			
			dx1= Math.floor(this.dx+dx1/tiledim);
			dy1= Math.floor(this.dy+dy1/tiledim);
			if(Math.abs(dx1- this.dx)<3 && Math.abs(dy1- this.dy)< 3) {
				this.land(this.testLandingZone(dx1, dy1));				
			}
		}
		else {
			if(simple) {
				shipdim= 2*tiledim;
			}
			if(x< (this.ship.x+this.ship.w/2)+ shipdim && x>= (this.ship.x+this.ship.w/2)- shipdim && y>=  (this.ship.y+this.ship.h/2)- shipdim && y< (this.ship.y+this.ship.h/2)+ shipdim) {
				if(this.ship.x> canvaswidth/2- this.ship.w/2- 4*shipdim && this.ship.x<= canvaswidth/2- this.ship.w/2+ 4*shipdim && this.ship.y> canvasheight/2- this.ship.h/2- 4*shipdim && this.ship.y<= canvasheight/2- this.ship.h/2+ 4*shipdim) {
					this.speed = 0.0;
					this.captain.stopWalking();
					this.onboard = true;
					this.captain.visible= false;
					this.dx = this.shipx;
					this.dy = this.shipy;
					this.newcourse= this.dir;
					this.ship.center();
					return;
				}
			}

		}
		if(!simple) 
			this.newcourse= Math.floor(deg/6);
		else {
			this.newcourse= Math.floor(Math.round(deg/90))*15;
			this.newcourse%=60;
		}
		if(this.onboard) {
			if(!simple)
				this.speed= 4.0;
			else
				this.speed= tiledim;
			this.anker= false;
		}
		else {
			if(!simple)
				this.speed= 2.0;	
			else
				this.speed= tiledim;
			this.captain.startWalking();
		}
	}
};

Ship.prototype.fires= function() {
	return (this.ship.gunstate[0]!= 0 || this.ship.gunstate[1]!= 0 || this.gundeck.fires());
};

Ship.prototype.setNight= function(v) {
	this.mapSprite.setNight(!v);
	this.night= v;
};

Ship.prototype.update= function(timer) {
	var delta= 1;
	if(simple)
		delta= 15;
	if(this.onboard && this.newcourse!= this.dir) {
		if(this.newcourse> this.dir) {
			if(this.newcourse-this.dir>30)
				this.dir-= delta;
			else
				this.dir+= delta;
		}
		else {
			if(this.dir- this.newcourse>30)
				this.dir+= delta;
			else
				this.dir-=delta;
		}
		while(this.dir>= 60)
			this.dir-= 60;
		if(this.dir< 0)
			this.dir+= 60;

	}
	if(!this.onboard && this.newcourse!= this.captain.dir) {
		if(this.newcourse> this.captain.dir) {
			if(this.newcourse-this.captain.dir>30)
				this.captain.right();
			else
				this.captain.left();
		}
		else {
			if(this.captain.dir- this.newcourse>30)
				this.captain.left();
			else
				this.captain.right();
		}
		while(this.captain.dir>= 60)
			this.dir-= 60;
		if(this.captain.dir< 0)
			this.captain.dir+= 60;

	}

	if(this.onboard && !this.anker) { 
		this.olddx = this.dx;
		this.olddy = this.dy;
		this.olddir = this.dir;
		this.dx += this.speed * cos[this.olddir] / tiledim ;
		this.dy -= this.speed * sin[this.olddir] / tiledim ; 

		if(this.dx> World.currentWidth+16) {
			services.setView(home);
			return;
		}
		this.checkCollision();
	}
	if(!this.onboard) {
		this.captain.tick(0, timer);
		if(this.captain.isWalking()) {
			this.olddx = this.dx;
			this.olddy = this.dy;
			this.olddir = this.dir;
			this.dx += this.speed * cos[this.captain.dir] / tiledim ;
			this.dy -= this.speed * sin[this.captain.dir] / tiledim ; 	
			if(this.checkCaptainCollision(2)) {
				this.ship.move((-this.dx+this.olddx)*tiledim, (-this.dy+this.olddy)*tiledim);
			}
		}
	}
	this.paint();
};
	
Ship.prototype.getLandingZone= function() {
	var tx = this.getTileX();
	var ty = this.getTileY();
	var ret;

	for (var x = 1; x < 3; x++) {
		for (var y = 1; y < 3; y++) {
			ret = this.testLandingZone(tx + x, ty + y);
			if (ret != null) {
				return ret;
			}

			ret = this.testLandingZone(tx - x, ty - y);
			if (ret != null) {
				return ret;
			}

			ret = this.testLandingZone(tx + x, ty - y);
			if (ret != null) {
				return ret;
			}

			ret = this.testLandingZone(tx - x, ty + y);
			if (ret != null) {
				return ret;
			}

		}
	}
	return null;
};

Ship.prototype.checkCaptainBB= function(t, sx, sy, ret) {
	var a5, a6, a7, a8;
	var x = this.captain.x;
	var y = this.captain.y;
	// System.out.println("check: "+ret);
	if (this.captain.isWalking()) {
		a5 = 2 + x + 1;
		a6 = 18 + y + 3;
		a7 = 22 + x + 1;
		a8 = 40 + y + 3;

	} else {
		a5 = 5 + x + 1;
		a6 = 21 + y + 3;
		a7 = 17 + x + 1;
		a8 = 36 + y + 3;
	}

	var a1, a2, a3, a4;

	for (var ns = 0; ns < shipbxmin[t].length; ns++) {
		a1 = sx + shipbxmin[t][ns];
		a2 = sy + shipbymin[t][ns];
		a3 = sx + shipbxmax[t][ns];
		a4 = sy + shipbymax[t][ns];

		// Linke obere Ecke
		if (a5 >= a1 && a5 <= a3 && a6 >= a2 && a6 <= a4) {
			ret |= 1;
		}

		// Rechte Obere Ecke
		if (a7 >= a1 && a7 <= a3 && a6 >= a2 && a6 <= a4) {
			ret |= 2;
		}

		// Rechts unten
		if (a7 >= a1 && a7 <= a3 && a8 >= a2 && a8 <= a4) {
			ret |= 4;
		}

		// Links unten
		if (a5 >= a1 && a5 <= a3 && a8 >= a2 && a8 <= a4) {
			ret |= 8;
		}
	}
	return ret;
};

Ship.prototype.checkCaptainCollision= function(w) {
	var t = World.get(this.getTileX(), this.getTileY());
	if (simple) {
		if (t == 19 || (t >= MyRegion.LAND + 16 && t< MyRegion.LAND+32)) {
			return true;
		}
		return this.undoCaptainCollision();
	}
	
	var sx = (canvaswidth - tiledim) / 2 - this.getSubTileX();
	var sy = (canvasheight - tiledim) / 2 - this.getSubTileY();

	var yt = this.getTileY() - (w + 1);
	var ret = 0;

	for (var y = -w; y < w + 1; y++) {
		yt++;
		var xt = this.getTileX() - (w + 1);
		for (var x = -w; x < w + 1; x++) {
			xt++;
			if (xt < 0 || yt < 0 || xt >= World.currentWidth || yt >= World.currentHeight) {
				continue;
			}
			var t = World.get(xt, yt);
			if (t < MyRegion.LAND || t >= MyRegion.LAND + 32) {
				continue;
			}
			if ((ret = this.checkCaptainBB(t - MyRegion.LAND, sx + x * tiledim, sy + y * tiledim, ret)) == 15) {
				return true;
			}
		}
	}
	if (ret != 15) {
		return this.undoCaptainCollision();
	} else {
		return true;
	}
};

Ship.prototype.undoCaptainCollision= function() {
	this.dx = this.olddx;
	this.dy = this.olddy;
	this.captain.stopWalking();
	this.speed = 0.0;
	return false;
};

Ship.prototype.testLandingZone= function(x, y) {
	if (x < 0 || y < 0 || x >= World.currentWidth - 1 || y >= World.currentHeight) {
		return null;
	}

	var t = World.get(x, y);
	if (t >= MyRegion.LAND && t < MyRegion.PALM + 16) {
		var ox = this.olddx;
		var oy = this.olddy;
		olddx = this.dx;
		olddy = this.dy;
		this.dx = x;
		this.dy = y;
		this.captain.startWalking();
		var check= true;
		if(!simple)
			check= this.checkCaptainCollision(2);
		this.captain.stopWalking();
		this.speed= 0;
		this.dx = olddx;
		this.dy = olddy;
		this.olddx = ox;
		this.olddy = oy;

		if (check) {
			var tile= [];
			tile.x= x;
			tile.y= y;
			return tile;
		} else {
			return null;
		}
	}

	return null;
};

Ship.prototype.land= function(tile) {
	if(tile== null)
		return;
	this.onboard = false;
	this.captain.visible=true;
	this.captain.setDir(this.dir);
	this.captain.stopWalking();
	this.speed = 0.0;
	this.anker= true;
	this.shipx = this.dx;
	this.shipy = this.dy;
	this.dx = tile.x;
	this.dy = tile.y;
	this.ship.move(-(this.dx-this.shipx)*tiledim, -(this.dy-this.shipy)*tiledim);
};


Ship.prototype.getSubTileX= function() {
	return Math.floor((this.dx - Math.floor(this.dx)) * tiledim);
};

Ship.prototype.getSubTileY= function() {
	return Math.floor((this.dy - Math.floor(this.dy)) * tiledim);
};

Ship.prototype.getTileX= function() {
	return Math.floor(this.dx);
};

Ship.prototype.getTileY= function() {
	return Math.floor(this.dy);
};   

Ship.prototype.checkCollision= function() {
	var sx = (canvaswidth- tiledim) / 2 - this.getSubTileX();
	var sy = (canvasheight - tiledim) / 2 - this.getSubTileY();

	if(simple) {
		var t = World.get(this.getTileX(), this.getTileY());
		if (t >= MyRegion.LAND && t < MyRegion.LAND + 32) {
			this.dx = this.olddx;
			this.dy = this.olddy;
			this.dir= this.olddir; 
			this.anker= true;
		}
		return true;
	}
	var yt = this.getTileY() - 3;
	for (var y = -2; y < 3; y++) {
		yt++;
		var xt = this.getTileX() - 3;
		for (var x = -2; x < 3; x++) {
			xt++;
			if (xt < 0 || yt < 0 || xt >= World.currentWidth || yt >= World.currentHeight) {
				continue;
			}
			var t = World.get(xt, yt);
			if (t < MyRegion.LAND || t >= MyRegion.LAND + 32) {
				continue;
			}
			if (!this.checkBB(t - MyRegion.LAND, sx + x * tiledim, sy + y * tiledim)) {
				var texts= [];
				texts[0]= "Tesx1";
				texts[1]= "Tesx2";

				var opts= [];
				opts[0]= "choice1";
				opts[1]= "choice2";

				if(!this.anker) {
					this.mapSprite.collision(-25);
					if(this.mapSprite.hull<= 0) {
					/*	texts[0]= "Collision!";
						texts[1]= "You sunk.";	
						services.getDialog().set("res/schiffbruch2.png", texts[1]);
						services.getDialog().on();*/
					}
				}
				this.dx = this.olddx;
				this.dy = this.olddy;
				this.dir= this.olddir;
				this.anker= true;

				}    
		}
	}
	return true;
};

Ship.prototype.choice1= function(t) {
	alert("Choice1!: "+t.getTileX());
};

Ship.prototype.choice2= function() {
	alert("Choice2!");
};

Ship.prototype.checkBB= function(t, sx, sy) {
	if (this.anker) {
		return true;
	}

	var a1, a2, a3, a4, a5, a6, a7, a8;
	var hx = (canvaswidth-this.ship.w)/2 + 7;
	var hy = (canvasheight-this.ship.h)/2 + 9;

	for (var ns = 0; ns < shipbxmin[t].length; ns++) {
		var d = this.dir * MinBX.NBB;
		a1 = sx + shipbxmin[t][ns];
		a2 = sy + shipbymin[t][ns];
		a3 = sx + shipbxmax[t][ns];
		a4 = sy + shipbymax[t][ns];

		for (var nt = 0; nt < MinBX.NBB; nt++, d++) {
			a5 = hx + MinBX.BXMIN[d];
			a7 = hx + MaxBX.BXMAX[d];
			a6 = hy + MinBY.BYMIN[d];
			a8 = hy + MaxBY.BYMAX[d];
			if (a5 > a7 || a6 > a8) {
				continue;
			}

			if (a5 >= a1 && a5 <= a3) {
				if ((a6 >= a2 && a6 <= a4) || (a8 >= a2 && a8 <= a4)) {
					return false;
				}
			}
			if (a7 >= a1 && a7 <= a3) {
				if ((a6 >= a2 && a6 <= a4) || (a8 >= a2 && a8 <= a4)) {
					return false;
				}
			}
		}
	}
	return true;
}

Ship.prototype.paint= function() {  
	if(!this.visible)
		return
	try {
		if(this.sea== null && seaimg.width> 0) {
			var w= Math.floor(canvaswidth / tiledim) * tiledim + 3 * tiledim;

			var h= Math.floor(canvasheight / tiledim) * tiledim + 3 * tiledim	
			this.sea= createOffScreenImage(w, h);	
			this.map= createOffScreenImage(w, h);
			this.mapctx= this.map.getContext('2d');
			var sx = Math.floor(w- tiledim) / 2;
			var sy = Math.floor(h - tiledim) / 2;

			this.vdx= (w - canvaswidth) / 2;
			this.vdy= (h - canvasheight) / 2;
			var x= -(Math.floor(sx/tiledim)+1);
			var y= -(Math.floor(sy/tiledim)+1);
			var sctx= this.sea.getContext('2d') 

			for(j= y; j<=-y; j++) {
				for(i= x; i<=-x+1; i++) {
					sctx.drawImage(seaimg, 0, 0, tiledim, tiledim, sx + i * tiledim, sy + j * tiledim, tiledim, tiledim);
				}
			}
			ctx.fillStyle   = '#000000';
			ctx.strokeStyle = '#000000';
			ctx.stroke();
		}
		var fx = -this.getSubTileX() - (this.getTileX() - this.tx) * tiledim;
		var fy = -this.getSubTileY() - (this.getTileY() - this.ty) * tiledim;

		if (Math.abs(fx) > this.vdx || Math.abs(fy) > this.vdy || this.vn==50) {
			this.paintMapImg(); 
			this.vn= 0;
			fx = -this.getSubTileX();
			fy = -this.getSubTileY();
		}
		this.vn++;
		ctx.drawImage(this.map,  (fx- this.vdx) , (fy- this.vdy));

		this.ship.paint(ctx);

		if(!this.night) {
			this.mapSprite.paint(ctx);				 
		}
		if(this.onboard) {
	//		this.gundeck.paint(ctx);
		}     
		else {
			this.captain.paint(ctx);
		}
		if(this.night) {
		//	ctx.fillStyle   = '#000000';
			//ctx.strokeStyle = '#000000';
			ctx.drawImage(nightimg, (canvaswidth- nightimg.width)/2-1, (canvasheight- nightimg.height)/2-1, nightimg.width+2, nightimg.height+2); 	   
			ctx.fillRect(0, 0, (canvaswidth- nightimg.width)/2, canvasheight);
			ctx.fillRect((canvaswidth- (canvaswidth- nightimg.width)/2), 0, (canvaswidth- nightimg.width)/2, canvasheight);
			ctx.fillRect(0, 0, canvaswidth, (canvasheight- nightimg.height)/2);
			ctx.fillRect(0, (canvasheight- (canvasheight- nightimg.height)/2), canvaswidth, (canvasheight- nightimg.height)/2);					
		}
	}
	catch(e) {
		this.sea= null;
//		console.log(e);
	}
}

Ship.prototype.paintMapImg= function() {
	this.tx = this.getTileX();
	this.ty = this.getTileY();
	var sx = (this.map.width- tiledim) / 2;
	var sy = (this.map.height - tiledim) / 2;

	this.mapctx.drawImage(this.sea, 0, 0);

	var x= -(Math.floor(sx/tiledim)+2);
	var y= -(Math.floor(sy/tiledim)+2);
	for(var j= y; j<=-y+1; j++) {
		for(var i= x; i<=-x+1; i++) {
			this.drawTile(this.mapctx, sx, sy, i, j, this.tx, this.ty);
		}
	}
};


Ship.prototype.drawTile= function(ctx, sx, sy, x, y, tx, ty) {
	if(ty+y>= World.currentHeight || ty+y< 0 || tx+x< 0|| tx+x>= World.currentWidth)
		return;

	var t = World.get(tx+x, ty+y);
	var B= tiledim;

	if (t == MyRegion.OPENSEA) {
		return;
	}
	this.mapSprite.tileDiscovered(tx+x, ty+y, t);

	try {
		ctx.drawImage(tilesimg, (t % 4) * B, Math.floor(t / 4) * B, B, B, sx + x * B, sy + y * B, B, B);
	}
	catch(e) {
		console.log(e);
	}
};

var shipbxmin = [
                 [4, 7, 7], [0, 2, 4], [5, 7, 9], [5, 13, 16, 0, 3], [22, 20, 18], [0, 21, 21, 0, 0, 4, 4, 18, 17], [11, 8, 4, 21, 19], [0, 0, 5, 18, 16], [5, 7, 9], [5, 13, 16, 0, 3], [6, 0, 18, 0, 18, 4, 18, 2, 18], [0, 17, 17, 17, 17], [18, 10, 7, 23, 20], [0, 0, 5, 18, 16], [7, 1, 5, 1, 3], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0]
                 ];
var shipbxmax = [
                 [18, 16, 15], [1, 3, 5], [17, 17, 14], [12, 15, 19, 2, 4], [23, 21, 19], [23, 23, 23, 2, 3, 6, 5, 20, 20], [18, 10, 7, 23, 20], [23, 4, 9, 23, 17], [17, 17, 14], [12, 15, 19, 2, 4], [17, 5, 23, 5, 23, 5, 19, 5, 20], [16, 22, 18, 22, 20], [11, 8, 4, 21, 19], [23, 4, 9, 23, 17], [23, 6, 6, 6, 6], [23], [23], [23], [23], [23], [23], [23], [23], [23], [23], [23], [23], [23], [23], [23], [23], [23]
                 ];
var shipbymin = [
                 [4, 2, 20], [5, 7, 9], [0, 2, 4], [0, 0, 0, 0, 0], [5, 7, 9], [6, 0, 18, 0, 18, 4, 18, 2, 18], [0, 0, 0, 0, 0], [0, 22, 18, 22, 20], [22, 20, 18], [10, 19, 22, 3, 9], [0, 21, 21, 0, 0, 4, 4, 18, 17], [0, 0, 5, 18, 16], [10, 19, 22, 3, 9], [7, 1, 5, 1, 3], [0, 0, 5, 18, 16], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0]
                 ];
var shipbymax = [
                 [19, 3, 21], [17, 17, 14], [1, 3, 5], [13, 4, 1, 20, 14], [17, 17, 14], [17, 5, 23, 5, 23, 5, 19, 5, 20], [13, 4, 1, 20, 14], [16, 17, 17, 17, 17], [23, 21, 19], [23, 23, 23, 23, 23], [23, 23, 23, 2, 3, 6, 5, 20, 20], [23, 4, 9, 23, 17], [23, 23, 23, 23, 23], [23, 6, 6, 6, 6], [23, 4, 9, 23, 17], [23], [23], [23], [23], [23], [23], [23], [23], [23], [23], [23], [23], [23], [23], [23], [23], [23]
                 ];
