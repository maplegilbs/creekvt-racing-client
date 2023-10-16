//Components
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/layout";
//Pages
import AdminLogin, {loader as adminLoader} from "./pages/login";
import Race, { loader as raceLoader } from "./pages/race";
import Races, { loader as racesLoader } from "./pages/races";
//Styles
import "./App.css"


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/races/",
        loader: racesLoader,
        element: <Races />,
      },
      {
        path: "/races/adminLogin/",
        loader: adminLoader,
        element: <AdminLogin />
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
