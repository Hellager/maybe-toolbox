import {
    createBrowserRouter
} from "react-router";
import { HomeContent } from "../pages/Home"
import { JiugongSolver } from "../pages/JiugongSolver/JiugongSolver"

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeContent />,
    },
    {
        path: "/jiugongge",
        element: <JiugongSolver />,
    },
]);

export default router;
