import { createBrowserRouter} from "react-router-dom"
import { DashboardPage } from "../pages/DashboardPage"
import { ContactsPage } from "../pages/ContactsPage"
import { AppLayout } from "../layouts/AppLayout"

export const router = createBrowserRouter([
    
    {path:"/", element:<AppLayout/>,children: [
       
        {index:true, element:<DashboardPage/>},
        {path:"/contacts", element:<ContactsPage />}
    ]},
])
