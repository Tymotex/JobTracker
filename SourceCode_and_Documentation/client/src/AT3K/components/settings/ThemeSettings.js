import React, { useState } from 'react';
import Switch from '@material-ui/core/Switch';
import { SketchPicker } from 'react-color';   // DOCUMENTATION HERE: https://github.com/casesandberg/react-color


// TODO: Currently only one aspect of the palette is being change (the primary.main colour)
// Check out AT3K/themes/default.js to see what else can be changed
// Eg. secondary.main colour should also be changeable 

// TODO: changes are not persistent. Either use js-cookies or 
// the web browser's localStorage API 
import Brightness5Icon from '@material-ui/icons/Brightness5';

const ThemeSettings = ({ replaceTheme, currTheme }) => {
    const [darkModeActive, toggleDarkMode] = useState(true);
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
            <div>
                <Switch 
                    onChange={() => toggleDarkMode(!darkModeActive)} 
                    defaultChecked={darkModeActive} 
                    colour="primary"
                />
            </div>
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
