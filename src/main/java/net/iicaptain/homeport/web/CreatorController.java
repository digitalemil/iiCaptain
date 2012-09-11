package net.iicaptain.homeport.web;

import javax.servlet.http.HttpServletResponse;

import net.iicaptain.homeport.CreatorService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class CreatorController {

	private CreatorService creator;

	@Autowired
	public CreatorController(CreatorService c) {
		creator = c;
	}

	@RequestMapping(value = { "/create" }, method = RequestMethod.GET)
	public @ResponseBody String create(@RequestParam("width") int width,
			@RequestParam("height") int height,
			@RequestParam(value = "type", defaultValue = "js") String type, HttpServletResponse response) {
		response.setHeader("Cache-Control", "no-cache");
		if ("java".equals(type))
			return creator.createJavaWorld(width, height);
		else
			return creator.createWorld(width, height);
	}
}
