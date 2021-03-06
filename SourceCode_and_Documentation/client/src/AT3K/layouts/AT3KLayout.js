import React from 'react';

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
