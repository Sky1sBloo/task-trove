import { ListData } from './types/TaskData';
import './styles/PropertiesPanel.css';


interface PropertiesPanelProps {
	lists: ListData[];
}
const PropertiesPanel = ({lists}: PropertiesPanelProps) => {
	return (
		<div id="properties-panel">
			<form>
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
		</div>
	);
}

export default PropertiesPanel;
