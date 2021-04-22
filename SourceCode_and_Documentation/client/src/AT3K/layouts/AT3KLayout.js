import React from 'react';
import { Toaster } from 'react-hot-toast';

/**
 * Foundational layout structure for displaying page content 
 */
const AT3KLayout = ({ children }) => {
    return (
        <main>
            <Toaster />
            {children}
        </main>
    );
};

export default AT3KLayout;
