import { useState, useEffect, useCallback } from 'react';
import TaskData  from './types/TaskData';
import SearchBox from './SearchBox';
import Task from './Task';
import axios, { AxiosResponse, AxiosError } from 'axios';
import './styles/TasksPanel.css';

interface TasksPanelProps {
	title: string;
}
const TasksPanel = ({title}: TasksPanelProps) => {
	const [tasks, setTasks] = useState<TaskData[]>([]);
	const [searchQuery, setSearchQuery] = useState<string | null>(null);

	const retrieveTasks = useCallback(async() => {
		try {
			let retrieveRoute = '/api/tasks';
			if (searchQuery) {
				retrieveRoute += "?search=" + searchQuery;
			}
			const tasksResponse: AxiosResponse = await axios.get(retrieveRoute);
			const tasks: TaskData[] = tasksResponse.data;
			setTasks(tasks);

		} catch (error) {
			if (axios.isAxiosError(error)) {
				const axiosError: AxiosError = error;

				console.error(axiosError.message);
			}
		}
	}, [searchQuery]);

	const deleteTask = (taskID: number) => {
		axios.delete('/api/tasks', {
			data: {
				taskID: taskID.toString()
			}
		}).then(() => {
			retrieveTasks();
		});
	}

	useEffect(() => {
		retrieveTasks();
	}, [retrieveTasks]);

	return (
		<div id="tasks-panel">
			<h1>{title}</h1>
				<SearchBox searchCallback={setSearchQuery}/>
			<hr id="task-divider"/>
			{ tasks.map( (task: TaskData) => <Task key={task.taskID} {...task} deleteTaskCallback={deleteTask} />) }
		</div>
	);
}

export default TasksPanel;
