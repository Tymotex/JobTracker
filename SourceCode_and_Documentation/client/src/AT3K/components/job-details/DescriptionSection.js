import React from 'react';
import { JobMap } from '../job-map';
import styles from './DescriptionSection.module.scss';

const DescriptionSection = (props) => {
	const sectionStyles = {
		padding: '5px 0px'
	};
	const textStyle = {
		lineHeight: '1.7'
	};
	return (
		<p style={sectionStyles}>
			<h2>{props.title}</h2>
			<p style={textStyle}>
				{props.children}
			</p>
		</p>
	);
}

export default DescriptionSection;