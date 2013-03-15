/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.iicaptain.homeport.creator;

import java.util.Random;

public class Decimal {

    private static Random random = new Random(System.currentTimeMillis());
    public static int random(int start, int end) {
        int r, i;
        i = start+ random.nextInt(end+1);

        /*if (r <= 0) {
            r += Integer.MAX_VALUE;
        }
        r = r / (end + 1);

        i = (r * ((end + 1) - start)) / (Integer.MAX_VALUE / (end + 1));
*/
        if (i >= end) {
      //      System.out.println("random1: "+start+" "+end);
            return end;
        }
        if (i < start) {
   //                 System.out.println("random2: "+start+" "+end);

            return start;
        }
   //             System.out.println("random: "+start+" "+end+" "+i);

        return i;
    }


    public static int abs(int x) {
        if (x < 0) {
            return -x;
        } else {
            return x;
        }
    }

   
}
