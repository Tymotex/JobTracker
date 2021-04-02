import React, { useState } from 'react';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import './FullscreenMode.css';

const FullscreenMode = ({ children }) => {
	const fullscreen = useFullScreenHandle();
	return (
		<div>
			<button onClick={fullscreen.enter}>
				<FullscreenIcon />
			</button>
			<FullScreen handle={fullscreen}>
				<div className={`full-screenable-node fullscreen-enabled`}>
					{children}
				</div>
			</FullScreen>
			{fullscreen && (
				<button onClick={fullscreen.exit}>
					<FullscreenExitIcon />
				</button>
			)}
		</div>
	);
};

export default FullscreenMode;
