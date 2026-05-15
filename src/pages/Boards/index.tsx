/* eslint-disable @typescript-eslint/no-explicit-any */
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState } from "react";
import { Board } from "../../data/board";
import { Columns } from "../../types";
import { onDragEnd } from "../../helpers/onDragEnd";
import { AddOutline } from "react-ionicons";
import AddModal from "../../components/Modals/AddModal";
import Task from "../../components/Task";

const Home = () => {
	const [columns, setColumns] = useState<Columns>(Board);
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedColumn, setSelectedColumn] = useState("");
	const [editingTask, setEditingTask] = useState<any>(null);  
const [editingColumnId, setEditingColumnId] = useState("");

	const openModal = (columnId: any) => {
	setSelectedColumn(columnId);
	setEditingTask(null);
	setEditingColumnId("");
	setModalOpen(true);
};
    
    const openEditModal = (columnId: any, task: any) => {
	setSelectedColumn(columnId);
	setEditingColumnId(columnId);
	setEditingTask(task);
	setModalOpen(true);
};

	const closeModal = () => {
		setModalOpen(false);
		setEditingTask(null);
	setEditingColumnId("");
	};

	const handleAddTask = (taskData: any) => {
	const newBoard = { ...columns };

	if (editingTask) {
		newBoard[editingColumnId].items = newBoard[editingColumnId].items.map((task: any) =>
			task.id === editingTask.id ? { ...task, ...taskData, id: editingTask.id } : task
		);

		setEditingTask(null);
		setEditingColumnId("");
	} else {
		newBoard[selectedColumn].items.push(taskData);
	}

	setColumns(newBoard);
};

	return (
		<>
			<DragDropContext onDragEnd={(result: any) => onDragEnd(result, columns, setColumns)}>
				<div className="w-full min-h-screen bg-black overflow-x-auto px-5 pb-8">
					<div className="flex items-start gap-5 min-w-max">
						{Object.entries(columns).map(([columnId, column]: any) => (
							<div
								className="w-[290px] flex flex-col gap-0"
								key={columnId}
							>
								<Droppable
									droppableId={columnId}
									key={columnId}
								>
									{(provided: any) => (
										<div
											ref={provided.innerRef}
											{...provided.droppableProps}
											className="flex flex-col w-[290px] gap-3 items-center py-5"
										>
											<div className="flex items-center justify-center py-[10px] w-full bg-zinc-900 rounded-lg shadow-sm text-white font-medium text-[15px] border border-zinc-700">
												{column.name}
											</div>

											{column.items.map((task: any, index: any) => (
												<Draggable
													key={task.id.toString()}
													draggableId={task.id.toString()}
													index={index}
												>
													{(provided: any) => (
														<Task
															provided={provided}
															task={task}
															onClick={() => openEditModal(columnId, task)}
														/>
													)}
												</Draggable>
											))}

											{provided.placeholder}
										</div>
									)}
								</Droppable>

								<div
									onClick={() => openModal(columnId)}
									className="flex cursor-pointer items-center justify-center gap-1 py-[10px] w-full opacity-90 bg-white rounded-lg shadow-sm text-zinc-300 font-medium text-[15px] hover:bg-gray-200"
								>
									<AddOutline color={"#555"} />
									Add Task
								</div>
							</div>
						))}
					</div>
				</div>
			</DragDropContext>

			<AddModal
				isOpen={modalOpen}
				onClose={closeModal}
				setOpen={setModalOpen}
				handleAddTask={handleAddTask}
				editingTask={editingTask}
			/>
		</>
	);
};

export default Home;