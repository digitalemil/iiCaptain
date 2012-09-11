package net.iicaptain.homeport.creator;


public class World {
    public final static int MAXWIDTH= 256, MAXHEIGHT= 256, EXTENT= 16;
    public static byte map[][] = new byte[MAXWIDTH+EXTENT][MAXHEIGHT];
    public static int currentWidth, currentHeight;
    public static int creation_max=1, creation=0;
    public static String doing="";

    protected World(int width, int height) {
    }

    public static byte get(int x, int y) {
        if (x < 0 || y < 0 || x >= currentWidth || y >= currentHeight) {
            return Region.OPENSEA;
        }
        byte t= map[x][y];
        if(t> 0) {
            map[x][y]= (byte)-t;
        }
        return (byte)(-map[x][y]);
    }

    public static void set(int x, int y, byte t) {
        map[x][y]= t;
    }

    public static byte[][] createMap(int width, int height) {
        currentWidth= width;
        currentHeight= height;
        
        int[] n = new int[3];
        n[0] = (int) ((Decimal.random(6, 12) * width * height) / 256 / 256);
        n[1] = (int) ((Decimal.random(6, 14) * width * height) / 256 / 256);
        n[2] = (int) ((Decimal.random(12, 24) * width * height) / 256 / 256);
        int[] min = new int[]{20, 14, 6};
        int[] max = new int[]{40, 28, 12};


        clear(Region.OPENSEA);
        creation_max= 2*(n[0]+n[1]*2+n[2]*4)+3*20;
        creation= 0;
        for (int sz = 0; sz < 3; sz++) {
            for (int i = 0; i < n[sz]; i++) {
                switch(sz) {
                    case 0:
                        doing= "Creating small Islands";
                        creation+=2;
                        break;
                    case 1:
                        doing= "Creating medium Islands";
                        creation+=4;
                        break;
                    case 2:
                        doing= "Creating large Islands";
                        creation+=8;
                        break;
                }
                int imapw= Decimal.random(min[sz], max[sz]);
                int imaph= Decimal.random(min[sz], max[sz]);
                byte[][] imap = new byte[imapw][imaph];
                Island.createLandMasses(imap, 0, 0, imapw, imaph);
                int ix = -1, iy = -1, s = 0;
                ix = Decimal.random(0, width - imapw);
                iy = Decimal.random(0, height - imaph);
                Island.put(map, width, height, ix, iy, imap, imapw, imaph, false);
                imap= null;

            }
        }
        
        doing= "Creating Rivers...";
        createRivers(map, width/16, height/16);
        creation+=20;
        
        doing= "Creating Forests...";
        createForestLine(map, width+16, height);
        creation+=20;

        doing= "Pimping Coastline...";
        
        createCoast(map, width+16, height);
        doing= "Done";
        creation+=20;
/*System.out.println("var World= [");
	for(int y= 0; y< height; y++) {
System.out.print("[");
		for(int x= 0; x< width; x++) {
System.out.print(map[x][y]);
if(x< width-1)
System.out.print(", ");
}
System.out.print("]");
if(y< height-1)
System.out.println(",");
}
System.out.println("];");*/
        return map;
    }

    public static void clear(byte value) {
        for (int x = 0; x < MAXWIDTH+EXTENT; x++) {
            for (int y = 0; y < MAXHEIGHT; y++) {
                map[x][y]= value;
            }
        }
    }
    
    public static void createCoast(byte[][] map, int w, int h) {
        for (int i = 0; i < w; i++) {
            for (int j = 0; j < h; j++) {
                if (isWater(map[i][j])) {
                    continue;
                }
                if (!(map[i][j] == Region.getLandmass())) {
                    continue;
                }
                byte c = 0;
                if (j > 0) {
                    if (!isWater(map[i][j - 1])) {
                        c += 2;
                    }
                }
                if (j < map[0].length - 1) {
                    if (!isWater(map[i][j + 1])) {
                        c += 8;
                    }
                }
                if (i > 0) {
                    if (!isWater(map[i - 1][j])) {
                        c += 1;
                    }
                }
                if (i < map.length - 1) {
                    if (!isWater(map[i + 1][j])) {
                        c += 4;
                    }
                }
                map[i][j] = (byte)(Region.getCoast() + c);
            }
        }
    }

    public static void createForestLine(byte[][] map, int w, int h) {
        for (int i = 0; i < w; i++) {
            for (int j = 0; j < h; j++) {
                if (map[i][j] == Region.getPalm() && Island.closeToWater(map, w, h, i, j)) {
                    map[i][j] = Region.getLandmass();
                }
            }
        }
        for (int i = 0; i < w; i++) {
            for (int j = 0; j < h; j++) {
                if (isWater(map[i][j])) {
                    continue;
                }
                if (!(map[i][j] == Region.getPalm())) {
                    continue;
                }
                if (Island.closeToWater(map, w, h, i, j)) {
                    map[i][j] = Region.getLandmass();
                }
                byte c = 0;
                if (j > 0) {
                    if (isLand(map[i][j - 1])) {
                        c += 2;
                    }
                }
                if (j < map[0].length - 1) {
                    if (isLand(map[i][j + 1])) {
                        c += 8;
                    }
                }
                if (i > 0) {
                    if (isLand(map[i - 1][j])) {
                        c += 1;
                    }
                }
                if (i < map.length - 1) {
                    if (isLand(map[i + 1][j])) {
                        c += 4;
                    }
                }
                map[i][j] = (byte)(Region.getPalm() + c);
            }
        }
    }

    public static boolean isWater(byte value) {
        if (value == Region.getSea() || value == Region.getRiver() || value == Region.getRiverSource()) {
            return true;
        }
        return false;
    }

    public static boolean isLand(byte value) {
        if (value >= Region.getPalm() && value < Region.getPalm() + 16) {
            return true;
        }
        return false;
    }

    public static void createRivers(byte[][] map, int w, int h) {
        int[] min = new int[]{8, 4, 4};
        int[] max = new int[]{32, 24, 16};
        int[] dmin = new int[]{8, 6, 4};
        int[] dmax = new int[]{16, 12, 8};

        int s = 2;
        if (((w + h) / 2) >= 129) {
            s = 1;
        }
        if (((w + h) / 2) >= 256) {
            s = 0;
        }

        int n = (int) (Decimal.random(min[s], max[s]));

        int t = 0;
        while (n > 0) {
            t++;
            if (t > 100) {
                return;
            }
            int x = (int) (Decimal.random(1, w-2));
            int y = (int) (Decimal.random(1, h-2));

            DistanceXY dxy = distanceTo(map, x, y, Region.getSea());

            if (dxy.d >= dmin[s] * dmin[s] && dxy.d <= dmax[s] * dmax[s]) {
                n--;
                try {
                Island.connectPoints(map, w, h, x, y, dxy.x2, dxy.y2, Region.getRiver());
                }
                catch(Exception e) {
                    System.out.println("x: "+x+" y: "+y+" "+dxy);

                }
                map[x][y] = Region.getRiverSource();
            }
        }

    }

    public static DistanceXY distanceTo(byte[][] map, int x, int y, int value) {
        DistanceXY dxy = new DistanceXY(x, y, 0, 0, Integer.MAX_VALUE);

        for (int i = 0; i < map.length; i++) {
            for (int j = 0; j < map[0].length; j++) {
                if (map[i][j] == value) {
                    int td = Island.delta(x, y, i, j);
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


    public static int countLand(byte map[][]) {
        int counter= 0;
        int coast= 0;
        for(int x= 0; x< map.length; x++) {
            for(int y= 0; y< map[0].length; y++) {
                if(map[x][y]>= Region.LAND && map[x][y]< Region.LAND+32)
                    counter++;
                if(map[x][y]>= Region.LAND && map[x][y]< Region.LAND+15)
                    coast++;
            }
        }
                System.out.println("count: "+map.length+"/"+map[0].length+" "+counter+" "+coast);
        if(counter> map.length*map[0].length/4)
            System.err.println("Caution land portion is higher than 25%: "+((counter)/(map.length*map[0].length)));
        System.err.println("Land portion is: "+((100f*counter)/(map.length*map[0].length)));
        System.err.println("Coast portion is: "+((100f*coast)/(map.length*map[0].length)));

        return counter;
    }
    protected static class Point {

        int x, y;

        public Point(int x, int y) {
            this.x = x;
            this.y = y;
        }
    }
}
