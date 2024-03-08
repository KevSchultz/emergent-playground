-- FOR DEBUGGING, DELETES THE DATABASE AND USER EVERY TIME YOU RUN IT
DROP DATABASE clientdata;

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
    PRIMARY KEY(userid)
);

-- creating a table to store post data
CREATE TABLE posts (
    postid uuid DEFAULT uuid_generate_v4(),
    userid uuid,
    username VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    poststate BYTEA,
    postproperties BYTEA,
    creationtime TIMESTAMP,
    PRIMARY KEY(postid)
);

-- giving client user permissions to only modify these 3 tables (cannot delete them or the database)
GRANT SELECT, INSERT, DELETE ON users TO client;
GRANT SELECT, INSERT, DELETE ON posts TO client;
