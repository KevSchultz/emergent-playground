/**
 * @project Emergent Playground
 * @file Community.jsx 
 * @overview The container component for the community page.
 * The community page includes a cellular automata list that users have shared with searching functionality.
 * @authors Kevin Schultz, Preston Nguyen, 
 * @exports Community
 */

/**
 * A functional component that renders the Community page.
 *
 * @returns {JSX.Element} The Community component.
 */
import React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActions, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


function Post({ title, owner, content, link }) {
    const handleClick = () => {
        // TODO: Increment views this post's views counter in DB

        // TODO: Navigate to the linked CA
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
                <PostOwnerActions owner={true}/>  {/*TODO: Pass owner id*/}
            </Card>
        </div>
    );
}


function PostOwnerActions({owner}) {
    // TODO: Check if ID of the post's owner is the same as the logged in user's ID

    // // TODO: Delete the post on the database
    // const getPosts = async () => {
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

    const handleDeleteClick = () => {
        console.log("DELETE");
    };

    if (owner) {
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