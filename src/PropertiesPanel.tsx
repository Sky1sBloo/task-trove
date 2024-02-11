import { useState } from 'react';
import { ListData, TagData } from './types/TaskData';
import './styles/PropertiesPanel.css';


interface PropertiesPanelProps {
	tags: TagData[];
	lists: ListData[];
}
const PropertiesPanel = ({tags, lists}: PropertiesPanelProps) => {
	const [currentTags, setCurrentTags] = useState<TagData[]>();  // Tags currently set in this specific task

	return (
		<div id="properties-panel">
			<form className="textboxes">
				<h1>Task</h1>
				<input type="text" className="properties-textbox" name="title" placeholder="Title" />
				<textarea className="properties-textbox" name="description" placeholder="Description" />
			</form>
			<div className="properties-options"> 
				<span>List: </span>
				<select name="lists">
					{ lists.map((list: ListData) => <option key={list.listID}>{list.name}</option>) }
				</select>
			</div>
			<div className="properties-options"> 
				<span>Due Date: </span>
				<input type="date" name="due-date" />
			</div>
			<form className="tag-options">
				<span>Tags: </span>
				<select name="tags">
					{ tags.map((tag: TagData) => <option key={tag.tagID}>{tag.name}</option>) }
				</select>
				<button type="button" name="add-tag">+</button>
				<ul className="tags">
				</ul>
			</form>
		</div>
	);
}

export default PropertiesPanel;
