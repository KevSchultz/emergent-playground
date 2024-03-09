/**
 * @project Emergent Playground
 * @file Community.jsx 
 * @overview The container component for the community page.
 * The community page includes a cellular automata list that users have shared with searching functionality.
 * @authors Kevin Schultz, Preston Nguyen, Alex Garza
 * @exports Community
 */

/**
 * A functional component that renders a Community post.
 *
 * @returns {JSX.Element} The Post component.
 */
import React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActions, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import P5PropertiesContext from '../components/P5PropertiesContext';


// Card for individual posts on the Community Page
function Post({ title, owner, content, link }) {
    // State for which post user has clicked
    const {setPost} = React.useContext(P5PropertiesContext);

    const handleClick = () => {
        // TODO: Navigate to the linked CA
        setPost();  // set post to the clicked post's ID
        if (link) {
            window.location.href = link;
        }
    };

    return (
        <div>
            <Card
                variant='outlined'
                sx = {{
                    display: 'flex',
                    flexDirection: 'row',
                    marginY: 0.25,
                }}
            >
                <CardContent onClick={handleClick} style={{ cursor: link ? 'pointer' : 'default' }}
                    sx = {{
                        width: '100%',
                    }}
                >
                    <Typography variant="h5" component="h2">
                        {title}
                    </Typography>
                    <Typography color="text.secondary">
                        {content}
                    </Typography>
                </CardContent>
                <PostOwnerActions owner={true} postID={title} />  {/*TODO: Pass owner id & post id*/}
            </Card>
        </div>
    );
}


// Action buttons that show up on the right side of a user's own post
function PostOwnerActions({owner, postID}) {
    // TODO: Username of current user
    // const {username} = React.useContext(P5PropertiesContext);

    // Posts state for the post to be deleted from
    const {posts, setPosts} = React.useContext(P5PropertiesContext);

    // // TODO: Delete the post on the database
    // const deletePostDB = async () => {
    //     // URL for the API
    //     let url = 'https://localhost:3010/api/delete/{postID}';
    //     return await fetch(url, {
    //         method: 'DELETE',
    //         headers: {
    //             'Content-type': 'application/json',
    //         },
    //     }).then(response => {
    //         console.log (response);
    //         return response.json();
    //     }).catch(error => {
    //         console.log(error);
    //     })
    // };

    // Deletes post on the database and in the state list
    const deletePost = async () => {
        // Remove post from the state list of posts
        // TODO: Use postID rather than Title
        var removePost = postID;
        const findPost = (post) => post.title === removePost;  // TODO: change to post.id
        var removePostIndex = posts.findIndex(findPost);
        var newPosts = [...posts];
        newPosts.splice(removePostIndex, 1);
        setPosts(newPosts);
        // TODO: Tell the database to delete the post
    };

    const handleDeleteClick = () => {
        deletePost();
        console.log("DELETE Post " + postTitle);
    };

    // Check if the post's owner is the same as the logged in user
    if (owner) {  // TODO: Check postowner === username
        return (
            <CardActions
                sx = {{
                    justifyContent: 'flex-end',
                }}
            >
                <IconButton onClick={handleDeleteClick}>
                    <DeleteIcon style={{color: 'firebrick'}} />
                </IconButton>
            </CardActions>
        );
    } else {
        return <div />
    }
}

export default Post;