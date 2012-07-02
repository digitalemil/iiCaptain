	insert into myusers(username, password, enabled) values
		('admin','admin',true);
	insert into myauthorities(username,authority) values
		('admin','ROLE_USER');
	insert into myauthorities(username,authority) values
		('admin','ROLE_ADMIN');
	insert into myusers(username, password, enabled) values
		('guest','guest',true);
	insert into myauthorities(username,authority) values
		('guest','ROLE_USER');
