import {
	AppsOutline,
	HomeOutline,
	LogOutOutline,
	PieChartOutline,
} from "react-ionicons";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
	const navLinks = [
		{
			title: "Home",
			path: "/",
			icon: (
				<HomeOutline
					color="#d4d4d8"
					width="22px"
					height="22px"
				/>
			),
		},
		{
			title: "Boards",
			path: "/boards",
			icon: (
				<AppsOutline
					color="#d4d4d8"
					width="22px"
					height="22px"
				/>
			),
		},
		{
			title: "Analytics",
			path: "/analytics",
			icon: (
				<PieChartOutline
					color="#d4d4d8"
					width="22px"
					height="22px"
				/>
			),
		},
	];

	return (
		<div className="fixed left-0 top-0 md:w-[230px] w-[60px] overflow-hidden min-h-screen flex flex-col bg-zinc-950 text-white border-r border-zinc-800">
			<div className="w-full flex items-center md:justify-start justify-center md:pl-5 h-[70px] bg-zinc-950">
				<span className="text-orange-400 font-semibold text-2xl md:block hidden">
					Taskflow
				</span>
				<span className="text-orange-400 font-semibold text-2xl md:hidden block">
					T.
				</span>
			</div>

			<div className="w-full h-[calc(100vh-70px)] flex flex-col md:items-start items-center gap-2 bg-zinc-950 py-5 md:px-3 px-3 relative">
				{navLinks.map((link) => {
					return (
						<NavLink
							to={link.path}
							key={link.title}
							className={({ isActive }) =>
								`flex items-center gap-2 w-full rounded-lg px-2 py-3 cursor-pointer transition ${
									isActive
										? "bg-orange-300 text-black"
										: "bg-transparent text-zinc-300 hover:bg-zinc-800 hover:text-white"
								}`
							}
						>
							{link.icon}
							<span className="font-medium text-[15px] md:block hidden">
								{link.title}
							</span>
						</NavLink>
					);
				})}

				<div className="flex absolute bottom-4 items-center md:justify-start justify-center gap-2 md:w-[90%] w-[70%] rounded-lg px-2 py-3 cursor-pointer bg-zinc-800 text-white hover:bg-zinc-700 transition">
					<LogOutOutline
						color="#d4d4d8"
						width="22px"
						height="22px"
					/>
					<span className="font-medium text-[15px] md:block hidden">
						Log Out
					</span>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;