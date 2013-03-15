package net.iicaptain.homeport.selenium;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;

import org.junit.Test;
import org.junit.internal.runners.statements.Fail;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.htmlunit.HtmlUnitDriver;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.WebDriverWait;
import static org.junit.Assert.*;

public class Map  {
	
	
	public Map() {
		
	}
	public static void main(String[] args) throws IOException  {
		(new Map()).test();
	}
	
	
	@Test
    public void test() throws IOException{
		//for vFabric App D test
    	//File file= new File("/tmp/ip.txt");
    	//BufferedReader in= new BufferedReader(new InputStreamReader(new FileInputStream(file)));
    	
    	//String ip= in.readLine();
    	String ip= "iicaptain-test.vcap.me";
        HtmlUnitDriver driver = new HtmlUnitDriver(true);
        System.out.println("MapTest: "+"http://"+ip+"/world/create?width=256&height=256&type=java");
        driver.get("http://"+ip+"/world/create?width=256&height=256&type=java");

        String json = driver.getPageSource();
        if(json.length()>256*256*2) 
        	System.out.println("MapTest passed.");
        else {
          	System.out.println("MapTest failed.");
          	fail();
        }
        
        //Close the browser
        driver.quit();
    }
}