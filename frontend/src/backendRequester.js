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

export async function createAccount(username, password, email) {
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
export async function logIn(username, password, email) {
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

export async function logOut(session) {
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
export async function uploadPost(state) {
  console.log("uploadPost");
  const post = {
    userID: 123,
    postID: 456,
    username: 'x',
    creationTime: null,
    title: 'title',
    description: 'desc',
    views: 0,
    visibility: true,
    filename: 'file.txt',
    state: state,
    thumbnail: null,
    rule: null,
  };  
  const encodedPost = encodeBase64(post);
  // const funcNum = 4;
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/octet-stream',
        },
        body: encodedPost,
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
export async function getSpecificPost(postID){
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
export async function getPosts(number, sorting) {
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
export async function getPostsByUser(userID){
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

/*
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
*/
// takes a javascript array, converts it to json, then converts it into a binary string
// only used for saving state
export function encodeBase64(array) {
  // Step 1: Stringify the array
  let json = JSON.stringify(array);

  // Step 2: Convert the string to a base64 string
  return btoa(unescape(encodeURIComponent(json)));
}

export function decodeBase64(base64) {
  // Step 1: Convert the base64 string to a string
  let json = decodeURIComponent(escape(atob(base64)));

  // Step 2: Parse the string back into an array
  return JSON.parse(json);
}
