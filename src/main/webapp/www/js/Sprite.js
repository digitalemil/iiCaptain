function Sprite() {
	this.init()
}

function Sprite(name, width, height) {
	this.init();
	this.setImage(name, width, height);
}

Sprite.prototype.init= function() {
	this.x= 0;
	this.y= 0;
	this.img= 0;
	this.visible= true;
}

Sprite.prototype.setImage= function(name, x, y) {
	this.img = new Image();
	this.img.src= name;
	this.x= x;
	this.y= y;
}

Sprite.prototype.set= function(x, y) {
	this.x= x;
	this.y= y;
}

Sprite.prototype.move= function(x, y) {
	this.x+= x;
	this.y+= y;
}

Sprite.prototype.paint= function(ctx) {
	if (!this.visible) {
		return;
	}
	ctx.drawImage(this.img, this.x, this.y); 	                
}

function ClipSprite() {
	this.init();
	var w, h;
	var ax= 0;
	var ay= 0;
	var changed= false;
}

copyPrototype(ClipSprite, Sprite);


ClipSprite.prototype.getDir= function() {
	return this.ax;
}

ClipSprite.prototype.paint= function(ctx) {
	if (!this.visible) {
		return;
	}
	//console.log("Clip paint:" +this.ax+" "+this.ay+" "+this.w+" "+this.h+" "+this.img.src+" x: "+this.x+" y:"+this.y+" "+this.img.src);
	ctx.drawImage(this.img, this.ax*this.w, this.ay*this.h, this.w, this.h, this.x, this.y, this.w, this.h);
	this.changed = false;
}

ClipSprite.prototype.setActive= function(x, y) {
//	console.log("setActive: "+x+" "+y);
	this.ax = x;
	this.ay = y;
	this.changed = true;
}

function CaptainSprite(x, y) {
	this.init();
	this.state = 0;
	this.newdir = 4,
	this.dir = 4;
	this.ani = 1;
	this.C0 = 0;
	this.C1 = 12;
	this.C10 = 7 * 12;
	this.setImage("res/captain.png", x, y);
	this.w= 22;
	this.h= 30;
	this.setActive(3, 0);
}

copyPrototype(CaptainSprite, ClipSprite);

CaptainSprite.prototype.tick= function(timer) {
	// console.log("Timer "+this.state+" "+this.ani);
	if (this.dir != this.newdir) {
		if (timer.getCounter() % 4 == 1) {
			var delta = (this.dir > this.newdir) ? -1 : 1;
			this.dir += delta;
		}
	}
	if (this.state == 0) {
		return;
	}
	if (timer.getCounter() % 4 == 1) {
		this.ani++;
		if (this.ani == 7) {
			this.ani = 1;
		}
		this.setActive(this.dir - 1, this.ani);
	}
}

CaptainSprite.prototype.isWalking= function() {
	return (this.state == 1);
}

CaptainSprite.prototype.stopWalking= function() {
	this.state = 0;
	this.setActive(this.dir - 1, 0);
}

CaptainSprite.prototype.left= function() {
	return this.recalcState(10);
}

CaptainSprite.prototype.right= function() {
	return this.recalcState(4);
}

CaptainSprite.prototype.up= function() {
	return this.recalcState(7);
}

CaptainSprite.prototype.down= function() {
	return this.recalcState(1);
}

CaptainSprite.prototype.recalcState= function(i) {
	this.newdir = i;
	if (this.dir == this.newdir && this.state == 1) {
		this.state = 0;
	} else {
		this.state = 1;
	}
	if (this.state == 0) {
		this.setActive(this.dir - 1, 0);
	}
	return true;
}

CaptainSprite.prototype.getDir= function() {
	return this.dir;
}

CaptainSprite.prototype.getTargetDir= function() {
	return this.newdir;
}

function Captain2Sprite(x, y) {
	this.init();
	this.state = 0;
	this.dir = 0;
	this.ani = 0;
	var searchDir= 0;
	this.setImage("res/captain2.png", x, y);
	this.w= 24+2;
	this.h= 42+6;
	this.setActive(0, 0);
}

copyPrototype(Captain2Sprite, ClipSprite);


Captain2Sprite.prototype.paint= function(ctx) {
	if (!this.visible) {
		return;
	}
//	console.log("Clip paint:" +this.ax+" "+this.ay+" "+this.w+" "+this.h+" "+this.img.src+" x: "+this.x+" y:"+this.y+" "+this.img.src);
	ctx.drawImage(this.img, this.ax*this.w, this.ay*this.h, this.w, this.h, this.x, this.y, this.w, this.h);
	this.changed = false;
}

Captain2Sprite.prototype.tick= function(ms, timer) {
	if (this.state == 0) {
		return;
	}
	if (this.state == 1 && ((!simple && timer.getCounter() % 5 == 1) || simple)) {
		this.ani++;
		this.ani %= 5;
		if (this.ani == 0) {
			this.ani = 1;
		}
		this.setActive((this.dir % 30), Math.floor((this.dir)/ (30)) + this.ani * 2);
	}
	if (this.state == 2 && timer.getCounter() % 2 == 1) {
		this.setActive((this.searchDir % 30), Math.floor(this.searchDir / (30)) + 10);
		if(!simple)
			this.searchDir++;
		else
			this.searchDir+= 15;
		this.searchDir %= 60;
		if (this.searchDir == this.dir) {
			this.stopSearching();
		}
	}
}

Captain2Sprite.prototype.setDir= function(d) {
	this.dir = d;
	if (this.dir < 0) {
		this.dir += 60;
	}
	this.dir %= 60;

	//   if (simple) {
		//   	this.setActive(Math.floor(this.dir / 15), Math.floor(this.state/2));
	//    } else {
	this.setActive((this.dir % 30), Math.floor(this.dir/30) + this.ani * 2);
	//    }
}

Captain2Sprite.prototype.isWalking= function() {
	return this.state == 1;
}

Captain2Sprite.prototype.stopWalking= function() {
	this.ani = 0;
	this.state = 0;
	this.setDir(this.dir);
}

Captain2Sprite.prototype.startWalking= function() {
	this.state = 1;
	this.setDir(this.dir);
}

Captain2Sprite.prototype.search= function() {
	this.searchDir = this.dir;
	this.stopWalking();
	this.state = 2;
	this.setDir(this.dir);
}

Captain2Sprite.prototype.isSearching= function() {
	return this.state == 2;
}

Captain2Sprite.prototype.left= function() {
	if (simple) {
		this.setDir(this.dir + 15);
	} else {
		this.setDir(this.dir+1);
	}
	return true;
}

Captain2Sprite.prototype.right= function() {
	if (simple) {
		this.setDir(this.dir - 15);
	} else {
		this.setDir(this.dir-1);
	}
	return true;
}

Captain2Sprite.prototype.getDir= function() {
	return this.dir;
}

Captain2Sprite.prototype.stopSearching= function() {
	this.state = 0;
	this.ani = 0;
	this.setDir(this.dir);
}

function ShipSprite(modell) {
	this.init();
	this.m= modell;
	this.RUDER = 0;
	this.GUNS = 1;
	this.ship= 0;
	this.hull ;
	this.flag;
	this.jollyroger;
	this.shipnosails;
	this.smoke= [];
	this.gunstate= [];
	this.setup();
}

copyPrototype(ShipSprite, ClipSprite);

ShipSprite.prototype.tick= function(ms, timer) {
	for (var i = 0; i < 2; i++) {
		if (this.gunstate[i] > 0) {
			this.gunstate[i]++;
		}
		if (this.gunstate[i] == 7) {
			this.gunstate[i] = 0;
		}
	}
}

ShipSprite.prototype.center= function() {
	this.x= (canvaswidth-this.w)/2;
	this.y= (canvasheight-this.h)/2;
}

ShipSprite.prototype.setup= function() {
	this.ship = new Image();
	this.ship.src= "res/ship/ship.png";        
	this.w= 60;
	this.h= 75;
	this.center();
	this.shipnosails = new Image();
	this.shipnosails.src= "res/ship/shipnosails.png";
	this.flag= new Image();
	this.flag.src = "res/ship/englishflag.png";
	this.fw= 26;
	this.fh= 34;

	if (!simple) {
		for (var i = 0; i < 2; i++) {
			this.smoke[i]= [];	
			for (var j = 0; j < 6; j++) {
				this.smoke[i][j] = new Image();
				this.smoke[i][j].src= "res/ship/smoke" + ((i == 0) ? "l" : "r") + "" + (j + 1) + ".png";
			}
		}
	}
	this.sw= 35;
	this.sh= 40;
	this.gunstate= [];
	this.gunstate[0]= [];
	this.gunstate[1]= [];

}

ShipSprite.prototype.paint= function(ctx) {
	if (!this.visible) {
		return;
	}
	ctx.drawImage(this.m.anker?this.shipnosails:this.ship, this.w*(this.m.dir%10), this.h*(Math.floor(this.m.dir/10)),  this.w, this.h, this.x, this.y, this.w, this.h); 	                     
	ctx.drawImage(this.flag, this.fw*(this.m.dir%10), this.fh*(Math.floor(this.m.dir/10)),  this.fw, this.fh, (this.x+16), (this.y+3), this.fw, this.fh); 	                     
	/*
	for (var i = 0; i < 2; i++) {
		this.gunstate[i]%= 7;	
		if (this.gunstate[i] == 0) {
			continue;
		}
		ctx.drawImage(this.smoke[i][this.gunstate[i]++ - 1], this.sw*(this.m.dir%10), this.sh*(Math.floor(this.m.dir/10)),  this.sw, this.sh, this.x+12, this.y+23, this.sw, this.sh); 	                     
	}
	*/
}

ShipSprite.prototype.fire= function(dir) {
	if (this.gunstate[dir] == 0) {
		this.gunstate[dir]= 1;
	}
}

function Gundeck(x1, y1) {
	this.left = 0;
	this.right = 0;
	this.n = 0;
	this.done= false;
	this.li= [];
	this.ri= [];
	this.setImage("res/gundeck/gundeck.png", x1, y1);

	for(var i= 0; i<54; i++) {
		this.li[i]= new Image();
		this.ri[i]= new Image();    
		this.li[i].src = "res/gundeck/g0/g" + i + ".png";
		this.ri[i].src = "res/gundeck/g1/gl" + i + ".png";
	}
}

copyPrototype(Gundeck, Sprite);

Gundeck.prototype.setVisible= function(v) {
	this.visible= v;
	if(!v) {
		this.done= false;
		this.left= 0;
		this.right= 0;
	}
}

Gundeck.prototype.fires= function() {
	return (this.left!= 0 || this.right!= 0);
}

Gundeck.prototype.fireLeft= function() {
	if(!this.visible)
		return false;
	this.done= false;
	this.left= 1;
	return true;
}

Gundeck.prototype.fireRight= function() {
	if(!this.visible)
		return false;
	this.done= false;
	this.right= 1;
	return true;
}

Gundeck.prototype.paint= function(ctx) {
	if (!this.visible) {
		return;
	}
	this.n++;

	if (this.n % 4 == 1 && this.left > 0) {
		if (this.left == 53) {
			this.left = 0;
			if(this.right== 0)
				this.done= true;
		}
		if(this.left> 0)
			this.left++;
	}
	if (this.n % 4 == 1 && this.right > 0) {
		if (this.right == 53) {
			if(this.left== 0)
				this.done= true;
			this.right = 0;
		}
		if(this.right> 0)
			this.right++;
	}
	ctx.drawImage(this.img, this.x, this.y);
	ctx.drawImage(this.li[this.left], this.x-10, this.y+21);
	ctx.drawImage(this.ri[this.right], this.x+122, this.y+21);
}




