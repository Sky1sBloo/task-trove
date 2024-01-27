import { useState } from 'react';
import './styles/ColorSelect.css';

// Custom select made for colors
interface ColorSelectProps {
	colors: string[];  // Must be a valid html color
	onColorSelect: (color: string) => void;
}
const ColorSelect = ({colors, onColorSelect}: ColorSelectProps) => {
	const [color, setColor] = useState<string>(colors[0]);
	const [displaySelection, setDisplaySelection] = useState<boolean>(false);
	return (
		<div className="color-select" >
			<button type="button" 
				className="selector" 
				style={{backgroundColor: color}} 
				onClick={() => setDisplaySelection(!displaySelection) }/>
			{ displaySelection && colors.map((value: string, index: number ) => 
				<button type="button"
				className="color-select-item" 
				key={index}
				style={{backgroundColor: value}}
				onClick={() => {
					setColor(value);
					onColorSelect(value);
					setDisplaySelection(false);
				}}/>
			)}
		</div>
	);
}

export default ColorSelect;
