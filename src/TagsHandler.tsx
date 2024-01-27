import { Dispatch, SetStateAction } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { TagData } from './types/TaskData';

/**
 * Class containing all tag handling functions
 * Ensure to instantiate only once
 */
class TagsHandler {
	tags: TagData[];
	setTags: Dispatch<SetStateAction<TagData[]>>;

	constructor(tags: TagData[], setTags: Dispatch<SetStateAction<TagData[]>>) {
		this.tags = tags;
		this.setTags = setTags;
	}

	async retrieveListData(): Promise<void> {
		try {
		}
	}

	async insertTagToDatabse(name: string, color: string): Promise<void> {
		await axios.post('/api/tasks/tags', {
			name: name,
			color: color
		});
		
	}
}

export default TagsHandler;
