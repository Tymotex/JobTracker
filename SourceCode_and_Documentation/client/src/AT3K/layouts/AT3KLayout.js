import React from 'react';
import { Toaster } from 'react-hot-toast';
import { ParallaxProvider } from 'react-scroll-parallax';

/**
 * Foundational layout structure for displaying page content 
 */
const AT3KLayout = ({ children }) => {
    return (
        <ParallaxProvider>
            <main>
                <Toaster />
                {children}
            </main>
        </ParallaxProvider>
    );
};

export default AT3KLayout;
