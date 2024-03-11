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

// Custom Component Imports
import PostListing from "../components/PostListing";


function Community() {
    return <PostListing title="Community Posts" sorting={0}/>
}

export default Community;