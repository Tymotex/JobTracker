import React from 'react';
import { Toaster } from 'react-hot-toast';

/**
 * Foundational layout structure for displaying page content 
 */
const AT3KLayout = ({ children }) => {
    return (
        <div>
            <main>
                <Toaster />
                {children}
            </main>
        </div>
    );
};

export default AT3KLayout;
