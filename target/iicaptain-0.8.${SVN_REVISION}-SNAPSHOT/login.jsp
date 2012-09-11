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
<style type="text/css">
td {
	font-family: 'Zapfino';
	font-weight: bold;
	text-decoration: none;
	color: black;
}
">
</style>

<body bgcolor="#482100">
	<div align="center">
		<table style="color: white;">

			<tr>
				<td
					style="font-family: 'Zapfino'; font-weight: bold; text-decoration: none; color: white;"
					align="right"><a
					onclick="alert('Coming soon! Try guest/guest meanwhile');">Register!</a></td>
			</tr>
		</table>

	</div>


	<div align="center">
		<img  width="960px" height="640px" style="top: 128px;" src="start.png">
		</img>
		<div style="position: absolute; left: 50%; top: 440px;">
		<div style="position: relative; left: -50%;">
		<c:if test="${!empty param.login_error}">
        <h2> <font color="red"> Incorrect username and/or password </font></h2>
</c:if>
		<form 
			action="<c:url value='/j_spring_security_check'/>" method="post">
			<table style="top: 200px;">
				<tr>
					<td>Captain's Name:</td>
					<td><input type="text" name="j_username" /></td>
				</tr>
				<tr>
					<td>Password:</td>
					<td><input type="password" name="j_password" /></td>
				</tr>
				<tr>
					<td></td>
					<td align="right"><input
						style="font-family: 'Zapfino'; font-weight: bold; text-decoration: none; color: black;"
						name="submit" type="submit" value="Login" /></td>
				</tr>
			</table>
		</form>
		</div>
		</div>
	</div>
</body>

</html>
