import {
	ChevronDown,
	PersonCircle,
	SearchOutline,
} from "react-ionicons";

const Navbar = () => {
	return (
		<div className="md:w-[calc(100%-230px)] w-[calc(100%-60px)] fixed flex items-center justify-between pl-2 pr-6 h-[70px] top-0 md:left-[230px] left-[60px] border-b border-slate-300 bg-[#111] text-white">
			<div className="flex items-center gap-3 cursor-pointer">
				<PersonCircle
					color="#fb923c"
					width={"28px"}
					height={"28px"}
				/>
				<span className="text-orange-400 font-semibold md:text-lg text-sm whitespace-nowrap">
					Kanban Board
				</span>
				<ChevronDown
					color="#fb923c"
					width={"16px"}
					height={"16px"}
				/>
			</div>

			<div className="md:w-[800px] w-[130px] bg-zinc-800 rounded-lg px-3 py-[10px] flex items-center gap-2">
				<SearchOutline color={"#999"} />
				<input
					type="text"
					placeholder="Search"
					className="w-full bg-zinc-800 outline-none text-[15px] text-white placeholder:text-zinc-400"
				/>
			</div>
		</div>
	);
};

export default Navbar;