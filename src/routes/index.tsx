import { RouteObject } from "react-router";
import Layout from "../layout";
import Boards from "../pages/Boards";
import Analytics from "../Analytics";
import Login from "../Login"; // ADD THIS

const routes: RouteObject[] = [
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Boards />,
      },
      {
        path: "boards",
        element: <Boards />,
      },
      {
        path: "analytics",
        element: <Analytics />,
      },
    ],
  },
];

export default routes;