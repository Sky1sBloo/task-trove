import { useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { FaCaretRight } from 'react-icons/fa';

import './styles/SearchBox.css';
/**
 * Styled searchbox with search icon and submit button
 */
interface SearchBoxProps {
	searchCallback: (searchQuery: string) => void;
}
const SearchBox = ({searchCallback}: SearchBoxProps) => {
	const [searchQuery, setSearchQuery] = useState<string>('');
	const onSearchBoxSubmitEvent = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		searchCallback(searchQuery);
	}
	return (
		<form className="search-box" onSubmit={onSearchBoxSubmitEvent}>
			<IoSearch className="search-icon" />
			<input className="search-field" 
				type="text" 
				placeholder="Search" 
				onChange={(event) => setSearchQuery(event.target.value)}/>
			<button type="submit" className="search-button" >
				<FaCaretRight className="submit-icon"/>
			</button>
		</form>
	);
}

export default SearchBox;
