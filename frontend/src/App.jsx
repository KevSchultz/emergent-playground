/**
 * @file App.jsx is the root component of the React frontend.
 * This component is responsible for the client side routing meaning that it will render the correct component corresponding to pages based on the URL.
 * It also sets the material ui theme for the entire app.
 * @author Kevin Schultz
 * @project Emergent Playground
 */

// material ui imports
import { ThemeProvider } from '@mui/material/styles/';
import { theme } from './theme';
import CssBaseline from '@mui/material/CssBaseline';


// react router imports
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';

// custom page component imports
import ViewerBuilderCreator from './pages/ViewerBuilderCreator';
import Welcome from './pages/Welcome';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Community from './pages/Community';
import { P5PropertiesProvider } from './components/P5PropertiesContext';

const router = createBrowserRouter([
    {
        path: '/',
        element: <ViewerBuilderCreator />,
    },
    {
        path: 'welcome',
        element: <Welcome />,
    },
    {
        path: 'about',
        element: <About />,
    },
    {
        path: 'login',
        element: <Login />,
    },
    {
        path: 'register',
        element: <Register />,
    },
    {
        path: 'community',
        element: <Community />,
    },
]);

function App() {
    return (
        <ThemeProvider theme={theme}>
            <P5PropertiesProvider>
                <CssBaseline />
                <RouterProvider router={router} />
            </P5PropertiesProvider>
        </ThemeProvider>
    );
}

export default App;
