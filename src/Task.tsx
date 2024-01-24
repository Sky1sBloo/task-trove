import { useState } from 'react';
import TaskData, { TagContents } from './types/TaskData';
import { FaTrash } from 'react-icons/fa';
import './styles/Task.css';

/**
 * Component representing a Task object
 */
interface TaskProps extends TaskData{
	deleteTaskCallback: (taskID: number) => void;
}
const Task = ({taskID, name, description, tags, deleteTaskCallback}: TaskProps) => {
	const [isSelected, setIsSelected] = useState<boolean>(false);  // Used for selection purposes 

	const deleteTask = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		deleteTaskCallback(taskID);
	}

	return (
		<div className="task">
			<form onSubmit={ deleteTask }>
				<div>
					<input type="checkbox" name="select-task" onChange={(event) => setIsSelected(event.target.checked)} />
					<span>{name}</span>
				</div>
				<button className="trash-button">{ <FaTrash size={21}/> }</button>
			</form>
			<div className="task-tags">
				{ tags.map((tag: TagContents) => {
					let tagColor: string = "#000000";
					if (tag.color) {
						tagColor = tag.color;
					}

					return (<div className="task-tag" key={tag.tagID}>
						<div className="tag-color" style={{backgroundColor: tagColor}} />
						<span>{tag.name}</span>
						</div>);
				})}
			</div>
			{ isSelected && <p>{description}</p> }
			<hr />
		</div>
	);
}

export default Task;
