package net.iicaptain.homeport.web;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.iicaptain.homeport.CreatorService;

import org.apache.commons.collections.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gemstone.gemfire.cache.Cache;
import com.gemstone.gemfire.cache.Region;

import org.springframework.integration.Message;
import org.springframework.integration.MessageChannel;
import org.springframework.integration.support.MessageBuilder;

@Controller
public class CreatorController {

	private CreatorService creator;

	@Autowired
	public CreatorController(CreatorService c) {
		creator = c;
	}
	
	@Autowired
	Cache cache;
	
	@Autowired @Qualifier("locationsToGem")
	MessageChannel locationsChannel;
	
	@Autowired @Qualifier("worldsToGem")
	MessageChannel worldsChannel;
	
	@RequestMapping(value = { "/location" }, method = RequestMethod.GET)
	public @ResponseBody String location(@RequestParam("longitude") String longitude,
			@RequestParam("latitude") String latitude,
			@RequestParam(value="altitude", required=false) String altitude,
			@RequestParam(value="accuracy", required=false) String accuracy,
			@RequestParam(value="altitudeAccuracy", required=false) String altitudeAccuracy,
			@RequestParam(value="heading", required=false) String heading,
			@RequestParam(value="speed", required=false) String speed,
			@RequestParam(value="timestamp", required=false) String timestamp,
			HttpServletRequest request, HttpServletResponse response) {
		
		String key= request.getRemoteAddr()+":"+System.currentTimeMillis();
		String user= "anonymous";
		String val= null;
		try {
			user= request.getUserPrincipal().getName();
		}
		catch(NullPointerException e) {
			
		}
		val= user+","+request.getRemoteAddr()+","+latitude+","+longitude+","+altitude+","+accuracy+","+altitudeAccuracy+","+heading+","+speed+","+timestamp+","+System.currentTimeMillis();
		HashMap<String, String> map= new HashMap<String, String>();
		map.put(key, val);
	    locationsChannel.send(MessageBuilder.withPayload(map).build());
		return null;
	}
	
	@RequestMapping(value = { "/create" }, method = RequestMethod.GET)
	public @ResponseBody String create(@RequestParam("width") int width,
			@RequestParam("height") int height,
			@RequestParam(value = "type", defaultValue = "js") String type, HttpServletRequest request, HttpServletResponse response) {
		response.setHeader("Cache-Control", "no-cache");
		
        String ret= null;
		if ("java".equals(type))
			ret= creator.createJavaWorld(width, height);
		else
			ret= creator.createWorld(width, height);
		
		HashMap<String, String> map= new HashMap<String, String>();
		map.put(request.getRemoteAddr()+":"+System.currentTimeMillis(), ret);
		Message message = MessageBuilder.withPayload(map).build(); 
        worldsChannel.send(message);
		return ret;
	}
}
