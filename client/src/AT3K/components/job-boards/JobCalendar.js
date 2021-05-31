import moment from 'moment';
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import calendarStyles from './JobCalendar.module.scss';

import FullscreenMode from '../fullscreen/FullscreenMode';

const localizer = momentLocalizer(moment);

const JobCalendar = ({ trackedJobs }) => {
    let events = [];
    trackedJobs.forEach(job => {
        return job.events.forEach(event => {
            events = [...events, {
                title: `${event.name} | ${job.title}`,
                start: new Date(event.time * 1000),
                end: new Date(event.time * 1000)
            }];
        });
    });
    return (
        <FullscreenMode>
            <div className={calendarStyles.container}>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                />
            </div>
        </FullscreenMode>
    );
};

export default JobCalendar;
