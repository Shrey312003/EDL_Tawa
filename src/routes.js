import { useRoutes } from "react-router-dom";
import Home from "./pages/Home";
import Profiles from "./pages/Profiles";
import Create from "./pages/Create";
import Comm from "./pages/Comm";

const routes = () => [
    {
        path: '/',
        element: <Home/>,
    },
    {
        path: '/profile',
        element: <Profiles/>
    },
    {
        path: '/create',
        element: <Create/>
    },
    {
        path:'/comm',
        element: <Comm/>
    }
    
];

function AppRoutes() {
    let app_routes = useRoutes(routes());
    return app_routes;
}

export default AppRoutes;