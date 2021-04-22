import React from "react";

const EmbeddedMap = ({ locationQuery="unsw" }) => {
    return (
        <iframe
            width="100%"
            height="500px"
            title="Google Maps"
            loading="lazy"
            allowfullscreen
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBjeL-5oS9102g1BbWRcmoAB2tx2tY_Au4&q=${locationQuery}`}
        >
        </iframe>
    );
};

export default EmbeddedMap;
