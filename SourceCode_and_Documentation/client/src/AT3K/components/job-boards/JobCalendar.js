import moment from 'moment';
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import calendarStyles from './JobCalendar.module.scss';


// Google Calendar API documentation: https://developers.google.com/calendar
// React Calendar component documentation: https://www.npmjs.com/package/react-calendar
// This one may be better: http://jquense.github.io/react-big-calendar/examples/index.html

const localizer = momentLocalizer(moment);

const JobCalendar = () => {
    return (
        <div className={calendarStyles.container}>
            <Calendar
                localizer={localizer}
                events={[]}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
            />
        </div>
    );
};

export default JobCalendar;
