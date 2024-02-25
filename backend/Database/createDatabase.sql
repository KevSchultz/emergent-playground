-- FOR DEBUGGING, DELETES THE DATABASE AND USER EVERY TIME YOU RUN IT
DROP DATABASE clientdata;
DROP ROLE client;

-- creating a client user with limited permissions
CREATE ROLE client WITH LOGIN PASSWORD '123456';

-- creating the database
CREATE DATABASE clientdata;

-- connecting to the database
\c clientdata

-- enabling the uuid extension for user ids
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- creating a table to store user data
CREATE TABLE users (
    userid uuid DEFAULT uuid_generate_v4(),
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    creationtime TIMESTAMP,
    permissions INT,
    PRIMARY KEY(userid)
);

-- creating a table to store post data
CREATE TABLE posts (
    userid uuid,
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
GRANT SELECT, INSERT, DELETE ON posts TO client;

-- insert test user
INSERT INTO users ( username, email, password, creationtime, permissions) 
VALUES ( 'testuser', 'test@test.com', 'testpassword', TIMESTAMP '2024-02-09 23:34:57', 1);

-- insert test post
INSERT INTO posts ( userid, postid, username, creationtime, title, description, views, visibility, filename, state, thumbnail, data)
VALUES ( '00000000-0000-0000-0000-000000000000', 1, 'testuser', TIMESTAMP '2024-02-09 23:34:57', 'testtitle', 'testdescription', 0, TRUE, 'testfilename', 'teststate', 'testthumbnail', 'testdata');
