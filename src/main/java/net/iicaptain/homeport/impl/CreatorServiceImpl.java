package net.iicaptain.homeport.impl;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.StringTokenizer;

import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

import org.springframework.beans.factory.annotation.Autowired;

import net.iicaptain.homeport.CreatorService;
import net.iicaptain.homeport.creator.*;

public class CreatorServiceImpl implements CreatorService {
	String pathToJSFile;

	public String getPathToJSFile() {
		return pathToJSFile;
	}

	public void setPathToJSFile(String pathToJSFile) {
		this.pathToJSFile = pathToJSFile;

	}

	public String createWorld(int width, int height) {
		ScriptEngineManager mgr = new ScriptEngineManager();
		ScriptEngine jsEngine = mgr.getEngineByName("JavaScript");

		try {
			InputStream is = this.getClass().getClassLoader()
					.getResourceAsStream("js/json2.js");
			Reader reader = new InputStreamReader(is);
			jsEngine.eval(reader);

			is = this.getClass().getClassLoader()
					.getResourceAsStream(pathToJSFile);

			reader = new InputStreamReader(is);
			jsEngine.eval(reader);
		} catch (ScriptException ex) {
			ex.printStackTrace();
		}

		System.out.println("Starting to create World JS: " + width + "x"
				+ height);
		Object obj = null;
		try {
			obj = jsEngine
					.eval("World = new NWorld(); JSON.stringify(World.createMap("
							+ width + ", " + height + "));");

		} catch (ScriptException ex) {
			ex.printStackTrace();
		}
		String ret = "{ \"width\": " + width + "\", \"height\": " + height
				+ ", \"map\":" + obj + "}";
		return ret;
	}

	@Override
	public String createJavaWorld(int width, int height) {
		byte[][] map = World.createMap(width, height);
		StringBuffer obj = new StringBuffer(6 * width * height);

		obj.append("[\n");
		for (int x = 0; x < width; x++) {
			obj.append('[');

			for (int y = 0; y < height; y++) {
				obj.append(map[x][y]);

				if (y < height - 1)
					obj.append(",");

			}
			obj.append(']');
			if (x < width - 1)
				obj.append(",\n");
		}
		obj.append(']');

		String ret = "{ \"width\": " + width + ", \"height\": " + height
				+ ", \"map\":" + obj + " }";
		return ret;
	}

}
