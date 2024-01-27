import { useState, useEffect } from 'react';
import { FaRegCalendar, FaCaretRight, FaAngleDoubleRight } from 'react-icons/fa';
import ListItem from './ListItem';
import TagItem from './TagItem';
import { ListData, TagData } from './types/TaskData';
import { ListMethods, TagMethods } from './types/TaskMethods';
import ListsHandler from './ListsHandler';
import TagsHandler from './TagsHandler';
import './styles/ListPanel.css';


/**
 * Panel that shows the available lists and tags shows filters for the tasks
 */
interface ListsPanelProps {
	listsHandler: ListsHandler;
	tagsHandler: TagsHandler;
}
const ListsPanel = ({ listsHandler, tagsHandler }: ListsPanelProps) => {  
	// State that sets the number of temporary listItem or tagItem
	const [tempLists, setTempLists] = useState<number>(0);
	const [tempTags, setTempTags] = useState<number>(0);

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

	const modifyTag = (method: TagMethods, tagData?: Partial<TagData>) => {
		switch (method) {
			case TagMethods.INSERT_TEMP:
				setTempTags(tempTags + 1);
				break;
			case TagMethods.INSERT:
				if (tagData && tagData.name) {
					tagsHandler.insertTagToDatabse(tagData.name, tagData.color);
				}
				break;
			case TagMethods.DELETE_TEMP:
				setTempTags(tempTags - 1);
				break;
			case TagMethods.DELETE:
				if (tagData && tagData.tagID) {
					tagsHandler.deleteTagOnDatabase(tagData.tagID);
				}
				break;
		}
	}

	useEffect(() => {
		listsHandler.retrieveListData();
		tagsHandler.retrieveTagData();
	}, []);


	// Renders all temporary list
	const renderTempLists = () => {
		return ( Array.from({length:tempLists}, (_, i) => 
			<li key={i}>
				<ListItem modifyListCallback={modifyList} />
			</li>));
	}

	const renderTempTags = () => {
		return ( Array.from({length: tempTags}, (_, i) => 
			<li key={i}>
				<TagItem modifyTagCallback={modifyTag} />
			</li>
		));
	}

	return (
		<div id="lists-panel">
			<div id="task-navigation">
				<h3>Tasks</h3>
				<button className="nav-button">{ <FaAngleDoubleRight /> } Upcoming</button>
				<button className="nav-button">{ <FaCaretRight /> } Today </button>
				<button className="nav-button">{ <FaRegCalendar /> } Calendar</button>
			</div>
			<hr />
			<div className="title-and-insert">
				<h3>Lists</h3>
				<button name="AddList" 
					className="nav-button" 
					onClick={() => modifyList(ListMethods.INSERT_TEMP, {})}>+</button>
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
				<button name="AddTag"
					className="nav-button"
					onClick={() => modifyTag(TagMethods.INSERT_TEMP)}>+</button>
			</div>
			<ul>
				{ tagsHandler.tags.map((tag: TagData) => 
					<li key={tag.tagID}>
						<TagItem modifyTagCallback={modifyTag} tagData={tag} />
					</li>) }
				{ renderTempTags() }
			</ul>
		</div>
	);
}

export default ListsPanel;
