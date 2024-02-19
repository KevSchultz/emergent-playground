# PSQL SERVER API

This API acts as middleware for interacting with the backend database

The API allows for:
    - connecting to a client pool for accessing the database
    - creating and managing user accounts
    - creating and managing sessions
    - creating and managing and searching posts

## Building

### Database
To build the Postgresql Database first ensure that the following dependencies are installed:
    - node
    - express
    - pg
    - postgresql version 16
    - createDatabase.sql

Then run the following commands to build the database

```
psql -h 127.0.0.1 -U postgres
```

Upon entering this command you will have a locally hosted instance of postgresql

Upon initial installation, the default user account 'postgres' which we logged in as should have no password

Change the password of this account using this command in the sql prompt

```
\password
```

The default account has admin privileges so it is important to select a secure password for non local hosting

To build the database, we are going to use the createDatabase.sql

First obtain the path to where createDatabase.sql is located on your file system

Then run the following command in the sql prompt
```
\i ~/path/to/your/createDatabase.sql
```

Where '~/path/to/your/createDatabase.sql' should be replaced with the actual path to createDatabase.sql

To verify that the database was correctly built, use 
```
\dt
```

to list all tables. There should be three tables named users, sessions, and posts

### API

To build the api, use the following command in the directory where psqlConnectAPI.js is located or using the path to the directory where it is located

```
node psqlConnectAPI.js
```

Or include the psqlConnectAPI.js file in a different javascript file to use the functions as a library

## Usage
No knowledge of SQL is required for the usage of this API, however it is recommended to be familiar with the definitions of what a query is and how it is used

Included below is a comprehensive list of the functions this API provides and how to use them

### Functions:


#### connectToDatabase()
```
connectToDatabase()
```
Connects to the database by making a new client object and connecting to the database

returns the client as an object with fields:
    - host: the name used for the connection
    - user: the username of the account we logged in as
    - port: the port that the instance is being hosted on
    - password: the password of the account
    - database: the name of the database we have connected to


#### createAccount()
```
createAccount(client, username, password, email)
```
Creates a user account by entering a new account with the provided info as a row into the users table

Takes the following arguments:
    - client: the client object
    - username: as a string
    - password: as a string
    - email: as a string

Returns a user object with the following fields:
    - userID:
    - username:
    - email
    - creationTime:
    - permissions:


#### deleteAccount()
```
deleteAccount(client, user)
```

Deletes an account from the database by removing the row from the users table

Takes the following arguments:
    - client: the client object
    - user: the user object


#### logIn()
```
logIn(client, username, password)
```
Logs the user in by checking the provided credentials, creating a new session object, and then returning it after uploading the session info to the database

Takes the client object, username, and password

If the credentials are correct:
Returns a session object containing:
    - userID: INT
    - sessionID: INT
    - sessionToken: INT
    - creationTime: STRING
    - expireTime: STRING
    - expired: BOOL

Where the expireTime is 3 hours after the creationTime

It should be noted that creationTime and expireTime must be in the format: 'YYYY-MM-DD HH:MM:SS' to be compatible with the sql server. However, this is handled within the function

If the credentials are incorrect:
Returns NULL


#### logOut()
```
logOut(client, session)
```

Logs out the user by deleting their session locally and from the database

Takes the client object and the session object

returns true if successful


#### makePost()
```
makePost(client, session, title, description, visibility, filename, state, thumbnail, data)
```

Makes a post using the entered attributes. Defaults will be used when an attribute is not specified

Takes client object, session object, and the post attributes

It should be noted that:
    - title, description, and filename are strings
    - visibility is a bool
    - state, thumbnail, and data are fed as generic bytes

Returns the postID of the created post


#### deletePost()
```
deletePost(client, postID)
```
Deletes a post from the database

Takes the client object and the postID of the post to be deleted

Returns true if successful, false if failure


#### getPostInfo()
```
getPostInfo(client, postID)
```

Takes the client object and postID

Returns a post object with fields:
            - userID: INT
            - postID: INT
            - username: STRING
            - creationTime: STRING
            - title: STRING
            - description: STRING
            - views: INT
            - visibility: BOOL
            - filename: STRING
            - state: BYTES
            - thumbnail: BYTES
            - data: BYTES


#### hidePost()
```
hidePost(client, postid)
```
Changes the visibility of a post to hidden


#### unhidePost()
```
unhidePost(client, postid)
```
Changes the visibility of a post to public


#### getPostsByNewest()
```
getPostsByNewest(client)
```
Gets all posts by newest creation date

Takes the client object

Returns the posts as rows in an array


#### getPostsByOldest()
```
getPostsByOldest(client)
```
Gets all posts by oldest creation date

Takes the client object

Returns the posts as rows in an array


#### getPostsByMostViews()
```
getPostsByMostViews(client)
```
Gets all posts by most views

Takes the client object

Returns the posts as rows in an array


#### getPostsByLeastViews()
```
getPostsByLeastViews(client)
```
Gets all posts by least views

Takes the client object

Returns the posts as rows in an array