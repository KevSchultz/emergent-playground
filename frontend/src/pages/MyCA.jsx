

/**
 * A functional component that renders the Community page.
 *
 * @returns {JSX.Element} The Community component.
 */

// Custom Component Imports
import PostListing from "../components/PostListing";


function MyCA() {
    return <PostListing title="My Posts" sorting={1}/>
}

export default MyCA;