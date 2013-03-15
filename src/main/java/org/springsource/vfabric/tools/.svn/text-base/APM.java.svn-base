package org.springsource.vfabric.tools;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.InetAddress;
import java.net.URLEncoder;
import java.net.UnknownHostException;

public class APM {

	/**
	 * @param args
	 * @throws IOException 
	 * @throws InterruptedException 
	 */
	public static void main(String[] args) throws IOException, InterruptedException {
		String user= args[0];
		String passwd= args[1];
		String apmip= args[2];
		String apmport= args[3];
		String appname= args[4];
		String description= args[5];
		
		File file= new File("/tmp/ip.txt");
    	BufferedReader in= new BufferedReader(new InputStreamReader(new FileInputStream(file)));
    	
    	String appip= in.readLine();
    	
		System.out.println("APM appip: "+appip);
		
		String addApp[]= {"curl",  "--user",user+":"+passwd, "-X", "POST",  "--basic", "-k",  "https://"+apmip+":"+apmport+"/am-apm-web/resources/applications/+"+appname+"?description="+URLEncoder.encode(description, "UTF-8")};
		
		String addAppServer[]= {"curl",  "--user", user+":"+passwd, "-X", "POST",  "--basic", "-k", "https://"+apmip+":"+apmport+"/am-apm-web/resources/applications/+"+appname+"/tiers/+AppServer"};

		String components[] = {"curl",  "--user",user+":"+passwd, "-X", "GET",  "--basic", "-k",  "https://"+apmip+":"+apmport+"/am-apm-web/resources/applications/+"+appname+"/potentials/components"};
		
		
		/*
		InetAddress address = InetAddress.getByName(apmip);
		
		boolean reachable= true;
		try {
			 reachable= address.isReachable(10000);
		} catch (IOException e1) {
			reachable= false;
		}
		if(!reachable) {
			System.out.println("Can't reach:"+ apmip);
			return;
		}
			*/
		AppDirector.exec(addApp);
		
		Thread.currentThread().sleep(2000);
	
		AppDirector.exec(addAppServer);
		
		Thread.currentThread().sleep(2000);
		
		
		String agent= AppDirector.exec(components);
		String agentId= agent.replaceFirst("(.*agentId\":)([0-9]*)(,\"name\":\"ROOT\",\"type\":\"BCI_COMPONENT\",\"port\":80,\"ip\":\")("+appip+")(\".*)", "$2");
		
		System.out.println("AgentId:" +agentId);
		
		String addComponents[] = {"curl",  "--user",user+":"+passwd, "-X", "POST",  "--basic", "-k", "https://"+apmip+":"+apmport+"/am-apm-web/resources/applications/+"+appname+"/tiers/+AppServer/components/+ROOT"+"?type=BCI_COMPONENT&port=80&agentId="+agentId+"&ip="+appip};
	
		for(int i= 0; i< addComponents.length; i++)
			System.out.print(addComponents[i]+" ");
		System.out.println();
		AppDirector.exec(addComponents);
		/*
		ProcessBuilder pb = new ProcessBuilder(addComponents);
		Process process= null;
		try {
			process = pb.start();
			Thread.currentThread().sleep(8000);
		} catch (IOException e1) {
			e1.printStackTrace();
		}
		finally {
			process.getInputStream().close();
			process.getOutputStream().close();
			process.getErrorStream();
			process.destroy();
		}
		*/
	}

}
