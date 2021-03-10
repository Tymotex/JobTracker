import React from 'react';
import { JobMap } from '../job-map';

const DescriptionSection = (props) => {
	const sectionStyles = {
		padding: '5px 0px'
	};
	const textStyle = {
		lineHeight: '1.7'
	};
	const titleStyle = {
		fontSize: '20pt'
	};
	return (
		<p style={sectionStyles}>
			<div style={titleStyle}>{props.title}</div>
			<p style={textStyle}>
				{props.children}
			</p>
		</p>
	);
}

export default DescriptionSection;