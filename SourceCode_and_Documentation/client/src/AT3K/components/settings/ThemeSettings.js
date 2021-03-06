import React, { useState } from 'react';
import { SketchPicker } from 'react-color';   // DOCUMENTATION HERE: https://github.com/casesandberg/react-color
import DarkModeSwitch from './DarkModeSwitch';

// TODO: Currently only one aspect of the palette is being change (the primary.main colour)
// Check out AT3K/themes/default.js to see what else can be changed
// Eg. secondary.main colour should also be changeable 

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
        <div>
            Dark mode:
            <DarkModeSwitch />
            <div>
                Set primary colour:
                <SketchPicker
                    color={primary}
                    onChangeComplete={getColourHex}
                />
            </div>
        </div>
    );
};

export default ThemeSettings;
