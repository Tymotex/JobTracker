import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';

export default function SimpleAccordion({ text, children }) {
    return (
        <div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>
                        {text}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {children}
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
