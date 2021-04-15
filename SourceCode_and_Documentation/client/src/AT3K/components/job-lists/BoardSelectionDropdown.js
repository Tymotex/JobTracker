import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from '../dropdowns';

const BoardSelectionDropdown = ({ selectedBoardID, handleSelectBoard, boards }) => {
    const items = boards && boards.map((eachBoard) => ({
        text: eachBoard.name,
        value: eachBoard._id
    }))
    if (items) {
        items.push({
            text: "None",
            value: null
        });
    }
    return (
        <Dropdown 
            label="Selected Board"
            value={selectedBoardID}
            onChange={handleSelectBoard}
            items={items}
        />
    )
};

export default BoardSelectionDropdown;
