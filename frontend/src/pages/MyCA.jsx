/**
 * @project Emergent Playground
 * @file MyCA.jsx
 * @overview This file defines the MyCA component, which renders the user's personal posts page. 
 * It uses the PostListing component to display the user's posts in a paginated format. 
 * @authors Kevin Schultz
 * @exports MyCA
 */

// Custom Component Imports
import PostListing from "../components/PostListing";

/**
 * @description A functional component that renders the Community page.
 *
 * @returns {JSX.Element} The Community component.
 */
function MyCA() {
  return <PostListing title="My Posts" sorting={1} />;
}

export default MyCA;
