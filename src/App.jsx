//Components
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout, {loader as layoutLoader} from "./pages/layout";
//Pages
import AdminLogin, {loader as adminLoader} from "./pages/login";
import AdminDashboard, {loader as adminDashboardLoader} from "./pages/adminDashboard";
import Race, { loader as raceLoader } from "./pages/race";
import Races, { loader as racesLoader } from "./pages/races";
import Register, {loader as registerLoader} from "./pages/register";
//Styles
import "./App.css"


const router = createBrowserRouter([
  {
    path: "/",
    loader: layoutLoader,
    element: <Layout />,
    children: [
      {
        path: "/races/",
        loader: racesLoader,
        element: <Races />
      },
      {
        path: "/races/adminLogin/",
        loader: adminLoader,
        element: <AdminLogin />
      },
      {
        path: "/races/adminDashboard/",
        loader: adminDashboardLoader,
        element: <AdminDashboard />
      },
      {
        path: "races/:raceName",
        loader: raceLoader,
        element: <Race />
      },
      {
        path: "races/:raceName/register",
        loader: registerLoader,
        element: <Register />
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
