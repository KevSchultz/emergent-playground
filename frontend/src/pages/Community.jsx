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

// React Imports
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import TopNavigationBar from '../components/TopNavigationBar';
import backendRequester from '../components/BackendRequester';

// Custom Component Imports
import PostCard from '../components/PostCard';
import P5PropertiesContext from '../components/P5PropertiesContext';


function Community() {
    // State for messages

    const { username } = useContext(P5PropertiesContext);
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);

    const slicePosts = (posts, page) => {
        // Simulate fetching posts from an API
        const startIndex = (page - 1) * 7;
        const endIndex = startIndex + 7;
        const slicedPosts = posts.slice(startIndex, endIndex);
        return slicedPosts;
    };

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
    }, [username]); // Dependency array remains empty to run only once on mount

    
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
            <Box style={{ display: 'flex', height: '95vh' }}>
                <Box sx={{ width: 200, padding: '1rem' }}>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel id="sort-select-label">Sort By</InputLabel>
                        <Select
                            labelId="sorting-select-label"
                            id="sorting-select"
                            label="Sort By"
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
                    {slicePosts(posts, page).map((post) => (
                        <PostCard key={post.title} title={post.title} username={post.username.toUpperCase()} postid={post.postid} />
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

export default Community;