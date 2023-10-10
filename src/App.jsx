//Components
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/layout";
//Pages
import Races from "./pages/races";
import Race, {loader as raceLoader} from "./pages/race";
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
      },
      {
        path: "races/:raceName",
        loader: raceLoader,
        element: <Race />
      }
    ]
  },

])
export default function App() {

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
