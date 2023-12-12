CREATE DATABASE IF NOT EXISTS auth;

USE auth;

CREATE TABLE IF NOT EXISTS user(
id VARCHAR(20) UNIQUE NOT NULL,
name VARCHAR(20) NOT NULL,
email VARCHAR(20) UNIQUE NOT NULL,
password VARCHAR(100) NOT NULL
);