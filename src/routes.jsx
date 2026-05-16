import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout/layout";
import App from "./App";
import AllServices from "./pages/all-services/service-page";
import Location from "./pages/location";
import Review from "./pages/review";
import Service from "./pages/all-services/service/service";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <App />
            },
            {
                path: "/location",
                element: <Location />
            },
            {
                path: "/services",
                element: <AllServices />
            },
            {
                path: "/services/:serviceId",
                element: <Service />
            },
            {
                path: "/review",
                element: <Review />
            }
        ]
    }
])
export default routes;