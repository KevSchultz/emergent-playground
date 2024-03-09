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
import { useState } from 'react';
import { useEffect } from 'react';

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
import backendRequester from '../components/BackendRequester';


function Community() {
    // State for messages
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await backendRequester.downloadPostList();
                if (response) {
                    return response;
                }
            } catch (error) {
                console.error("Failed to fetch posts:", error);
            }
            return [];
        };

        // Call the async function within useEffect
        const getPosts = async () => {
            const postsFromBackend = await fetchPosts();
            setPosts(postsFromBackend);
        };

        getPosts();
    }, []); // Dependency array remains empty to run only once on mount

    
    // State to manage sorting options
    const [sortingOption, setSortingOption] = useState('');

    // Function to handle sorting option change
    const handleSortingChange = (event) => {
        console.log("Sorting changes");
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
                        <Post key={post.title} title={post.title} content={post.username} link={post.postid} />
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