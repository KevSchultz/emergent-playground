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
import Button from '@mui/material/Button';
import TopNavigationBar from '../components/TopNavigationBar';

function Community() {
    // State for messages
    const [posts, setPosts] = React.useState([]);
    const [page, setPage] = useState(1);

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
    const getPosts = async (page) => {
        // Simulate fetching posts from an API
        const startIndex = (page - 1) * 7;
        const endIndex = startIndex + 7;
        const slicedPosts = [
            { title:"Post 1", content:"Text1 - welcome", link:"/welcome" },
            { title: 'Post 2', content: 'Text2 - login', link: '/login' },
            { title: 'Post 3', content: 'Text3 - register', link: '/register' },
            { title: 'Post 4', content: 'Text3 - register', link: '/register' },
            { title: 'Post 5', content: 'Text3 - register', link: '/register' },
            { title: 'Post 6', content: 'Text3 - register', link: '/register' },
            { title: 'Post 7', content: 'Text3 - register', link: '/register' },
            { title: 'Post 8', content: 'Text3 - register', link: '/register' },
            { title: 'Post 9', content: 'Text3 - register', link: '/register' },
            
            // { title: `Post ${page * 8 - 7}`, content: `Text${page * 8 - 7} - welcome`, link: `/welcome` },
            // { title: `Post ${page * 8 - 6}`, content: `Text${page * 8 - 6} - login`, link: `/login` },
            // { title: `Post ${page * 8 - 5}`, content: `Text${page * 8 - 5} - register`, link: `/register` },
            // { title: `Post ${page * 8 - 4}`, content: `Text${page * 8 - 4} - register`, link: `/register` },
            // { title: `Post ${page * 8 - 3}`, content: `Text${page * 8 - 3} - register`, link: `/register` },
            // { title: `Post ${page * 8 - 2}`, content: `Text${page * 8 - 2} - register`, link: `/register` },
            // { title: `Post ${page * 8 - 1}`, content: `Text${page * 8 - 1} - register`, link: `/register` },
            // { title: `Post ${page * 8}`, content: `Text${page * 8} - register`, link: `/register` },
            
            // { title: `Post ${startIndex + 1}`, content: `Text ${startIndex + 1} - welcome`, link: `/welcome` },
            // { title: `Post ${startIndex + 2}`, content: `Text ${startIndex + 2} - login`, link: `/login` },
            // { title: `Post ${startIndex + 3}`, content: `Text ${startIndex + 3} - register`, link: `/register` },
            // { title: `Post ${startIndex + 4}`, content: `Text ${startIndex + 4} - register`, link: `/register` },
            // { title: `Post ${startIndex + 5}`, content: `Text ${startIndex + 5} - register`, link: `/register` },
            // { title: `Post ${startIndex + 6}`, content: `Text ${startIndex + 6} - register`, link: `/register` },
            // { title: `Post ${startIndex + 7}`, content: `Text ${startIndex + 7} - register`, link: `/register` },
            // { title: `Post ${startIndex + 8}`, content: `Text ${startIndex + 8} - register`, link: `/register` },

            // { title: `Post ${startIndex + 1}`, content: `Text ${startIndex + 1} - register`, link: `/register` },
            // { title: `Post ${startIndex + 2}`, content: `Text ${startIndex + 2} - register`, link: `/register` },
            // { title: `Post ${startIndex + 3}`, content: `Text ${startIndex + 3} - register`, link: `/register` },
        ].slice(startIndex, endIndex);
        return slicedPosts;
    };

    // Fetch the posts and update posts array state
    const fetchPosts = async (page) => {
        try {
            const postsData = await getPosts(page);
            setPosts(postsData);
        } catch (error) {
            console.log(error);
        }
    };

    // Run effect when the page first loads
    React.useEffect(() => {
        fetchPosts(page);
    }, [page]);

    // State to manage sorting options
    const [sortingOption, setSortingOption] = useState('');

    // Function to handle sorting option change
    const handleSortingChange = (event) => {
        // setSortingOption(event.target.value);
    };

    const nextPage = () => {
        setPage(page + 1);
    };

    const prevPage = () => {
        setPage(page - 1);
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
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        {page > 1 && (
                            <Button onClick={prevPage} variant="outlined" sx={{ marginRight: '10px' }}>
                                {"<-"}
                            </Button>
                        )}
                        <Button onClick={nextPage} variant="contained">
                            {"->"}
                        </Button>
                    </Box>
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
            <Card sx={{ marginY: 0.5 }}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        {title}
                    </Typography>
                    <Typography color="text.secondary">{content}</Typography>
                </CardContent>
            </Card>
        </div>
    );
}

export default Community;