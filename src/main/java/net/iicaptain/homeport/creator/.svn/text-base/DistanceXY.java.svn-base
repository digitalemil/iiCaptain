/*
 * DistanceXY.java
 *
 * Created on 10 November 2006, 19:37
 *
 * To change this template, choose Tools | Template Manager
 * and open the template in the editor.
 */

package net.iicaptain.homeport.creator;

/**
 *
 * @author emil
 */
public class DistanceXY  {
    public int x1, y1, x2, y2;
    public int d;
    /** Creates a new instance of DistanceXY */
    public DistanceXY(int xx1, int yy1, int xx2, int yy2, int dd) {
        x1= xx1;
        y1= yy1;
        x2= xx2;
        y2= yy2;
        d= dd;
    }

    public int compareTo(Object o) {
        if(d<= ((DistanceXY)o).d)
            return -1;
        if(d>= ((DistanceXY)o).d)
            return 1;
        return 0;
    }

    public String toString() {
        return "x1: "+x1+" y1: "+y1+ " x2: "+x2+" y2:" +y2+" d: "+d;
    }
}
