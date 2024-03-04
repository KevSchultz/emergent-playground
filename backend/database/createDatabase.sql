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
    creationtime TIMESTAMP,
    permissions INT,
    PRIMARY KEY(userid)
);

-- creating a table to store post data
CREATE TABLE posts (
    userid uuid,
    postid INT PRIMARY KEY,
    name VARCHAR(50),
    post BYTEA
);

/*
    POST FORMATTING
    const post = {
            userID: postResult.userID,
            postID: postResult.postID,
            username: postResult.username,
            creationTime: postResult.creationtime,
            title: postResult.title,
            description: postResult.description,
            views: postResult.views,
            visibility: postResult.visibility,
            filename: postResult.filename,
            state: postResult.state,
            thumbnail: postResult.thumbnail,
            data: postResult.data,
        };

*/



/*
RULE DATA EXAMPLE
const wireworld = {
    name: 'Wireworld',
    tupleList: [{color: '#000000', name: 'empty'}, {color: '#00ffff', name: 'electron_head'}, {color: '#ff0000', name: 'electron_tail'}, {color: '#ffff00', name: 'conductor'}],
    defaultDraw: '#ffff00',
    defaultBackground: '#000000',
    url: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Wireworld_XOR-gate.gif',
    shader: wireworldShader,
    neighborhood: 'moore',
    range: 1,
    includeSelf: false,
};

*/

-- giving client user permissions to only modify these 3 tables (cannot delete them or the database)
GRANT SELECT, INSERT, DELETE ON users TO client;
GRANT SELECT, INSERT, DELETE ON posts TO client;

-- insert test user
INSERT INTO users ( username, email, password, creationtime, permissions) 
VALUES ( 'testuser', 'test@test.com', 'testpassword', TIMESTAMP '2024-02-09 23:34:57', 1);

-- insert test post
INSERT INTO posts ( userid, postid, username, creationtime, title, description, views, visibility, filename, state, thumbnail, data)
VALUES ( '00000000-0000-0000-0000-000000000000', 1, 'testuser', TIMESTAMP '2024-02-09 23:34:57', 'testtitle', 'testdescription', 0, TRUE, 'testfilename', 'teststate', 'testthumbnail', 'testdata');
