package net.iicaptain.homeport.web;

import java.util.Enumeration;
import java.util.Map;
import java.util.Properties;
import java.util.Set;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import net.iicaptain.homeport.HelloService;

@Controller
public class HelloController {
	private HelloService hello;
	private static int n= 0;
	@Autowired
	public HelloController(HelloService hello) {
		this.hello= hello;
		System.out.println("-------- HelloController init: "+n+"----------");
		n++;
	}
	
	@PostConstruct
	public void props() {		
	}
	
	@RequestMapping(value={"/hello"}, method= RequestMethod.GET)
	public String say(Model model) {
		model.addAttribute("hello", hello.hello("CF World+("+this+")"));
		return "hello";
	}
	/*@RequestMapping(method= RequestMethod.GET)
	public String foo(Model model) {
		model.addAttribute("hello", hello.hello("foo"));
		return "hello";
	}
	*/
}
