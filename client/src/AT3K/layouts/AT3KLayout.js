import React from 'react';
import { Toaster } from 'react-hot-toast';
import styles from './AT3KLayout.module.scss';

/**
 * Foundational layout structure for displaying page content 
 */
const AT3KLayout = ({ children }) => {
    return (
        <main className={styles.mainContent}>
            <Toaster />
            {children}
        </main>
    );
};

export default AT3KLayout;
