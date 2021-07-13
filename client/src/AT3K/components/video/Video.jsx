import React from 'react';
import YouTube from 'react-youtube';

const Video = ({ videoId }) => {
    const opts = {
        height: '390',
        width: '640',
    };
    return <YouTube videoId={videoId} opts={opts} />;
};

export default Video;
