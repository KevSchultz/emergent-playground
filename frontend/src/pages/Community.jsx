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
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TopNavigationBar from '../components/TopNavigationBar';

function Community() {
    // State for messages
    const [posts, setPosts] = React.useState([]);

    // // Get the posts from the database
    // // Use getPostsByNewest()
    // const getPosts = async () => {
    //     // URL for the API
    //     let url = 'https://localhost:3010/api/getPostsByNewest';
    //     console.log('here');
    //     return await fetch(url, {
    //         method: 'GET',
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

    // TODO: Temp test version of getPosts using example post data
    const getPosts = async () => {
        return ([
            { title:"Post 1", content:"Text1 - welcome", link:"/welcome" },
            { title: 'Post 2', content: 'Text2 - login', link: 'login' },
            { title: 'Post 3', content: 'Text3 - register', link: 'register' },
        ]);
    }

    // Fetch the posts and update posts array state
    const fetchPosts = async () => {
        try {
            var postsData = await getPosts();
            setPosts(postsData);
        } catch (error) {
            console.log(error);
        }
    };

    // Run effect when the page first loads
    React.useEffect(
        React.useCallback(() => {
            fetchPosts();
        }, []),
    );

    return (
        <div>
            <TopNavigationBar />
            <Container>
                <Typography variant="h4" component="h1" gutterBottom>
                    Community Page
                </Typography>

                {posts.map((post, index) => (
                    <Post key={index} title={post.title} content={post.description} link="/welcome" />
                ))}
                
            </Container>
        </div>
    );
}

function Post({ title, content, link }) {
    const handleClick = () => {
        if (link) {
            window.location.href = link;
        }
    };

    return (
        <div onClick={handleClick} style={{ cursor: link ? 'pointer' : 'default' }}>
            <Card
                sx = {{
                    marginY: 0.5,
                }}
            >
                <CardContent>
                    <Typography variant="h5" component="h2">
                        {title}
                    </Typography>
                    <Typography color="text.secondary">
                        {content}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}

export default Community;
