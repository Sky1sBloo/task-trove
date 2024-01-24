import { useLayoutEffect, useState, useCallback} from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import axios, { AxiosError, AxiosResponse } from 'axios';
import ListsPanel from './ListsPanel';
import TasksPanel from './TasksPanel';
import { ListData } from './types/TaskData';
import PropertiesPanel from './PropertiesPanel';
import ListsHandler from './ListsHandler';
import './styles/MainTaskWindow.css';

const MainTaskWindow = () => {
	const [userDataLoaded, setUserDataLoaded] = useState<boolean>(false);
	const [lists, setLists] = useState<ListData[]>([]);
	const listsHandler = new ListsHandler(lists, setLists);
	const navigate: NavigateFunction = useNavigate();
	/**
	 * If axios responds with an unauthorized request, go back to login
	 */	
	const retrieveUserData = useCallback(async () => {
		try {
			const userDataRoute = '/api/user';
		
			// TODO: Add the response of this to the username	
			await axios.get(userDataRoute);
			setUserDataLoaded(true);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const axiosError: AxiosError = error;
				
				if (axiosError.response && axiosError.response.status) {
					switch (axiosError.response.status) {
						case 401:
							navigate('/login', { replace: true });
							return;
					}
				} else {
					console.error(axiosError.message);
				}
			}
		}
	}, [navigate]);

	useLayoutEffect(() => {
		retrieveUserData();
	}, [retrieveUserData]);

	if (!userDataLoaded) {
		return <p>Loading</p>;
	}
	return (
		<div id="main-task-window">
			<ListsPanel listsHandler={listsHandler} /> 
			<TasksPanel 
				title="Today" />
			<PropertiesPanel lists={lists}/>
		</div>
	);
}

export default MainTaskWindow;
