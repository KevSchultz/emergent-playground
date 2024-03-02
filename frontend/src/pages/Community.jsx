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
    // Example post data
    const posts = [
        { title:"Post 1", content:"Text1 - welcome", link:"/welcome" },
        { title: 'Post 2', content: 'Text2 - login', link: 'login' },
        { title: 'Post 3', content: 'Text3 - register', link: 'register' },
    ];

    return (
        <div>
            <TopNavigationBar />
            <Container>
                <Typography variant="h4" component="h1" gutterBottom>
                    Community Page
                </Typography>
                {posts.map((post, index) => (
                    <Post key={index} title={post.title} content={post.content} link={post.link} />
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
            <Card>
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
