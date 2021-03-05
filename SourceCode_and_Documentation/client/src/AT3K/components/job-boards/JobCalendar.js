import React, { useState } from 'react';
import Calendar from 'react-calendar';

// Applying the default calendar styles
import 'react-calendar/dist/Calendar.css';

import calendarStyles from './JobCalendar.module.scss';



// Google Calendar API documentation: https://developers.google.com/calendar
// React Calendar component documentation: https://www.npmjs.com/package/react-calendar


// UPDATE: 
// This one may be better: http://jquense.github.io/react-big-calendar/examples/index.html


/*
Thoughts:
- Only push data to the user's Google Calendar. Don't pull anything

*/


const JobCalendar = () => {
    const [value, onChange] = useState(new Date());

    return (
        <div className={calendarStyles.container}>
            <Calendar
                className={calendarStyles.calendar}
                onChange={onChange}
                value={value}
            />
        </div>
    );
};

export default JobCalendar;
