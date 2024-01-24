import { useState, useEffect } from 'react';
import { FaRegCalendar, FaCaretRight, FaAngleDoubleRight } from 'react-icons/fa';
import ListItem from './ListItem';
import { ListData } from './types/TaskData';
import { ListMethods } from './types/TaskMethods';
import ListsHandler from './ListsHandler';
import './styles/ListPanel.css';


/**
 * Panel that shows the available lists and tags shows filters for the tasks
 */
interface ListsPanelProps {
	listsHandler: ListsHandler;
}
const ListsPanel = ({ listsHandler }: ListsPanelProps) => {
	const [tempLists, setTempLists] = useState<number>(0);  // State that sets the number of temporary ListItem 

	/**
	 * Callback function passed on ListItem for it to be modified
	 */
	const modifyList = (method: ListMethods, listData: Partial<ListData>)=> {
		switch (method) {
			case ListMethods.INSERT_TEMP:
				setTempLists(tempLists + 1);
				break;
			case ListMethods.INSERT:
				if (listData.name) {
					setTempLists(tempLists - 1);
					listsHandler.insertListToDatabase(listData.name);
				}
				break;
			case ListMethods.DELETE_TEMP:
				setTempLists(tempLists - 1);
				break;
			case ListMethods.DELETE:
				if (listData.listID) {
					listsHandler.deleteListOnDatabase(listData.listID);
				} else {
					console.error('ListID doesn\'t exist on modifyList');
				}
				break;
		}
	}

	useEffect(() => {
		listsHandler.retrieveListData();
	}, [listsHandler]);


	// Renders all temporary list
	const renderTempLists = () => {
		return ( Array.from({length:tempLists}, (_, i) => 
			<li key={i}>
				<ListItem modifyListCallback={modifyList} />
			</li>));

	}
	return (
		<div id="lists-panel">
			<div id="task-navigation">
				<h3>Tasks</h3>
				<button>{ <FaAngleDoubleRight /> } Upcoming</button>
				<button>{ <FaCaretRight /> } Today </button>
				<button>{ <FaRegCalendar /> } Calendar</button>
			</div>
			<hr />
			<div className="title-and-insert">
				<h3>Lists</h3>
				<button name="AddList" onClick={() => modifyList(ListMethods.INSERT_TEMP, {})}>+</button>
			</div>
			<ul>
				{ listsHandler.lists.map((list: ListData) => 
					<li key={list.listID}>
						<ListItem modifyListCallback={modifyList} listData={list}/>
					</li>) }
				{ renderTempLists() }
			</ul>
			<hr />
			<div className="title-and-insert">
				<h3>Tags</h3>
				<button name="AddTag">+</button>
			</div>
		</div>
	);
}

export default ListsPanel;
