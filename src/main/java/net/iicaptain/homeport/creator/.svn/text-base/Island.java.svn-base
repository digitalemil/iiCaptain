/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.iicaptain.homeport.creator;



/**
 *
 * @author Besitzer
 */
public class Island {

    private Island() {
    }

    public static void createLandMasses(byte[][] map, int ix1, int iy1, int ix2, int iy2) {
        int h = iy2 - iy1;
        int w = ix2 - ix1;
        if (h < 4 || w < 4) {
            return;
        }

        int h1 = Decimal.random(1000, 3000);
        int x1 = ix1 + Decimal.random(0, w / 8);
        int x2 = ix1 + Decimal.random(w / 8, w / 4);
        int x3 = ix1 + Decimal.random(w / 8 * 6, 7 * w / 8);
        int x4 = ix1 + Decimal.random(w / 8 * 7, w - 2);
        int x5 = ix1 + Decimal.random(w / 8 * 6, 7 * w / 8);
        int x6 = ix1 + Decimal.random(w / 8, w / 4);
        int y1 = iy1 + Decimal.random(3 * h / 8, 5 * h / 8);
        int y2 = iy1 + Decimal.random(h / 8, h / 4);
        int y3 = iy1 + Decimal.random((h1 * h / 8) / 1000, (h1 * h / 4) / 1000);
        int y4 = iy1 + Decimal.random(3 * h / 8, h / 2);
        int y5 = iy1 + Decimal.random(7 * h / 8, h - 2);
        int y6 = iy1 + Decimal.random(7 * h / 8, h - 2);
   /*     x1= Math.max(x1, w-1);
        x2= Math.max(x2, w-1);
        x3= Math.max(x3, w-1);
        x4= Math.max(x4, w-1);
        x5= Math.max(x5, w-1);
        x6= Math.max(x6, w-1);
     */

//System.out.println("ix1: "+ix1+" w: "+w+" h: "+h+" x4: "+x4+" x5: "+x5+" y4: "+y4+" y5: "+y5);
//System.out.println("ix1: "+ix1+" w: "+w+" h: "+h+" x6: "+x6+" y6: "+y6);

        connectPoints(map, w, h, x1, y1, x2, y2, Region.getLandmass());
        connectPoints(map, w, h,  x2, y2, x3, y3, Region.getLandmass());
        connectPoints(map, w, h,  x3, y3, x4, y4, Region.getLandmass());
        connectPoints(map, w, h,  x4, y4, x5, y5, Region.getLandmass());
        connectPoints(map, w, h,  x5, y5, x6, y6, Region.getLandmass());
        connectPoints(map, w, h,  x6, y6, x1, y1, Region.getLandmass());

        for (int tx = -1; tx < 2; tx++) {
            for (int ty = -1; ty < 2; ty++) {
                if (map[(x1 + w) / 2 + tx][(y1 + h) / 2 + ty] != Region.getLandmass()) {
                    boundaryFill(map, ix1 + w / 2 + tx, iy1 + h / 2 + ty, ix1, iy1, ix2, iy2, Region.getLandmass());
                }
            }
        }
        createForests(map, w, h);
    }

    public static boolean connectPoints(byte[][] map, int mapw, int maph, int x1, int y1, int x2, int y2, byte value) {
        int p1 = 500, p2 = 300, p3 = 200;
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
            DistanceXY[] d = new DistanceXY[4];
            d[0] = new DistanceXY(x1 - 1, y1, x2, y2, delta(x1 - 1, y1, x2, y2));
            d[1] = new DistanceXY(x1 + 1, y1, x2, y2, delta(x1 + 1, y1, x2, y2));
            d[2] = new DistanceXY(x1, y1 - 1, x2, y2, delta(x1, y1 - 1, x2, y2));
            d[3] = new DistanceXY(x1, y1 + 1, x2, y2, delta(x1, y1 + 1, x2, y2));

            quickSort(d, 4);

            int w = Decimal.random(0, 1000);
            int r = 0;
            if (!(y1 == y2 && Decimal.abs(x1 - x2) <= 4)) {
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

    private static void boundaryFill(byte[][] map, int x, int y, int x1, int y1, int x2, int y2, byte value) {
//        System.out.println("boundary fill: x:"+x+" y:"+y+" x1:"+x1+" y1:"+y1+" x2:"+x2+" y2:"+y2);
        if (x <= x1 || x >= x2 - 1) {
            return;
        }
        if (y <= y1 || y >= y2 - 1) {
            return;
        }

        map[x][y] = value;
        // finds the left side, filling along the way
        int fillL = x - 1;
        int mv;
        //       System.out.println("fill: " + x + " " + y + " " + value + " " + map[x][y]);
        do {
            mv = map[fillL][y];
            map[fillL][y] = value;
            fillL--;
        } while (fillL >= x1 && mv != value);
        fillL++;

        // find the right right side, filling along the way
        int fillR = x + 1;
        do {
            mv = map[fillR][y];
            map[fillR][y] = value;
            fillR++;
        } while (fillR < x2 - 1 && mv != value);
        fillR--;

        // checks if applicable up or down
        for (int i = fillL; i <= fillR; i++) {
            if (y > y1) {
                if (map[i][y - 1] != value) {
                    boundaryFill(map, i, y - 1, x1, y1, x2, y2, value);
                }
            }
            if (y < y2 - 1 && map[i][y + 1] != value) {
                boundaryFill(map, i, y + 1, x1, y1, x2, y2, value);
            }
        }
    }

    public static void createForests(byte[][] map, int w, int h) {
        int nForests = 1;

        if (((w + h) / 2) >= 16) {
            nForests = Decimal.random(1, 3);
        }

        if (((w + h) / 2) >= 32) {
            nForests = Decimal.random(1, 5);
        }

        if (((w + h) / 2) >= 64) {
            nForests = Decimal.random(2, 12);
        }

        if (((w + h) / 2) >= 96) {
            nForests = Decimal.random(2, 18);
        }

        for (int i = 0; i < nForests; i++) {
            int rA = Decimal.random(4, 16);
            int rB = Decimal.random(4, 16);
            byte[][] dmap = new byte[rA][rB];
            rA--;
            rB--;
            connectPoints(dmap, rA, rB, 1, 1, 1, rB, Region.getPalm());
            connectPoints(dmap, rA, rB,  1, rB, rA, rB, Region.getPalm());
            connectPoints(dmap, rA, rB, rA, rB, rA, 1, Region.getPalm());
            connectPoints(dmap, rA, rB, rA, 1, 1, 1, Region.getPalm());
            createCluster(dmap, rA, rB, map, w, h, 2);
            dmap= null;
        }
    }

    public static void createCluster(int x, int y, byte[][] dmap, int dw, int dh, byte[][] map, int mapw, int maph, byte value, int distanceToWater) {
        boundaryFill(dmap, dw / 2, dh / 2, 0, 0, dmap.length, dmap[0].length, value);
        put(map, mapw, maph, x - dw / 2, y - dh / 2, dmap, dw, dh, true);
    }

    public static World.Point createCluster(byte[][] dmap, int dw, int dh, byte[][] map, int w, int h, int distanceToWater) {
        int x = -1, y = -1;
        int t = 0;

        while (y == -1) {
            t++;
            x = Decimal.random(1, w - 1);
            y = Decimal.random(1, h - 1);
            if (closeToWater(map, w, h, x, y)) {
                y = -1;
            }
            if (t > 20) {
                break;
            }
        }
        if (x == -1 || y == -1) {
            return new World.Point(-1, -1);
        }

        createCluster(x, y, dmap, dw, dh, map, w, h, Region.getPalm(), distanceToWater);
        return new World.Point(x, y);
    }

    public static int delta(int x1, int y1, int x2, int y2) {
        return ((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    }

    public static boolean closeToWater(byte[][] map, int w, int h, int x, int y) {
        boolean ret = false;
        for (int i = -1; i < 2; i++) {
            for (int j = -1; j < 2; j++) {
                if (i == 0 && j == 0) {
                    continue;
                }
                if (i + x < 0 || j + y < 0 || i + x >= w || j + y >= h) {
                    continue;
                }
                if (map[i + x][j + y] == Region.getSea() || map[i + x][j + y] == Region.getRiver() || map[i + x][j + y] == Region.getRiverSource()) {
                    ret = true;
                }
            }
        }
        return ret;
    }

    public static void quickSort(DistanceXY[] d, int n) {
        q_sort(d, 0, 4 - 1);
    }

    public static void q_sort(DistanceXY[] d, int left, int right) {
        int l_hold = left;
        int r_hold = right;
        DistanceXY pivot = d[left];
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
        int p = left;
        left = l_hold;
        right = r_hold;
        if (left < p) {
            q_sort(d, left, p - 1);
        }
        if (right > p) {
            q_sort(d, p + 1, right);
        }
    }

    public static void put(byte[][] dest, int destw, int desth, int dx, int dy, byte[][] src, int srcw, int srch, boolean check) {
        for (int y = 0; y < srch; y++) {
            for (int x = 0; x < srcw; x++) {
                if (dy + y < 0 || dx + x < 0 || dx + x >= destw || dy + y >= desth) {
                    continue;
                }
                if (src[x][y] == Region.getSea()) {
                    continue;
                }
                if (check && dest[dx + x][dy + y] != Region.getLandmass()) {
                    continue;
                }
                dest[dx + x][dy + y] = src[x][y];
            }
        }
    }
    /*   public static void boundaryFill(byte[][] map, int x, int y, int x1, int y1, int x2, int y2, int layer, int value) {
    int bits = layer * 8;
    int mv = (map[x][y] & (0xFF << bits)) >>> bits;

    if (mv != value) {
    map[x][y] |= value << (bits);

    if (x < x2) {
    boundaryFill(map, x + 1, y, x1, y1, x2, y2, layer, value);
    }

    if (x > x1) {
    boundaryFill(map, x - 1, y, x1, y1, x2, y2, layer, value);
    }

    if (y > y1) {
    boundaryFill(map, x, y - 1, x1, y1, x2, y2, layer, value);
    }

    if (y < y2) {
    boundaryFill(map, x, y + 1, x1, y1, x2, y2, layer, value);
    }

    }
    }
     */
}
