/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { getRandomColors } from "../../helpers/getRandomColors";
import { v4 as uuidv4 } from "uuid";

interface Tag {
	title: string;
	bg: string;
	text: string;
}

interface AddModalProps {
	isOpen: boolean;
	onClose: () => void;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	handleAddTask: (taskData: any) => void;
	editingTask?: any;
}

const AddModal = ({
	isOpen,
	onClose,
	setOpen,
	handleAddTask,
	editingTask,
}: AddModalProps) => {
	const createEmptyTask = () => ({
		id: uuidv4(),
		title: "",
		description: "",
		priority: "",
		deadline: 0,
		image: "",
		alt: "",
		tags: [] as Tag[],
	});

	const [taskData, setTaskData] = useState(createEmptyTask());
	const [tagTitle, setTagTitle] = useState("");

	useEffect(() => {
		if (editingTask) {
			setTaskData(editingTask);
		} else {
			setTaskData(createEmptyTask());
		}
		setTagTitle("");
	}, [editingTask, isOpen]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;

		setTaskData({
			...taskData,
			[name]: name === "deadline" ? Number(value) : value,
		});
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const reader = new FileReader();

			reader.onload = function (e) {
				if (e.target) {
					setTaskData({
						...taskData,
						image: e.target.result as string,
					});
				}
			};

			reader.readAsDataURL(e.target.files[0]);
		}
	};

	const handleAddTag = () => {
		if (tagTitle.trim() !== "") {
			const { bg, text } = getRandomColors();
			const newTag: Tag = {
				title: tagTitle.trim(),
				bg,
				text,
			};

			setTaskData({
				...taskData,
				tags: [...taskData.tags, newTag],
			});

			setTagTitle("");
		}
	};

	const handleRemoveTag = (indexToRemove: number) => {
		setTaskData({
			...taskData,
			tags: taskData.tags.filter((_, index) => index !== indexToRemove),
		});
	};

	const closeModal = () => {
		setOpen(false);
		onClose();
		setTaskData(createEmptyTask());
		setTagTitle("");
	};

	const handleSubmit = () => {
		if (!taskData.title.trim()) {
			alert("Task title is required");
			return;
		}

		handleAddTask(taskData);
		closeModal();
	};

	return (
		<div
			className={`w-screen h-screen place-items-center fixed top-0 left-0 ${
				isOpen ? "grid" : "hidden"
			}`}
		>
			<div
				className="w-full h-full bg-black opacity-80 absolute left-0 top-0 z-20"
				onClick={closeModal}
			></div>

			<div className="md:w-[30vw] w-[90%] bg-zinc-900 text-white rounded-lg shadow-md z-50 flex flex-col items-center gap-3 px-5 py-6 border border-zinc-700">
				<h2 className="w-full text-xl font-semibold text-orange-400 mb-2">
					{editingTask ? "Edit Task" : "Add New Task"}
				</h2>

				<input
					type="text"
					name="title"
					value={taskData.title}
					onChange={handleChange}
					placeholder="Title"
					className="w-full h-12 px-3 outline-none rounded-md bg-zinc-800 border border-zinc-700 text-sm font-medium text-white placeholder:text-zinc-400"
				/>

				<input
					type="text"
					name="description"
					value={taskData.description}
					onChange={handleChange}
					placeholder="Description"
					className="w-full h-12 px-3 outline-none rounded-md bg-zinc-800 border border-zinc-700 text-sm font-medium text-white placeholder:text-zinc-400"
				/>

				<select
					name="priority"
					onChange={handleChange}
					value={taskData.priority}
					className="w-full h-12 px-2 outline-none rounded-md bg-zinc-800 border border-zinc-700 text-sm text-white"
				>
					<option value="">Priority</option>
					<option value="low">Low</option>
					<option value="medium">Medium</option>
					<option value="high">High</option>
				</select>

				<input
					type="number"
					name="deadline"
					value={taskData.deadline}
					onChange={handleChange}
					placeholder="Deadline"
					className="w-full h-12 px-3 outline-none rounded-md bg-zinc-800 border border-zinc-700 text-sm text-white placeholder:text-zinc-400"
				/>

				<input
					type="text"
					value={tagTitle}
					onChange={(e) => setTagTitle(e.target.value)}
					placeholder="Tag Title"
					className="w-full h-12 px-3 outline-none rounded-md bg-zinc-800 border border-zinc-700 text-sm text-white placeholder:text-zinc-400"
				/>

				<button
					className="w-full rounded-md h-9 bg-zinc-700 hover:bg-zinc-600 text-white font-medium"
					onClick={handleAddTag}
				>
					Add Tag
				</button>

				<div className="w-full">
					{taskData.tags.length > 0 && (
						<span className="text-zinc-300">Tags:</span>
					)}

					<div className="flex flex-wrap gap-2 mt-2">
						{taskData.tags.map((tag, index) => (
							<button
								key={index}
								type="button"
								onClick={() => handleRemoveTag(index)}
								className="inline-block px-[10px] py-[2px] text-[13px] font-medium rounded-md"
								style={{ backgroundColor: tag.bg, color: tag.text }}
								title="Click to remove tag"
							>
								{tag.title} ×
							</button>
						))}
					</div>
				</div>

				<div className="w-full flex items-center gap-4 justify-between">
					<input
						type="text"
						name="alt"
						value={taskData.alt}
						onChange={handleChange}
						placeholder="Image Alt"
						className="w-full h-12 px-3 outline-none rounded-md bg-zinc-800 border border-zinc-700 text-sm text-white placeholder:text-zinc-400"
					/>

				</div>

				<button
					className="w-full mt-3 rounded-md h-10 bg-orange-500 hover:bg-orange-600 text-white font-medium"
					onClick={handleSubmit}
				>
					{editingTask ? "Update Task" : "Submit Task"}
				</button>
			</div>
		</div>
	);
};

export default AddModal;