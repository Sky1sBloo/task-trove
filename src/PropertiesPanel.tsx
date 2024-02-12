import { useState, useEffect } from 'react';
import { ListData, TagData } from './types/TaskData';
import './styles/PropertiesPanel.css';


interface PropertiesPanelProps {
	tags: TagData[];
	lists: ListData[];
}
const PropertiesPanel = ({tags, lists}: PropertiesPanelProps) => {
	const [currentTags, setCurrentTags] = useState<TagData[]>([]);  // Current tag id of the task

	const [currentSelectedTag, setCurrentSelectedTag] = useState<string>();  // Selected tag for adding in form
	const setNewTag = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (currentSelectedTag && !isNaN(parseInt(currentSelectedTag))) {
			const currentTag: number = parseInt(currentSelectedTag);
			const newTag: TagData | undefined= tags.find((value: TagData) => value.tagID === currentTag);

			if (!newTag) {
				console.error('Tag isn\'t found');
				return;
			}

			setCurrentTags([...currentTags, newTag]);
		}
	}
	
	useEffect(() => {
		if (tags.length > 0) {
			setCurrentSelectedTag(tags[0].tagID.toString());
		}
	}, [tags]);

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
					{ lists.map((list: ListData, idx: number) => 
						<option key={idx}
							value={list.listID}
						>{list.name}</option>) }
				</select>
			</div>
			<div className="properties-options"> 
				<span>Due Date: </span>
				<input type="date" name="due-date" />
			</div>
			<form className="tag-options" onSubmit={setNewTag}>
				<span>Tags: </span>
				{/* Select key must be an integer */ }
				<select name="tags" onChange={(event) => setCurrentSelectedTag(event.target.value)}>
					{ tags.map((tag: TagData, idx: number) => 
						<option 
							key={idx}
							value={tag.tagID}
						>{tag.name}</option>) }
				</select>
				<button type="submit" name="add-tag">+</button>
				<ul className="tags">
					{ currentTags.map((tag: TagData) => <li key={tag.tagID}>{tag.name}</li>) }
				</ul>
			</form>
		</div>
	);
}

export default PropertiesPanel;
