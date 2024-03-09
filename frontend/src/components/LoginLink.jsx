/**
 * @project Emergent Playground
 * @file LoginLink.jsx
 * @overview This component creates a link to the login page or a link to the user's cellular automata posts page.
 * @authors Kevin Schultz
 * @exports LoginLink
 */

// React Imports
import { useContext } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// Material-UI Imports
import Link from '@mui/material/Link';

// Custom Imports
import P5PropertiesContext from './P5PropertiesContext';
import backendRequester from './BackendRequester';

/**
 * @description`LoginLink` is a functional component that displays a link to the login page
 * if the user is not logged in, or a link to the MyCa page if the user is logged in.
 *
 * @returns {JSX.Element} The LoginLink component.
 */
export default function LoginLink() {

    const { username, setUsername } = useContext(P5PropertiesContext);


    const navigate = useNavigate();
    const navigateLogin = useCallback(() => {navigate('/login')}, [navigate]);
    const navigateMyCa = useCallback(() => {navigate('/myca')}, [navigate]);


    useEffect(() => {
        const getUsername = async () => {
            const username = await backendRequester.getUsername();
            console.log("received username: ", username);
            setUsername(username);
        }

        getUsername();
    }, []);

    return (
        <>
            {username == undefined ? (
                <Link onClick={navigateLogin}>LOGIN</Link>
            ) : (
                <Link onClick={navigateMyCa}>{username.toUpperCase()}</Link>
            )}
        </>
    );
}
