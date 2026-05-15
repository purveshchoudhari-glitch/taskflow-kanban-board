import { RouteObject } from "react-router";
import Layout from "../layout";
import Boards from "../pages/Boards";
import Analytics from "../Analytics";

const routes: RouteObject[] = [
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