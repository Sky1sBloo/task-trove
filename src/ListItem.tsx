import { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import { ListData } from './types/TaskData';
import { ListMethods } from './types/TaskMethods';
import './styles/ListItem.css';
/**
 * Component that represents a list for the lists panel
 */
interface ListItemProps {
	listData?: ListData;
	modifyListCallback: (method: ListMethods, listData: Partial<ListData>) => void;
}
const ListItem = ({modifyListCallback, listData}: ListItemProps) => {
	// Modify this state to make it visible on the title
	const [listName, setListName] = useState<string | undefined>(undefined);
	// Use this state for identifying if list was just added by ListsPanel
	const [isTempList, setIsTempList] = useState<boolean>();
	// Only used for input type=text
	const [listNameTextbox, setListNameTextBox] = useState<string>('');

	useEffect(() => {
		setIsTempList(listName == undefined);
	}, [listName]);

	useEffect(() => {
		if (listData) {
			setListName(listData.name)
		} else {
			setListName(undefined);
		}
	}, [listData]); 

	// Converts temporary list to a real lift
	const initializeList = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (listNameTextbox.trim() !== '') {
			modifyListCallback(ListMethods.INSERT, {name: listNameTextbox});
		}
	}

	const deleteList = (event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault();

		if (isTempList) {
			modifyListCallback(ListMethods.DELETE_TEMP, {});
		} else {
			if (listData) {
				modifyListCallback(ListMethods.DELETE, {listID: listData.listID});
			} else {
				console.error('ListID.name doesn\'t exist on deleteList');
			}
		}
	}

	return (
		<form className="list-item" onSubmit={initializeList}>
			{ listName? <p>{listName}</p> : <input type="text" onChange={(event) => setListNameTextBox(event.target.value)}/> }
			<button type="button" className="nav-button" onClick={deleteList}><FaTrash /></button>
		</form>
	);
}

export default ListItem;
