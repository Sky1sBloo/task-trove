import { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import { TagData } from './types/TaskData';
import { TagMethods } from './types/TaskMethods';
import TagColors from './types/TagColors';

interface TagItemProps {
	modifyTagCallback: (method: TagMethods, tagData?: Partial<TagData>) => void;
	tagData?: TagData;
}
const TagItem = ({modifyTagCallback, tagData}: TagItemProps) => {
	const [tagName, setTagName] = useState<string | undefined>(undefined);
	const [tagColor,setTagColor] = useState<TagColors>(TagColors.LIGHT_GRAY);
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

	useEffect(() => {
		if (!isTempTag && tagData) {
			setTagName(tagData.name);
		}
		setTagName(undefined);
	}, [isTempTag, tagData]);

	useEffect(() => {
		setIsTempTag(tagData != undefined);
	}, [tagData]);
	return (
		<form className="tag-item" onSubmit={initializeTag}>
			{ tagName ? <p>{tagName}</p> :
				<input type="text" onChange={(event) => setTagNameTextbox(event.target.value)} /> }
			<select>
				{ tagColors.map((color: string) => 
					<option className="tag-color" style={{backgroundColor: color}} value={color}/>
				)}
			</select>
			<button type="button" ><FaTrash /></button>
		</form>
	);
}

export default TagItem;
