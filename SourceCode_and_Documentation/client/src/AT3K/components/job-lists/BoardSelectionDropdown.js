import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from '../dropdowns';

const BoardSelectionDropdown = ({ selectedBoardID, handleSelectBoard, boards }) => {
    return (
        <Dropdown 
            label="SelectedBoard"
            value={selectedBoardID}
            onChange={handleSelectBoard}
            items={boards && boards.map((eachBoard) => ({
                text: eachBoard.name,
                value: eachBoard._id
            }))}
        />
    )
};

export default BoardSelectionDropdown;
