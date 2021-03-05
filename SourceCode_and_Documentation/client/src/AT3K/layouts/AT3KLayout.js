import React from 'react';
import { ThemeProvider } from '@material-ui/styles';

/**
 * Foundational layout structure for displaying page content 
 */
const AT3KLayout = ({ children }) => {

    return (
        <div>
            <main>
                {children}
            </main>
        </div>
    );
};

export default AT3KLayout;
