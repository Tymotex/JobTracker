import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import {
    Button
} from '@material-ui/core';

import { createMuiTheme } from '@material-ui/core/styles';
import yellow from '@material-ui/core/colors/blue';

const theme = createMuiTheme({
    palette: {
        type: "dark",
        primary: yellow,
    },
});





/**
 * Foundational layout structure for displaying page content 
 */
const AT3KLayout = ({ children }) => {

    return (
        <ThemeProvider theme={theme}>
            <Button color="primary">Test</Button>
            <main>
                {children}
            </main>
        </ThemeProvider>
    );
};

export default AT3KLayout;
