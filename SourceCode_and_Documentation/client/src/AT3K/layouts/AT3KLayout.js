import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import {
    Button
} from '@material-ui/core';

/**
 * Foundational layout structure for displaying page content 
 */
const AT3KLayout = ({ children }) => {

    return (
        <div>
            <Button color="primary">Test</Button>
            <main>
                {children}
            </main>
        </div>
    );
};

export default AT3KLayout;
