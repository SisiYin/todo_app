drop database if exists todo;

create database todo;

use todo;

create table task (
  id serial primary key,
  description varchar(255) not null
);

insert into task (description) values ('My test task');
insert into task (description) values ('My other test task')

create table account(
id serial primary key,
email varchar(50) unique not null,
password varchar(255) not null);

