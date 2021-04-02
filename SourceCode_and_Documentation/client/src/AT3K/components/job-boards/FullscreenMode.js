import React, { useCallback } from 'react';
import { FullScreen, useFullScreenHandle } from "react-full-screen";

const FullscreenMode = ({ children }) => {
	const screen1 = useFullScreenHandle();

	return (
		<div>
			<button onClick={screen1.enter}>
				Fullscreen
			</button>
			<FullScreen handle={screen1}>
				<div className="full-screenable-node">
					{children}
					<button onClick={screen1.exit}>
						Exit
					</button>
				</div>
			</FullScreen>
		</div>
	);
};

export default FullscreenMode;
