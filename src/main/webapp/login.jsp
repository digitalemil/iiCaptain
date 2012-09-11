<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE html 
     PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
     "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">

<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Captain, your password please!</title>

</head>
<body bgcolor="#482100">
	<div id="alldiv">
		<img id="start" style="position: absolute; top: 0px; left: 0px;"
			src="openres/start.png"> </img> <img id="register" src="openres/register.png" onclick="alert('Coming soon! Meanwhile please login as guest with password guest.');">
		</img>


		<c:if test="${!empty param.login_error}">
			<h2>
				<font color="red"> Incorrect username and/or password </font>
			</h2>
		</c:if>
		<form action="<c:url value='/j_spring_security_check'/>" method="post"
			id="login">
			<table>
				<tr>
					<td><img src="openres/yourname.png" id="userimg" /></td>
					<td><input type="text" name="j_username" id="user" /></td>
				</tr>
				<tr>
					<td><img src="openres/password.png" id="passwdimg" /></td>
					<td><input type="password" name="j_password" id="passwd" /></td>
				</tr>
				<tr>
					<td></td>
					<td align="right"><input type="image" src="openres/ok.png" id="okimg"
						onclick="document.getElementById('login').submit();" /></td>
				</tr>
			</table>
		</form>
	</div>
	<script>
		var w = window.innerWidth;
		var h = window.innerHeight;
		// 920, 576
		var perfcor = 0;
		var scale = Math
				.min((w - perfcor * 64) / 960, (h - perfcor * 64) / 640);
		var sX = (w - perfcor * 64) / 960;
		var sY = (h - perfcor * 64) / 640;

		var img = document.getElementById("start");
		img.setAttribute("style",
				"position:absolute; top:0px; left:0px; width: "
						+ window.innerWidth + "px; height: "
						+ window.innerHeight + "px;");

		img = document.getElementById("register");
		img.setAttribute("style", "position:absolute; top:" + (-64 * sY)
				+ "px; left:" + (40 * sX) + "px; width: " + (256 * sX * 2)
				+ "px; height: " + (128 * sY * 2) + "px;");

		var userimg = document.getElementById("userimg");
		userimg.setAttribute("style", "position:absolute; top:" + (280 * sY)
				+ "px; left:" + (((960 - 512 - 140) / 2) * sX) + "px; width: "
				+ (256 * sX * 1.5) + "px; height: " + (128 * sY * 1.5) + "px;");

		var ui = document.getElementById("user");
		ui.setAttribute("style", "position:absolute; top:" + (360 * sY)
				+ "px; left:" + (((200 + 960 - 256) / 2) * sX) + "px; width: "
				+ (220 * sX) + "px; height: " + (32 * sY * 1.5) + "px;");

		var pimg = document.getElementById("passwdimg");
		pimg.setAttribute("style", "position:absolute; top:" + (340 * sY)
				+ "px; left:" + (((960 - 512 - 180) / 2) * sX) + "px; width: "
				+ (256 * sX * 1.5) + "px; height: " + (128 * sY * 1.5) + "px;");

		var pi = document.getElementById("passwd");
		pi.setAttribute("style", "position:absolute; top:" + (420 * sY)
				+ "px; left:" + (((200 + 960 - 256) / 2) * sX) + "px; width: "
				+ (220 * sX) + "px; height: " + (32 * sY * 1.5) + "px;");

		var okimg = document.getElementById("okimg");
		okimg.setAttribute("style", "position:absolute; top:" + (520 * sY)
				+ "px; left:" + (((960 + 460) / 2) * sX) + "px; width: "
				+ (48 * sX * 1.5) + "px; height: " + (48 * sY * 1.5) + "px;");
	</script>
	
</body>
</html>
