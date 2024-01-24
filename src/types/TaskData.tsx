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

export default TaskData;
