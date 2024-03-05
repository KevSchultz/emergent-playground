/**
 * @project Emergent Playground
 * @file Community.jsx 
 * @overview The container component for the community page.
 * The community page includes a cellular automata list that users have shared with searching functionality.
 * @authors Kevin Schultz, Preston Nguyen, Alex Garza
 * @exports Community
 */

/**
 * A functional component that renders the Community page.
 *
 * @returns {JSX.Element} The Community component.
 */
import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
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

        // State to manage sorting options
        const [sortingOption, setSortingOption] = useState('');

        // Function to handle sorting option change
        const handleSortingChange = (event) => {
            // setSortingOption(event.target.value);
        };

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <TopNavigationBar />

            {/* Sorter */}
            <Box style={{ display: 'flex' }}>
                <Box sx={{ width: 200, padding: '1rem' }}>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel id="sorting-select-label">Sort By</InputLabel>
                        <Select
                            labelId="sorting-select-label"
                            id="sorting-select"
                            value={sortingOption}
                            onChange={handleSortingChange}
                        >
                            <MenuItem value="newest">Newest</MenuItem>
                            <MenuItem value="oldest">Oldest</MenuItem>
                            <MenuItem value="mostViews">Most Views</MenuItem>
                            <MenuItem value="leastViews">Least Views</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Container>
                    <Typography variant="h3" component="h1" gutterBottom>
                        Community
                    </Typography>
                    {posts.map((post) => (
                        <Post key={post.title} title={post.title} content={post.content} link={post.link} />
                    ))}
                </Container>
            </Box>
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
