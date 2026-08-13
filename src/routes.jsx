import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout/layout";
import Home from "./pages/Home";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Search from "./pages/Search";
import ProProfile from "./pages/ProProfile";
import Booking from "./pages/Booking";
import Tracking from "./pages/Tracking";
import Messages from "./pages/Messages";
import Emergency from "./pages/Emergency";
import Assistant from "./pages/Assistant";
import Account from "./pages/Account";
import ProDashboard from "./pages/ProDashboard";
import HowItWorks from "./pages/HowItWorks";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "services", element: <Services /> },
      { path: "services/:slug", element: <ServiceDetail /> },
      { path: "search", element: <Search /> },
      { path: "pro/:uid", element: <ProProfile /> },
      { path: "book", element: <Booking /> },
      { path: "track/:id", element: <Tracking /> },
      { path: "messages", element: <Messages /> },
      { path: "messages/:id", element: <Messages /> },
      { path: "emergency", element: <Emergency /> },
      { path: "assistant", element: <Assistant /> },
      { path: "account", element: <Account /> },
      { path: "account/:tab", element: <Account /> },
      { path: "pro", element: <ProDashboard /> },
      { path: "how-it-works", element: <HowItWorks /> },
      { path: "about", element: <About /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default routes;
