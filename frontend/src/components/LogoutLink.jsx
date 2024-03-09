/**
 * @project Emergent Playground
 * @file LogoutLink.jsx
 * @overview This component creates a link to logout the current user.
 * @authors Kevin Schultz
 * @exports LogoutLink
 */

// React Imports
import { useContext } from 'react';

// Material-UI Imports
import Link from '@mui/material/Link';

// Custom Imports
import P5PropertiesContext from './P5PropertiesContext';
import backendRequester from './BackendRequester';

/**
 * @description`LogoutLink` is a functional component that logs out the current user.
 *
 * @returns {JSX.Element} The LogoutLink component.
 */
export default function LogoutLink() {
    const { setUsername } = useContext(P5PropertiesContext);

    return (
        <>
            <Link
                onClick={async () => {


                    const response = await backendRequester.logout();

                    console.log("response: ", response);

                    setUsername(undefined);
                }}
            >
                LOGOUT
            </Link>
        </>
    );
}
