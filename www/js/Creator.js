	
	
function MyRegion() {
}  

MyRegion.CARIBEAN = 1;
MyRegion.REGION= [];
MyRegion.REGION[0]= MyRegion.CARIBEAN;
MyRegion.OPENSEA = 0;
MyRegion.RIVER = 1;
MyRegion.RIVERSOURCE= 2;
MyRegion.LAND = 4;
MyRegion.PALM= 20;


MyRegion.getLandmass= function() {
	return MyRegion.LAND;
}

MyRegion.getCoast= function() {
	return MyRegion.LAND;
}

MyRegion.getPalm= function() {
	return MyRegion.PALM;
}

MyRegion.getRiver= function() {
	return MyRegion.RIVER;
}

MyRegion.getSea= function() {
	return MyRegion.OPENSEA;
}

MyRegion.getRiverSource= function() {
	return MyRegion.RIVERSOURCE;
}



function myRandom(start, end) {
	return Math.floor(start)+ Math.floor(Math.random()*(Math.floor(end+1)-Math.floor(start)));
}

function myAbs(x) {
	if (x < 0) {
		return -x;
	} else {
		return x;
	}
}

function DistanceXY(xx1, yy1, xx2, yy2, dd)  {
	this.x1= xx1;
	this.y1= yy1;
	this.x2= xx2;
	this.y2= yy2;
	this.d= dd;
}

DistanceXY.prototype.compareTo= function(o) { 
	if(d<= o.d)
		return -1;
	if(d>= o.d)
		return 1;
	return 0;
}

function Island() {
}


Island.createLandMasses= function(map, ix1, iy1, ix2, iy2) {
	var h = iy2 - iy1;
	var w = ix2 - ix1;
	if (h < 4 || w < 4) {
		return;
	}
	
	var h1 = myRandom(1000, 3000);
	var x1 = ix1 + myRandom(0, w / 8);
	var x2 = ix1 + myRandom(w / 8, w / 4);
	var x3 = ix1 + myRandom(w / 8 * 6, 7 * w / 8);
	var x4 = ix1 + myRandom(w / 8 * 7, w - 2);
	var x5 = ix1 + myRandom(w / 8 * 6, 7 * w / 8);
	var x6 = ix1 + myRandom(w / 8, w / 4);
	var y1 = iy1 + myRandom(3 * h / 8, 5 * h / 8);
	var y2 = iy1 + myRandom(h / 8, h / 4);
	var y3 = iy1 + myRandom((h1 * h / 8) / 1000, (h1 * h / 4) / 1000);
	var y4 = iy1 + myRandom(3 * h / 8, h / 2);
	var y5 = iy1 + myRandom(7 * h / 8, h - 2);
	var y6 = iy1 + myRandom(7 * h / 8, h - 2);

	
	Island.connectPoints(map, w, h, x1, y1, x2, y2, MyRegion.getLandmass());
	Island.connectPoints(map, w, h,  x2, y2, x3, y3, MyRegion.getLandmass());
	Island.connectPoints(map, w, h,  x3, y3, x4, y4, MyRegion.getLandmass());
	Island.connectPoints(map, w, h,  x4, y4, x5, y5, MyRegion.getLandmass());
	Island.connectPoints(map, w, h,  x5, y5, x6, y6, MyRegion.getLandmass());
	Island.connectPoints(map, w, h,  x6, y6, x1, y1, MyRegion.getLandmass());
	for (var tx = -1; tx < 2; tx++) {
		for (var ty = -1; ty < 2; ty++) {
			if (map[Math.floor((x1 + w) / 2) + tx][Math.floor((y1 + h) / 2) + ty] != MyRegion.getLandmass()) {
				Island.boundaryFill(map, ix1 + Math.floor(w / 2) + tx, iy1 + Math.floor(h / 2) + ty, ix1, iy1, ix2, iy2, MyRegion.getLandmass());
			}
		}
	}
	
	//console.log("start createForest");

	Island.createForests(map, w, h);


	//console.log("createForest done");

}


Island.connectPoints= function(map, mapw, maph, x1, y1, x2, y2, value) {
	var p1 = 500, p2 = 300, p3 = 200;
	x1 = Math.min(x1, mapw-1);
	y1 = Math.min(y1, maph-1);
	x1 = Math.max(x1, 1);
	y1 = Math.max(y1, 1);
	x2 = Math.min(x2, mapw-1);
	y2 = Math.min(y2, maph-1);
	x2 = Math.max(x2, 1);
	y2 = Math.max(y2, 1);

	map[x1][y1] = value;
	map[x2][y2] = value;
	while (y1 != y2 || x1 != x2) {
		var d = [];
		d[0] = new DistanceXY(x1 - 1, y1, x2, y2, Island.delta(x1 - 1, y1, x2, y2));
		d[1] = new DistanceXY(x1 + 1, y1, x2, y2, Island.delta(x1 + 1, y1, x2, y2));
		d[2] = new DistanceXY(x1, y1 - 1, x2, y2, Island.delta(x1, y1 - 1, x2, y2));
		d[3] = new DistanceXY(x1, y1 + 1, x2, y2, Island.delta(x1, y1 + 1, x2, y2));

		Island.quickSort(d, 4);

		var w = myRandom(0, 1000);
		var r = 0;
		if (!(y1 == y2 && myAbs(x1 - x2) <= 4)) {
			if (w >= p1 && w < p1 + p2) {
				r = 1;
			}
			if (w >= p1 + p2 && w < p1 + p2 + p3) {
				r = 2;
			}
			if (w >= p1 + p2 + p3) {
				r = 3;
			}
		}
		if (d[r].x1 >= 0 && d[r].x1 < mapw && d[r].y1 >= 0 && d[r].y1 < maph) {
			map[d[r].x1][d[r].y1] = value;
		}
		x1 = d[r].x1;
		y1 = d[r].y1;
	}
	return true;
}

Island.boundaryFill= function(map, x, y, x1, y1, x2, y2, value) {
	if (x <= x1 || x >= x2 - 1) {
		return;
	}
	if (y <= y1 || y >= y2 - 1) {
		return;
	}
if(map[x]== undefined)
	alert(x+" "+map);
	map[x][y] = value;
	// finds the left side, filling along the way
	var fillL = x - 1;
	var mv;
	//       System.out.println("fill: " + x + " " + y + " " + value + " " + map[x][y]);
	do {
		mv = map[fillL][y];
		map[fillL][y] = value;
		fillL--;
	} while (fillL >= x1 && mv != value);
	fillL++;

	// find the right right side, filling along the way
	var fillR = x + 1;
	do {
		mv = map[fillR][y];
		map[fillR][y] = value;
		fillR++;
	} while (fillR < x2 - 1 && mv != value);
	fillR--;

	// checks if applicable up or down
	for (var i = fillL; i <= fillR; i++) {
		if (y > y1) {
			if (map[i][y - 1] != value) {
				Island.boundaryFill(map, i, y - 1, x1, y1, x2, y2, value);
			}
		}
		if (y < y2 - 1 && map[i][y + 1] != value) {
			Island.boundaryFill(map, i, y + 1, x1, y1, x2, y2, value);
		}
	}
}

Island.createForests= function(map, w, h) {
	var nForests = 1;

	if (((w + h) / 2) >= 16) {
		nForests = myRandom(1, 3);
	}

	if (((w + h) / 2) >= 32) {
		nForests = myRandom(1, 5);
	}

	if (((w + h) / 2) >= 64) {
		nForests = myRandom(2, 12);
	}

	if (((w + h) / 2) >= 96) {
		nForests = myRandom(2, 18);
	}

	for (var i = 0; i < nForests; i++) {
		var rA = myRandom(4, 16);
		var rB = myRandom(4, 16);
		var dmap = [];
		for(var d= 0; d< rA; d++) {
			dmap[d]= [];
			for(var d1= 0; d1< rB; d1++) {
				dmap[d][d1]= MyRegion.OPENSEA;
			}
		}
		rA--;
		rB--;
		Island.connectPoints(dmap, rA, rB, 1, 1, 1, rB, MyRegion.getPalm());
		Island.connectPoints(dmap, rA, rB,  1, rB, rA, rB, MyRegion.getPalm());
		Island.connectPoints(dmap, rA, rB, rA, rB, rA, 1, MyRegion.getPalm());
		Island.connectPoints(dmap, rA, rB, rA, 1, 1, 1, MyRegion.getPalm());
		Island.createCluster(dmap, rA, rB, map, w, h, 2);
		dmap= null;
	}
}


Island.createCluster2= function(x, y, dmap, dw, dh, map, mapw, maph, value, distanceToWater) {
	Island.boundaryFill(dmap, Math.floor(dw / 2), Math.floor(dh / 2), 0, 0, dmap.length, dmap[0].length, value);
	Island.put(map, mapw, maph, x - Math.floor(dw / 2), y - Math.floor(dh / 2), dmap, dw, dh, true);
}

Island.createCluster= function(dmap, dw, dh, map, w, h, distanceToWater) {
	var x = -1, y = -1;
	var t = 0;

	while (y == -1) {
		t++;
		x = myRandom(1, w - 1);
		y = myRandom(1, h - 1);
	
		if (Island.closeToWater(map, w, h, x, y)) {
			y = -1;
		}
	
		if (t > 20) {
			break;
		}
	}
	if (x == -1 || y == -1) {
		return new WorldPoint(-1, -1);
	}
	Island.createCluster2(x, y, dmap, dw, dh, map, w, h, MyRegion.getPalm(), distanceToWater);
	return new WorldPoint(x, y);
}

Island.delta= function(x1, y1, x2, y2) {
	return ((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}

Island.closeToWater= function(map, w, h, x, y) {
	var ret = false;
	for (var i = -1; i < 2; i++) {
		for (var j = -1; j < 2; j++) {
			if (i == 0 && j == 0) {
				continue;
			}
			if (i + x < 0 || j + y < 0 || i + x >= w || j + y >= h) {
				continue;
			}
			if(map[i+x] == undefined)
				alert(map);
			if (map[i + x][j + y] == MyRegion.getSea() || map[i + x][j + y] == MyRegion.getRiver() || map[i + x][j + y] == MyRegion.getRiverSource()) {
				ret = true;
			}
		}
	}
	return ret;
}

Island.quickSort= function(d,  n) {
	Island.q_sort(d, 0, 4 - 1);
}

Island.q_sort= function(d,  left,  right) {
	var l_hold = left;
	var r_hold = right;
	var pivot = d[left];
	while (left < right) {
		while ((d[right].d >= pivot.d) && (left < right)) {
			right--;
		}
		if (left != right) {
			d[left] = d[right];
			left++;
		}
		while ((d[left].d <= pivot.d) && (left < right)) {
			left++;
		}
		if (left != right) {
			d[right] = d[left];
			right--;
		}
	}
	d[left] = pivot;
	var p = left;
	left = l_hold;
	right = r_hold;
	if (left < p) {
		Island.q_sort(d, left, p - 1);
	}
	if (right > p) {
		Island.q_sort(d, p + 1, right);
	}
}

Island.put= function(dest,  destw,  desth,  dx,  dy, src,  srcw,  srch, check) {
	for (var y = 0; y < srch; y++) {
		for (var x = 0; x < srcw; x++) {
			if (dy + y < 0 || dx + x < 0 || dx + x >= destw || dy + y >= desth) {
				continue;
			}
			if (src[x][y] == MyRegion.getSea()) {
				continue;
			}
			if (check && dest[dx + x][dy + y] != MyRegion.getLandmass()) {
				continue;
			}
			dest[dx + x][dy + y] = src[x][y];
		}
	}
}


function NWorld() {
	this.MAXWIDTH= 256;
	this.MAXHEIGHT= 256;
	this.EXTENT= 16;
	this.map= [];
	for(var x= 0; x < this.MAXWIDTH+this.EXTENT; x++) {
		this.map[x]= [];  
		for(var y= 0; y < this.MAXHEIGHT; y++) {
			this.map[x][y]= MyRegion.OPENSEA;  
		}
	}
	this.currentWidth;
	this.currentHeight;
	this.creation_max=1;
	this.creation=0;
}

NWorld.prototype.get= function(x, y) {
	if (x < 0 || y < 0 || x >= this.currentWidth || y >= this.currentHeight) {
		return MyRegion.OPENSEA;
	}
	var t
	t= this.map[x][y];
	if(t<36) {
		this.map[x][y]= t+36;
	}
	else {
		t= t-36;
	}
	return t;
}

NWorld.prototype.set= function(x, y, t) {
	this.map[x][y]= t;
}

NWorld.prototype.createMap= function(width,  height) {
	this.currentWidth= width;
	this.currentHeight= height;

	var n = [];
	n[0] = Math.floor((myRandom(6, 12) * width * height) / 256 / 256);
	n[1] = Math.floor((myRandom(6, 14) * width * height) / 256 / 256);
	n[2] = Math.floor((myRandom(12, 24) * width * height) / 256 / 256);
	var min= [];
	min[0]= 20;
	min[1]= 14;
	min[2]= 6;
	var max= [];
	max[0]= 40;
	max[1]= 28;
	max[2]=12;

	this.clear(MyRegion.OPENSEA);
	this.creation_max= 2*(n[0]+n[1]*2+n[2]*4)+3*20;
	this.creation= 0;
	for (var sz = 0; sz < 3; sz++) {
		for (var i = 0; i < n[sz]; i++) {
			switch(sz) {
			case 0:
				this.creation+=2;
				break;
			case 1:
				this.creation+=4;
				break;
			case 2:
				this.creation+=8;
				break;
			}
			var imapw= myRandom(min[sz], max[sz]);
			var imaph= myRandom(min[sz], max[sz]);
			var imap= [];
			for(var x= 0; x< imapw; x++) {
				imap[x]= [];
				for(var y= 0; y< imaph; y++) 
					imap[x][y]= MyRegion.OPENSEA;
			}
			
			Island.createLandMasses(imap, 0, 0, imapw, imaph);
			var ix = -1;
			var iy = -1;
			var s = 0;
			ix = myRandom(0, width - imapw);
			iy = myRandom(0, height - imaph);
			Island.put(this.map, width, height, ix, iy, imap, imapw, imaph, false);
			imap= null;

		}
	}
	this.createRivers(this.map, width/16, height/16);
	this.creation+=20;

	this.createForestLine(this.map, width+16, height);
	this.creation+=20;

	this.createCoast(this.map, width+16, height);
	this.creation+=20;
	return this.map;
}

NWorld.prototype.clear= function(value) {
	for (var x = 0; x < this.MAXWIDTH+this.EXTENT; x++) {
		for (var y = 0; y < this.MAXHEIGHT; y++) {
			this.map[x][y]= value;
		}
	}
}

NWorld.prototype.createCoast= function(map,  w,  h) {
	for (var i = 0; i < w; i++) {
		for (var j = 0; j < h; j++) {
			if (this.isWater(map[i][j])) {
				continue;
			}
			if (!(map[i][j] == MyRegion.getLandmass())) {
				continue;
			}
			var c = 0;
			if (j > 0) {
				if (!this.isWater(map[i][j - 1])) {
					c += 2;
				}
			}
			if (j < map[0].length - 1) {
				if (!this.isWater(map[i][j + 1])) {
					c += 8;
				}
			}
			if (i > 0) {
				if (!this.isWater(map[i - 1][j])) {
					c += 1;
				}
			}
			if (i < map.length - 1) {
				if (!this.isWater(map[i + 1][j])) {
					c += 4;
				}
			}
			map[i][j] = MyRegion.getCoast() + c;
		}
	}
}

NWorld.prototype.createForestLine= function(map,  w,  h) {

	for (var i = 0; i < w; i++) {
		for (var j = 0; j < h; j++) {
			if (map[i][j] == MyRegion.getPalm() && Island.closeToWater(map, w, h, i, j)) {
				map[i][j] = MyRegion.getLandmass();
			}
		}
	}
	for (var i = 0; i < w; i++) {
		for (var j = 0; j < h; j++) {
			if (this.isWater(map[i][j])) {
				continue;
			}
			if (!(map[i][j] == MyRegion.getPalm())) {
				continue;
			}
			if (Island.closeToWater(map, w, h, i, j)) {
				map[i][j] = MyRegion.getLandmass();
			}
			var c = 0;
			if (j > 0) {
				if (this.isLand(map[i][j - 1])) {
					c += 2;
				}
			}
			if (j < map[0].length - 1) {
				if (this.isLand(map[i][j + 1])) {
					c += 8;
				}
			}
			if (i > 0) {
				if (this.isLand(map[i - 1][j])) {
					c += 1;
				}
			}
			if (i < map.length - 1) {
				if (this.isLand(map[i + 1][j])) {
					c += 4;
				}
			}
			map[i][j] = MyRegion.getPalm() + c;
		}
	}
}

NWorld.prototype.isWater= function(value) {
	if (value == MyRegion.getSea() || value == MyRegion.getRiver() || value == MyRegion.getRiverSource()) {
		return true;
	}
	return false;
}

NWorld.prototype.isLand= function(value) {
	if (value >= MyRegion.getPalm() && value < MyRegion.getPalm() + 16) {
		return true;
	}
	return false;
}

NWorld.prototype.createRivers= function(map,  w,  h) {
	var min= [];
	var max= [];
	var dmin= [];
	var dmax= [];
	min[0]= 8;
	min[1]= 4;
	min[2]= 4;
	max[0]= 32;
	max[1]= 24;
	max[2]= 16;
	dmin[0]= 8;
	dmin[1]= 6;
	dmin[2]= 4;
	dmax[0]= 16;
	dmax[1]= 12;
	dmax[2]= 8;

	var s = 2;
	if (((w + h) / 2) >= 129) {
		s = 1;
	}
	if (((w + h) / 2) >= 256) {
		s = 0;
	}

	var n = myRandom(min[s], max[s]);

	var t = 0;
	while (n > 0) {
		t++;
		if (t > 100) {
			return;
		}
		var x = myRandom(1, w-2);
		var y = myRandom(1, h-2);

		var dxy = this.distanceTo(map, x, y, MyRegion.getSea());

		if (dxy.d >= dmin[s] * dmin[s] && dxy.d <= dmax[s] * dmax[s]) {
			n--;
			try {
				Island.connectPoints(map, w, h, x, y, dxy.x2, dxy.y2, MyRegion.getRiver());
			}
			catch(e) {
				//log.console(e);
			}
			map[x][y] = MyRegion.getRiverSource();
		}
	}

}

NWorld.prototype.distanceTo= function(map,  x,  y,  value) {
	var dxy = new DistanceXY(x, y, 0, 0, 3000000000);

	for (var i = 0; i < map.length; i++) {
		for (var j = 0; j < map[0].length; j++) {
			if (map[i][j] == value) {
				var td = Island.delta(x, y, i, j);
				if (td < dxy.d) {
					dxy.x2 = i;
					dxy.y2 = j;
					dxy.d = td;
				}
			}
		}
	}
	return dxy;
}


NWorld.prototype.countLand= function(map) {
	var counter= 0;
	var coast= 0;
	for(var x= 0; x< map.length; x++) {
		for(var y= 0; y< map[0].length; y++) {
			if(map[x][y]>= MyRegion.LAND && map[x][y]< MyRegion.LAND+32)
				counter++;
			if(map[x][y]>= MyRegion.LAND && map[x][y]< MyRegion.LAND+15)
				coast++;
		}
	}

	return counter;
}



function WorldPoint(x1, y1) {
	this.x= x1;
	this.y= y1;
}

