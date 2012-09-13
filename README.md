iiCaptain
=========

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





