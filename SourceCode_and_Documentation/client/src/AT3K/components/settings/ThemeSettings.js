import React, { useState } from 'react';
import Switch from "react-switch";
import { SketchPicker } from 'react-color';   // DOCUMENTATION HERE: https://github.com/casesandberg/react-color


// TODO: Currently only one aspect of the palette is being change (the primary.main colour)
// Check out AT3K/themes/default.js to see what else can be changed
// Eg. secondary.main colour should also be changeable 

const ThemeSettings = ({ replaceTheme, currTheme }) => {
    const [darkModeActive, toggleDarkMode] = useState(false);
    const [primary, setPrimary] = useState(currTheme ? currTheme.palette.primary.main : "#333333");
    
    const getColourHex = (colour) => {
        setPrimary(colour.hex);
        const newTheme = {...currTheme};
        newTheme.palette.primary.main = colour.hex;
        replaceTheme(newTheme);
    };

    return ( 
        <div>
            <h3>Themes</h3>
            
            <div>
                Dark mode:
                <Switch 
                    onChange={() => toggleDarkMode(!darkModeActive)} 
                    checked={darkModeActive} 
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
