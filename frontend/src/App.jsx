/**
 * @file App.jsx is the root component of the React frontend.
 * This component is responsible for the client side routing meaning that it will render the correct component corresponding to pages based on the URL.
 * @author Kevin Schultz
 * @project Emergent Playground
 */

// react router imports
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';

// custom page component imports
import ViewerBuilderCreator from './pages/ViewerBuilderCreator';
import Welcome from './pages/Welcome';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Community from './pages/Community';
import LangPage from './pages/LangPage';

// overriding ViewerBuilderCerator with LangPage for testing purposes
const router = createBrowserRouter([
    {
        path: '/',
        element: <LangPage />,
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
        path: 'signup',
        element: <Signup />,
    },
    {
        path: 'community',
        element: <Community />,
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
