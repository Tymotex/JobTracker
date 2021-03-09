import React from 'react';
import { JobMap } from '../job-map';
import styles from './DescriptionSection.module.scss';

const DescriptionSection = (props) => {
	return (
		<p>
			<h3>{props.title}</h3>
			<p>
				{props.content}
			</p>
		</p>
	);
}

export default DescriptionSection;