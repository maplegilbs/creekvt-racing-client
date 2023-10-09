//Components
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/layout";
//Pages
import Races from "./pages/races";
//Styles
import "./App.css"


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/races",
        element: <Races />
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
