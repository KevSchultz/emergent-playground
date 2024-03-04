const express = require('express');
const app = express();

/*
HOW IT WORKS:

each function sends a request that is then handled by the backend
in order to complete the stated task that the function does

These functions send the params to the backend and the backend then 
does the needed database functions to complete the task.

all functions will either return a true/object on success
or a false/object with a debugging line

uses built in fetch functions
*/

async function createAccount(username, password, email) {
    const funcNum = 1;
    try {
      const response = await fetch('/api/createAccount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
}

// dont focus on these, may already be implemented
async function logIn(username, password, email) {
    const funcNum = 2;

    try {
      const response = await fetch('/api/createAccount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password, email}),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
}

async function logOut(session) {
    const funcNum = 3;
    try {
      const response = await fetch('/api/createAccount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({session}),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
}

// takes an object as a post
async function createPost(post) {
    const funcNum = 4;
    try {
      const response = await fetch('/api/createAccount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({post}),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
}

// takes a post object, if there is a post with that id then it will replace it
async function editPost(post){
    const funcNum = 5;
    try {
        const response = await fetch('/api/uploads', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({post}),
        });
    
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
      }
}

// returns the row for a specific post
async function getSpecificPost(postID){
    const funcNum = 6;
    try {
      const response = await fetch('/api/createAccount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
}

// # of posts to get, the type of sorting
// gets all posts generically that are visible
async function getPosts(number, sorting) {
    const funcNum = 7;
    try {
      const response = await fetch('/api/createAccount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
}

// returns all posts by a user regardless of the visibility
async function getPostsByUser(userID){
  const funcNum = 8;
    try {
      const response = await fetch('/api/createAccount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
}

async function createRule() {
  const funcNum = 9;

}

// gets all rules associated with a user
async function getRules(userID){
  const funcNum = 10;

}

// takes userID of rule owner, rule name, and new rule object to replace it with
async function editRule(){
  const funcNum = 11;

}

// takes a javascript array, converts it to json, then converts it into a binary string
// only used for saving state
function encodeBase64(array) {
  // Step 1: Stringify the array
  let json = JSON.stringify(array);

  // Step 2: Convert the string to a Buffer
  let buffer = Buffer.from(json, 'utf8');

  // Step 3: Convert the Buffer to a base64 string
  return buffer.toString('base64');
}

// takes a base64 binary string and then converts it back into json then into an array
// only used for saving state
function decodeBase64(base64) {
  // Step 1: Convert the base64 string to a Buffer
  let buffer = Buffer.from(base64, 'base64');

  // Step 2: Convert the Buffer to a string
  let json = buffer.toString('utf8');

  // Step 3: Parse the string back into an array
  return JSON.parse(json);
}