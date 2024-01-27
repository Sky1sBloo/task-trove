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

	async retrieveTagData(): Promise<void> {
		try {
			const tagsResponse: AxiosResponse = await axios.get('/api/tasks/tags');
			const tags: TagData[] = tagsResponse.data;
			this.setTags(tags);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const axiosError: AxiosError = error;
				console.error(axiosError.message);
			}
		}
	}

	async insertTagToDatabse(name: string, color?: string | null): Promise<void> {
		try {
			await axios.post('/api/tasks/tags', {
				name: name,
				color: color
			});
			this.retrieveTagData();
		} catch (error) {
			console.error(`Cannot insert tag to database ${error}`);
		}
	}

	async deleteTagOnDatabase(tagID: number): Promise<void> {
		try {
			await axios.delete('/api/tasks/tags', {
				data: {
					tagID: tagID
				}
			});
			this.retrieveTagData();
		} catch (error) {
			console.error(`Cannot delete tag on database ${error}`);
		}
	}
}

export default TagsHandler;
