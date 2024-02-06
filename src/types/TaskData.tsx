export interface TagContents {
	tagID: number;
	name: string;
	color: string | null;
}
interface TaskData {
	taskID: number;
	name: string;
	description: string;
	dueDate: string | null;
	listID: number | null;
	tags: TagContents[];
}


export interface ListData {
	listID: number;
	name: string;
}

export interface TagData {
	tagID: number;
	name: string;
	color: string | null;
}

// For calling a put request
export interface UpdateTagData extends Partial<Omit<TagData, 'tagID'>> {
}

export default TaskData;
