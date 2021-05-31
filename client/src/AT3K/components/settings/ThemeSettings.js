import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import DarkModeSwitch from './DarkModeSwitch';
import styles from './ThemeSettings.module.scss';

// TODO: changes are not persistent. Either use js-cookies or 
// the web browser's localStorage API 

const ThemeSettings = ({ replaceTheme, currTheme }) => {
    const [primary, setPrimary] = useState(currTheme ? currTheme.palette.primary.main : "#333333");
    
    const getColourHex = (colour) => {
        setPrimary(colour.hex);
        const newTheme = {...currTheme};
        newTheme.palette.primary.main = colour.hex;
        replaceTheme(newTheme);
    };

    return ( 
        <div className={styles.container}>
            <h4>Dark mode</h4>
            <DarkModeSwitch />
            <div>
                <h4>Choose Primary Colour</h4>
                <SketchPicker
                    className={styles.themeSelector}
                    color={primary}
                    onChangeComplete={getColourHex}
                />
            </div>
            <Button variant="contained" color="primary">
                High contrast
            </Button>
            <Button variant="contained" color="primary">
                Colourblind
            </Button>
        </div>
    );
};

export default ThemeSettings;
