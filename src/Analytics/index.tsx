import {
	PieChart,
	Pie,
	Cell,
	Tooltip,
	ResponsiveContainer,
	Legend,
} from "recharts";
import { Board } from "../data/board";

const Analytics = () => {
	const data = Object.entries(Board).map(([key, column]) => ({
		name: column.name,
		value: column.items.length,
		key,
	}));

	const totalTasks = data.reduce((sum, item) => sum + item.value, 0);

	const colors = ["#fb923c", "#60a5fa", "#34d399", "#f87171", "#a78bfa"];

	return (
		<div className="w-full min-h-screen bg-black text-white px-6 py-8">
			<h1 className="text-2xl font-bold text-orange-400 mb-2">
				Analytics
			</h1>

			<p className="text-zinc-400 mb-8">
				Task distribution across board columns.
			</p>

			<div className="grid md:grid-cols-2 grid-cols-1 gap-6">
				<div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6">
					<h2 className="text-lg font-semibold mb-4">
						Task Status Overview
					</h2>

					<div className="w-full h-[350px]">
						<ResponsiveContainer width="100%" height="100%">
							<PieChart>
								<Pie
									data={data}
									dataKey="value"
									nameKey="name"
									cx="50%"
									cy="50%"
									outerRadius={110}
									label
								>
									{data.map((_, index) => (
										<Cell
											key={`cell-${index}`}
											fill={colors[index % colors.length]}
										/>
									))}
								</Pie>
								<Tooltip
									contentStyle={{
										backgroundColor: "#18181b",
										border: "1px solid #3f3f46",
										color: "#fff",
									}}
								/>
								<Legend />
							</PieChart>
						</ResponsiveContainer>
					</div>
				</div>

				<div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6">
					<h2 className="text-lg font-semibold mb-4">Summary</h2>

					<div className="space-y-4">
						<div className="bg-zinc-800 rounded-lg p-4">
							<p className="text-zinc-400 text-sm">Total Tasks</p>
							<p className="text-3xl font-bold text-orange-400">
								{totalTasks}
							</p>
						</div>

						{data.map((item, index) => (
							<div
								key={item.key}
								className="flex items-center justify-between bg-zinc-800 rounded-lg p-4"
							>
								<div className="flex items-center gap-3">
									<div
										className="w-3 h-3 rounded-full"
										style={{ backgroundColor: colors[index % colors.length] }}
									></div>
									<span>{item.name}</span>
								</div>

								<span className="font-semibold">{item.value}</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Analytics;