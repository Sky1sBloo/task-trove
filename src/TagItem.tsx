import { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import { TagData } from './types/TaskData';
import { TagMethods } from './types/TaskMethods';
import TagColors from './types/TagColors';
import ColorSelect from './ColorSelect';

import './styles/TagItem.css';

interface TagItemProps {
	modifyTagCallback: (method: TagMethods, tagData?: Partial<TagData>) => void;
	tagData?: TagData;
}
const TagItem = ({modifyTagCallback, tagData}: TagItemProps) => {
	const [tagName, setTagName] = useState<string | undefined>(undefined);
	const [tagColor, setTagColor] = useState<TagColors>(TagColors.LIGHT_GRAY);
	const [isTempTag, setIsTempTag] = useState<boolean>();
	const [tagNameTextbox, setTagNameTextbox] = useState<string>('');

	// For mapping the enum
	const tagColors: string[]  = Object.values(TagColors);

	const initializeTag = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (tagNameTextbox.trim() !== '') {
			modifyTagCallback(TagMethods.INSERT, {name: tagNameTextbox, color: tagColor});
		}
	}

	const deleteTag = (event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault();

		if (isTempTag) {
			modifyTagCallback(TagMethods.DELETE_TEMP);
		} else {
			if (tagData) {
				modifyTagCallback(TagMethods.DELETE, {
					tagID: tagData.tagID
				});
			} else {
				console.error('TagID.name doesn\'t exist on deleteTag');
			}
		}
	}

	useEffect(() => {
		if (tagData) {
			setTagName(tagData.name);
		} else {
			setTagName(undefined);
		}
	}, [tagData]);

	useEffect(() => {
		setIsTempTag(tagData == undefined);
	}, [tagData]);

	return (
		<form className="tag-item" onSubmit={initializeTag}>
			{ tagName ? <p>{tagName}</p> :
				<input type="text" onChange={(event) => setTagNameTextbox(event.target.value)} /> }
			<ColorSelect colors={tagColors} onColorSelect={(color: string) => setTagColor(color as TagColors)}/>
			<button className="nav-button" type="button" 
				onClick={deleteTag} ><FaTrash /></button>
		</form>
	);
}

export default TagItem;
