

function Home() {
	var sky, hill, houses, sea, ship, steg, captain, captainwidth, houseswidth, m, y;
	this.homewidth= Math.min(canvaswidth, 384);
	this.homeheight= Math.min(canvasheight, 384);
	
	this.m= (this.homewidth- 22)/2;
	this.y= 0;
	var y= Math.max(0, (canvasheight-this.homeheight));
    this.x= Math.max(0, (canvaswidth-this.homewidth)/2);
    this.captain= new CaptainSprite(36+this.x, canvasheight-58);
    this.captainwidth= 22;
    this.sea= new Sprite("res/home/sea.png", this.x, canvasheight-126);
    this.sky= new Sprite("res/home/sky.png", this.x, canvasheight-126-195);
    this.hill= new Sprite("res/home/hill.png", this.x+173, canvasheight-296);
    this.ship= new Sprite("res/home/ship.png", this.x, canvasheight-208);
    this.houses=  new Sprite("res/home/houses.png", this.x+92, canvasheight-170);
    this.houseswidth= 591;
    this.steg= new Sprite("res/home/steg.png", this.x+10, canvasheight-28);
	this.ctx = canvas.getContext('2d');  
	//this.ctx.scale(scale, scale);
}

Home.prototype.setActive= function(b) {
	if(b) {
		
	}
}

Home.prototype.setCourse= function(deg, x, y) {
	
	if(deg<= 45 || deg>= 315) {
		this.keyPressed(75);
		return;
	}
	if(deg<=  225 && deg> 135) {
		this.keyPressed(74);
		return;
	}
	if(deg>225 && deg <315) {
		this.keyPressed(76);
		return;
	}
	if(deg>45 && deg<= 135) {
		this.keyPressed(73);		
		return;
	}
}

Home.prototype.keyPressed= function(key) {
                switch(key) {
                    case 73: case 50: // i: Up
                        this.captain.up();
                        break;

                    case 74: case 52:// j: Left
                    	this.captain.left();
                    	break;

                    case 75: case 58: // k: Down
                    	this.captain.right();
                        break;

                    case 76: case 56: // l: Right
                    	this.captain.down();
                        break;
                }
}

Home.prototype.update= function(timer) {
	this.captain.tick(timer);
	this.move(timer);
	this.paint();
}

Home.prototype.paint= function() {  
	    try {
    	    this.sky.paint(this.ctx);
    		this.sea.paint(this.ctx);
    		this.hill.paint(this.ctx);
    		this.ship.paint(this.ctx)
    		this.houses.paint(this.ctx);
    		this.steg.paint(this.ctx);
    		this.captain.paint(this.ctx);
			var y= Math.max(0, (canvasheight-this.homeheight));
			this.ctx.fillStyle   = '#95b8d7';
			this.ctx.strokeStyle = '#95b8d7';
			this.ctx.fillRect(this.x, 0, canvaswidth-2*this.x, canvasheight-320);
    
			this.ctx.fillStyle   = '#000000';
			this.ctx.strokeStyle = '#000000';
			this.ctx.fillRect(0, y, this.x, this.homeheight);
			this.ctx.fillRect(this.x+this.homewidth, y, canvaswidth-this.homewidth-this.x, this.homeheight);
			this.ctx.fillRect(0, 0, this.x, canvasheight-320);
			this.ctx.fillRect(canvaswidth-this.x, 0, this.x, canvasheight-320);
	}
    catch(e) {
    	console.log(e);
    }
}
    

Home.prototype.move= function(timer) {
    if (!this.captain.isWalking()) {
        return false;
    }
    var dir = this.captain.getDir();
    if (dir == 7) {
        this.y--;
        
        if (this.y< -32 && this.captain.x < 72+this.x && this.captain.x > 24+this.x) {
			ship.dx= World.currentWidth;
			ship.dir= 30;
			ship.anker= true;
			this.y= 0;
			this.captain.dir= 4;
			this.captain.stopWalking();
		    this.captain.x= 36+this.x;
			services.setView(ship);
			return true;
          	/*
            if (y < -32) {
                ((HomeView) Services.getView()).fadeOut();
            }*/
        }
        var deltaH = -(this.captain.x + 11 - this.houses.x);
    /*    if (deltaH < -7 && deltaH > -31) {
            if (((HomeView) Services.getView()).isBlack()) {
                arrivedAt(PUBSTATE, 1);
                return true;
            }
            if (y < -32) {
                ((HomeView) Services.getView()).fadeOut();
            }
        }
        if (deltaH < -109 && deltaH > -121) {
            if (((HomeView) Services.getView()).isBlack()) {
                arrivedAt(DOCKSTATE, 2);
                return true;
            }
            if (y < -32) {
                ((HomeView) Services.getView()).fadeOut();
            }
        }
        */
        /*
        if (deltaH < -61 && deltaH > -68) {
            if (((HomeView) Services.getView()).isBlack()) {
                System.out.println("MapMaker");
                return true;
            }
            if (y < -32) {
                ((HomeView) Services.getView()).fadeOut();
            }
        }
        if (deltaH < -207 && deltaH > -227) {
            if (((HomeView) Services.getView()).isBlack()) {
                homeSweetHome(HOMESTATE - 1);
                return true;
            }
            if (y < -32) {
                ((HomeView) Services.getView()).fadeOut();
            }
        }
        if (deltaH < -335 && deltaH > -345) {
            if (((HomeView) Services.getView()).isBlack()) {
                arrivedAt(ADMIRALSTATE, 3);
                return true;
            }
            if (y < -32) {
                ((HomeView) Services.getView()).fadeOut();
            }
        }
        if (deltaH < -493 && deltaH > -554) {
            if (((HomeView) Services.getView()).isBlack()) {
                arrivedAt(PALACESTATE, 4);
                return true;
            }
            if (y < -32) {
                ((HomeView) Services.getView()).fadeOut();
            }
        }*/
        return true;
    }
    var newdir = this.captain.getTargetDir();
    if (newdir != 7 && newdir != 1) {
        var east = (dir >= 8) ? false : true;

        var delta = east ? -1 : 1;
        if (dir != newdir) {
            if (timer.getCounter() % 3 != 1) {
                return false;
            }
        }
     //   console.log("m: "+this.m+" cx: "+this.captain.x);
      //  console.log("hx: "+this.houses.x+" "+(canvaswidth-this.houseswidth));
        var movecaptain= false;
        if (this.captain.x < this.m+this.x) {
        	movecaptain= true;           
        }
        if (this.captain.x == this.m+this.x && !east && this.houses.x== 92+this.x) {
        	movecaptain= true;           
        }
        if (this.captain.x >= this.m+this.x && east && this.houses.x<= this.x+this.homewidth-this.houseswidth) {
        	movecaptain= true;           
        }
        if (this.captain.x > this.m+this.x && !east && this.houses.x>= this.x+this.homewidth-this.houseswidth) {
        	movecaptain= true;           
        }
        
        if(movecaptain) {
            if (this.captain.x <= 36+this.x && !east) {
            	this.captain.stopWalking();
                return true;
            }
            if (this.captain.x >= this.x+this.homewidth - this.captainwidth) {
            	this.captain.x= this.x+(this.homewidth - this.captainwidth - 1);
            	this.captain.stopWalking();
                return true;
            }

            this.captain.move(-delta, 0);

        } else {
        	this.houses.move(delta, 0);
            this.steg.move(delta, 0);
            if (timer.counterIsOdd()) {
                this.sea.move(delta, 0);
                this.hill.move(delta, 0);
                this.ship.move(delta, 0);
            }
            if (timer.getCounter() % 4 == 1) {
                this.sky.move(delta, 0);
            }
            if (this.steg.x == 10+this.x) {
                this.captain.x= (this.m+this.x);
            }
        }
    } else {
        return false;
    }
    return true;
}