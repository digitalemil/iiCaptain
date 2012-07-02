package net.iicaptain.homeport.impl;

import java.sql.Connection;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.iicaptain.homeport.HelloService;
import net.iicaptain.homeport.web.HelloController;

@Service
public class HelloServiceImpl implements HelloService {
	@Autowired 
	private HelloController c;
	
	public String hello(String in) {
		/*
		// Obtain our environment naming context
		try {
		// Standard Tomcat
		Context initCtxTomcat = new InitialContext();
		Context envCtx = (Context) initCtxTomcat.lookup("java:comp/env");
		DataSource dsTomcat = (DataSource)envCtx.lookup("jdbc/MyDB");
		Connection connTomcat = dsTomcat.getConnection();
		connTomcat.close();
		
		// FI	
		Context	initCtx = new InitialContext(); 
		DataSource ds = (DataSource) initCtx.lookup("comp/env/jdbc/MyDB"); 
		Connection conn = ds.getConnection();
		conn.close();
		}
		catch(Exception e) {
			System.err.println("Lookup failed: ");
			e.printStackTrace();
			return "";
		}
		*/
		System.out.println("Hello service succesfully called.");
		return "Hello "+in+"."+" "+c.toString();
	}
}
