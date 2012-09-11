package net.iicaptain.homeport.creator;

public class Region {
    public final static byte CARIBEAN = 1;
    public final static byte REGION[] = {CARIBEAN};
    public final static byte OPENSEA = 0, RIVER = 1, RIVERSOURCE= 2, LAND = 4, PALM= 20;
  
    private  Region() {
    }

    public static byte getLandmass() {
        return LAND;
    }

    public static byte getCoast() {
        return LAND;
    }

    public static  byte getPalm() {
        return PALM;
    }

    public static byte getRiver() {
        return RIVER;
    }
    
    public static byte getSea() {
        return OPENSEA;
    }

    public static byte getRiverSource() {
        return RIVERSOURCE;
    }
}
