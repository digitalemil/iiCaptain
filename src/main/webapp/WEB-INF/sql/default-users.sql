	insert into myusers(username, password, enabled) values
		('admin','admin',1);
	insert into myauthorities(username,authority) values
		('admin','ROLE_USER');
	insert into myauthorities(username,authority) values
		('admin','ROLE_ADMIN');
	insert into myusers(username, password, enabled) values
		('guest','guest',1);
	insert into myauthorities(username,authority) values
		('guest','ROLE_USER');
