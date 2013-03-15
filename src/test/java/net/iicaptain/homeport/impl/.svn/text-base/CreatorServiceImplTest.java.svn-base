package net.iicaptain.homeport.impl;

import static org.junit.Assert.*;

import net.iicaptain.homeport.CreatorService;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"classpath:**/CreatorServiceImplTest-context.xml"})
public class CreatorServiceImplTest {
	@Autowired
	CreatorService cs;
	
	@Before
	public void setUp() throws Exception {
	}

	@Test
	public void test() {
		String ret= cs.createJavaWorld(128, 128);
		//System.out.println(ret);
		if(ret.length()< 128*128)
			fail();
			
	}

}
