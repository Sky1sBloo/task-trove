import { Dispatch, SetStateAction } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { ListData } from './types/TaskData';

/**
 * Class holding all ListHandling functions
 * Make sure to instantiate this once 
 */
class ListsHandler {
	lists: ListData[];
	setLists: Dispatch<SetStateAction<ListData[]>>;

	// Accepts a useState values
	constructor(lists: ListData[], setLists: Dispatch<SetStateAction<ListData[]>>) {
		this.lists = lists;
		this.setLists = setLists;
	}

	async retrieveListData(): Promise<void> {
		try {
			const listsResponse: AxiosResponse = await axios.get('/api/tasks/lists');
			const lists: ListData[] = listsResponse.data;
			this.setLists(lists);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const axiosError: AxiosError = error;
				console.error(axiosError.message);
			}
		}
	}

	async insertListToDatabase(name: string): Promise<void> {
		await axios.post('/api/tasks/lists', {
			name: name
		});
		this.retrieveListData();
	}

	async deleteListOnDatabase(listID: number): Promise<void> {
		await axios.delete('/api/tasks/lists', {
			data: {
				listID: listID
			}
		});
		this.retrieveListData();
	}
}

export default ListsHandler;
