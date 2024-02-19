-- FOR DEBUGGING, DELETES THE DATABASE AND USER EVERY TIME YOU RUN IT
DROP DATABASE clientdata;
DROP ROLE client;

-- creating a client user with limited permissions
CREATE ROLE client WITH LOGIN PASSWORD '123456';

-- creating the database
CREATE DATABASE clientdata;

-- connecting to the database
\c clientdata

-- creating a table to store user data
CREATE TABLE users (
    userid INT PRIMARY KEY,
    username VARCHAR(20),
    password VARCHAR(20),
    email VARCHAR(40),
    creationtime TIMESTAMP,
    permissions INT
);

-- creating a table to store session data
CREATE TABLE sessions (
    userid INT,
    sessionid INT PRIMARY KEY,
    sessiontoken INT,
    creationtime TIMESTAMP,
    expiretime TIMESTAMP,
    expired BOOL
);

-- creating a table to store post data
CREATE TABLE posts (
    userid INT,
    postid INT PRIMARY KEY,
    username VARCHAR(20),
    creationtime TIMESTAMP,
    title VARCHAR(30),
    description VARCHAR(200),
    views BIGINT,
    visibility BOOL,
    filename VARCHAR(30),
    state BYTEA,
    thumbnail BYTEA,
    data BYTEA
);

-- giving client user permissions to only modify these 3 tables (cannot delete them or the database)
GRANT SELECT, INSERT, DELETE ON users TO client;
GRANT SELECT, INSERT, DELETE ON sessions TO client;
GRANT SELECT, INSERT, DELETE ON posts TO client;

INSERT INTO users (userid, username, password, email, creationtime, permissions) 
VALUES (1961269467, 'testuser', 'testpassword', 'test@test.com', TIMESTAMP '2024-02-09 23:34:57', 1);