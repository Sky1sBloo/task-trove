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
		try {
			await axios.post('/api/tasks/lists', {
				name: name
			});
		this.retrieveListData();

		} catch (error) {
			console.error(`Cannot insert list to database: ${error}`);
		}
	}

	async deleteListOnDatabase(listID: number): Promise<void> {
		try  {
			await axios.delete('/api/tasks/lists', {
			data: {
				listID: listID
			}
		});
			this.retrieveListData();
		} catch (error) {
			console.error(`Cannot delete list on database: ${error}`);
		}

	}
}

export default ListsHandler;
