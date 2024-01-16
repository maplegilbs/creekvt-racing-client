//Components
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout, {loader as layoutLoader} from "./pages/layout";
//Pages
import AdminLogin from "./pages/login";
import AdminDashboard, {loader as adminDashboardLoader} from "./pages/adminDashboard";
import Race, { loader as raceLoader } from "./pages/race";
import Races, { loader as racesLoader } from "./pages/races";
import Register, {loader as registerLoader} from "./pages/register";
import ErrorElement from "./components/error"
import RootErrorElement from "./components/errorRoot";
//Styles
import "./App.css"


const router = createBrowserRouter([
  {
    path: "/",
    loader: layoutLoader,
    element: <Layout />,
    errorElement: <RootErrorElement />,
    children: [
      {
        path: "/races/",
        loader: racesLoader,
        element: <Races />,
        errorElement: <ErrorElement />
      },
      {
        path: "/races/adminLogin/",
        element: <AdminLogin />,
        errorElement: <ErrorElement />
      },
      {
        path: "/races/adminDashboard/",
        loader: adminDashboardLoader,
        element: <AdminDashboard />,
        errorElement: <ErrorElement />
      },
      {
        path: "races/:raceName",
        loader: raceLoader,
        element: <Race />,
        errorElement: <ErrorElement />
      },
      {
        path: "races/:raceName/register",
        loader: registerLoader,
        element: <Register />,
        errorElement: <ErrorElement />
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
