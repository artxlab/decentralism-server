create database decentralism;
use decentralism;
create table UserInfo (
  address VARCHAR(64) NOT NULL,
  code VARCHAR(20),
  email VARCHAR(100),
  PRIMARY KEY(address),
  UNIQUE INDEX(code),
  UNIQUE INDEX(email)
);
