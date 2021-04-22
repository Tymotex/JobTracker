import React from 'react';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import './FullscreenMode.scss';
import { Button } from '@material-ui/core';

const FullscreenMode = ({ children, onFullScreenEnter=() => {}, onFullScreenExit=() => {} }) => {
	const fullscreen = useFullScreenHandle();

	if (fullscreen.active) {
		onFullScreenEnter();
	} else {
		onFullScreenExit();
	}

	return (
		<div>
			<FullScreen handle={fullscreen}>
				<div className={"fullscreen-button-group"}>
					{fullscreen.active ? (
						<Button color="primary" variant="contained" onClick={fullscreen.exit}>
							<FullscreenExitIcon />
						</Button>
					) : (
						<Button color="primary" variant="contained" onClick={fullscreen.enter}>
							<FullscreenIcon />
						</Button>
					)}
				</div>
				<div className={`full-screenable-node fullscreen-enabled`}>
					{children}
				</div>
			</FullScreen>
		</div>
	);
};

export default FullscreenMode;
