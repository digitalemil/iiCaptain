/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.iicaptain.client.wnet.share;

import net.iicaptain.client.services.Services;
import net.iicaptain.client.services.graphics.iiGraphics;
import net.iicaptain.client.services.graphics.iiImage;
import net.iicaptain.client.sprite.SpriteImpl;

/**
 *
 * @author emil
 */
public class GundeckSprite extends SpriteImpl {

    private int left = 0, right = 0, n = 0;
    private boolean done= false;
    private iiImage li, ri;

    public GundeckSprite() {
        super("/gundeck/gundeck.png");
        li = Services.getGraphics().getImage("/gundeck/g0/g" + 0 + ".png");
        ri = Services.getGraphics().getImage("/gundeck/g1/gl" + 0 + ".png");
    }

    public boolean animationDone() {
        return done;
    }

    public void setVisible(boolean v) {
        super.setVisible(v);
        if(!v) {
            done= false;
            left= 0;
            right= 0;
        }
    }

    public boolean left() {
        if(!visible)
            return false;
        done= false;
        left= 1;
        return true;
    }

    public boolean right() {
        if(!visible)
            return false;
        done= false;
        right= 1;
        return true;
    }

    public void paint(Object g) {
        if (!visible) {
            return;
        }
        super.paint(g);
        n++;

        if (n % 4 == 1 && left > 0) {
            if (left == 54) {
                left = 0;
                if(right== 0)
                    done= true;
            }
            li = Services.getGraphics().getImage("/gundeck/g0/g" + left + ".png");
            if(left> 0)
                left++;
        }
        if (n % 4 == 1 && right > 0) {
            if (right == 54) {
                if(left== 0)
                    done= true;
                right = 0;
            }
            ri = Services.getGraphics().getImage("/gundeck/g1/gl" + right + ".png");
            if(right> 0)
                right++;
        }
        Services.getGraphics().nativeDrawImage(g, x, y, x + 240, y + 54, li, x - 10, y + 21);
        Services.getGraphics().nativeDrawImage(g, x, y, x + 240, y + 54, ri, x + 122, y + 21);
    }

    public void paint(iiGraphics g) {
        if (!visible) {
            return;
        }
        super.paint(g);
        iiImage img = Services.getGraphics().getImage("/gundeck/g0/g" + left + ".png");
        g.drawImage(img, 12, 23);
        img = Services.getGraphics().getImage("/gundeck/g1/g" + right + ".png");
        g.drawImage(img, 100, 23);
    }
}
