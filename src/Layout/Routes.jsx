import { createBrowserRouter } from "react-router-dom";

export const routes=createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
            {
                path:"/",
                element:<Home/>
            },
            {
                
            }
        ]
    }
])
export default routes;