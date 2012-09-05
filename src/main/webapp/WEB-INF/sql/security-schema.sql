drop table myauthorities;
drop table myusers;

create table myusers(
      username varchar(50) not null primary key,
      password varchar(50) not null,
      enabled int not null);

  create table myauthorities (
      username varchar(50) not null,
      authority varchar(50) not null,
      constraint fk_authorities_users foreign key(username) references myusers(username));
      create unique index ix_auth_username on myauthorities (username,authority);

   