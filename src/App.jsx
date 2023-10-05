//Components
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Layout from "./pages/layout";
//Styles
import "./App.css"


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <div></div>
      }
    ]
  },

])
export default function App() {
  
  return (
    <div>
        <RouterProvider router={router}/>
    </div>
  );
}
