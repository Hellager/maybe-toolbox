import {
    createBrowserRouter
} from "react-router";
import { Home } from "../pages/Home"
import { JiugongSolver } from "../pages/JiugongSolver/JiugongSolver"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/jiugongge",
        element: <JiugongSolver />,
    },
]);

export default router;
