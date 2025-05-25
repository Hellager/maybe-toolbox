import {
    createBrowserRouter
} from "react-router";
import { Home } from "../pages/Home"
import { ToolDetail } from "../pages/ToolDetail"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/tool/:id",
        element: <ToolDetail />,
    },
]);

export default router;
