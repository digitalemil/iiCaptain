iiCaptain
=========


Attention and changes to the requirements below:

Adobe just went live with build.phonegap.com on September 24th and they changed a couple of things with the 1.0 release.
Initially the demo did a file upload which is not available for opensource apps anylonger. Therefore the src files for phonegap
need to be available via git.
Therefore on your SCM/Jenkins VM you also need git installed (>=1.7.9). The maven pom contains a plugin which will push the src files of the client
to git and then request a pull and build from build.phonegap.com via REST.
In the docs folder you find one .get-credentials file. Please copy it to the root folder of the user executing jenkins on the SCM/Jenkins VM. Then open the file and replace "yourmail%40address.com" and "YourPassword" with your github credentials.
In the build.xml there is my password for phonegap missing. Please send a mail to digitalemil@googlemail.com if you want to have it. Otherwise please create an account in phonegap and you these credentials (you also need to set the property appId in build.xml to reflect your app). 



Requirements:

Running vFabric Application Director 5.0 Beta

Create a BluePrint iiCaptainLite (if you choose another name you need to modify the pom) including Apache Loadbalancer, sqlfire & tcServer. 
The app assumes the sqlfire host or locatar has the name sqlfirehost. You probably echo $DBHOST:IP >> /etc/hosts on the tcServer nodes. 
The tcServer has the nodename iiCaptainLite in my blueprint. If you change that make sure nodename points to your nodename in the pom.  
Deploy the war file as ROOT context. Rename the war file ROOT.war then copy to the webapps folder.

Create a Profile for your blueprint and save it. Retrieve profile Id via:
Retrieve app ids:

curl --basic -k https://appdip:8443/darwin/api/1.0/applications/page/0/page-size/100 --user admin:Vmware1!
e.g.
SpringTravel ID=  513
iiCaptainLite= 9846

curl --basic -k https://172.16.227.192:8443/darwin/api/1.0/deployment-profiles/9846/page/0/page-size/20 --user admin:Vmware1!

Put App Director IP, user, passed, profile id in the pom (under properties)

Create an ubuntu VM with 256MB. Install svn and enable the svn:// protocol:
http://www.howtoforge.com/installing-subversion-and-configuring-access-through-different-protocols-on-ubuntu-11.10
Put the svnIp in the pom
Install apache and make /var/www (htdocs) writeable for the user running jenkins.This where the AppD will download the war file from

Get Jenkins (you just need the war) and run it java -jar jenkins.war
https://wiki.jenkins-ci.org/display/JENKINS/Starting+and+Accessing+Jenkins
Create a Job, point it to svn poll every minute and execute integration-test goal if you want to deploy vs. AppD or cf:update -Dcf.username=yourCFAccount -Dcf.password=yourPasswd

If you want to build different client apps you need to register with build.phonegap.com and modify the token and AppIDs in build.xml


Have fun!

 Emil





