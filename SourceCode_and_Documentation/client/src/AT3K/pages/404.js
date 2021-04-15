import React from 'react';
import Restricted from './Restricted';

const Error404 = ({ unknownPath }) => {
    return (
        <Restricted unknownPath={unknownPath} />
    );
};

export default Error404;

