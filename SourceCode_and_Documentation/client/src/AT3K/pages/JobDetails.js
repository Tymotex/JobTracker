import {
    Button, Grid
} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import {
    ArrowBack as ArrowBackIcon,
    AttachMoney as AttachMoneyIcon, CalendarToday as CalendarTodayIcon,
    EventBusy as EventBusyIcon,
    Label as LabelIcon, Link as LinkIcon, List as ListIcon, Schedule as ScheduleIcon
} from '@material-ui/icons';
import React from 'react';
import {
    Link
} from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import { JobDetailField } from '../components/job-details';
import DescriptionSection from '../components/job-details/DescriptionSection';
import Footer from '../components/job-details/Footer';
import { JobMap } from '../components/job-map';
import styles from './JobDetails.module.scss';


const jobDetailFields = [
    {
        label: "Posted on",
        value: "9th March, 2021",
        icon: CalendarTodayIcon
    }, 
    {
        label: "Deadline",
        value: "Tomorrow",
        icon: EventBusyIcon
    },
    {
        label: "Salary",
        value: "$12000",
        icon: AttachMoneyIcon
    },
    {
        label: "Type",
        value: "Full time",
        icon: ScheduleIcon
    },
    {
        label: "Category",
        value: "Computer Science",
        icon: ListIcon,
        link: "https://www.google.com",
    },
    {
        value: "Official Website",
        icon: LinkIcon,
        link: "https://www.google.com"
    }
];

const tags = [
    "Tag 1",
    "Tag 2",
    "Tag 3",
    "Tag 4",
    "Tag short",
    "Tag long long one",
    "Tag hsdfdsjfsdfdsfweufndnfndsi"
]

const Header = () => {
    const iconSize = "small";
    const btnStyle = {
        margin: '20px 5px'
    };

    const companyIconStyle = {
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        padding: '5px'
    };

    const tagStyle = {
        height: '30px',
        margin: '5px'
    };

    return (
        <Grid container justify="space-between">
            <Grid item xs={7}>
                <Grid container direction="column">
                    <Grid item>
                        <Link className={styles.iconLabelSet}>
                            <ArrowBackIcon id="back" fontSize="large"/> 
                            <label for="back">Back </label>
                        </Link>
                    </Grid>

                    <Grid item>
                        <div className={styles.iconLabelSet}>
                            <img 
                                src="https://th.bing.com/th/id/OIP.zJufwwvIsPoEYwp9lXhizgHaFi?w=158&h=129&c=7&o=5&dpr=2.5&pid=1.7" 
                                style={companyIconStyle}
                                alt="company icon"
                            />
                            <a href="/search/company">Whatever company</a>
                        </div>
                        <div className={styles.mainTitle}>
                            Nulla sit amet ante a tellus elementum vulputate ut ac ante donec eu nunc aliquet arcu cursus posuere
                        </div>
                    </Grid>

                    <Grid item direction="row">
                        <Button style={btnStyle} variant="outlined" color="secondary" size="small" href="">
                            View official post
                        </Button>
                        <Button style={btnStyle} variant="outlined" color="secondary" size="small" href="">
                            Save
                        </Button>
                    </Grid>
                    <Grid item direction="row">
                        {tags.map(tag => (
                            <Chip
                                avatar={<Avatar><LabelIcon /></Avatar>}
                                label={tag}
                                clickable
                                color="primary"
                                style={tagStyle}
                            />
                        ))}
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={3}>
                <Grid container direction="column" style={{paddingTop: '60px'}}>

                    {jobDetailFields.map((eachField) => (
                        <Grid item>
                            <JobDetailField {...eachField}>
                                <eachField.icon fontSize={iconSize} />
                            </JobDetailField>
                        </Grid>
                    ))}

                    <Grid item>
                        <Button style={btnStyle} variant="outlined" color="primary" size="large">
                            Apply for this job
                        </Button>
                    </Grid>

                </Grid>
            </Grid>
        </Grid>

    );
}



const JobDetails = () => {
    return (
        <Layout>
            <Header />

            <hr />
            
            <DescriptionSection title="Description">
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
            </DescriptionSection>

            <DescriptionSection title="Location">
                <JobMap locationQuery={"UNSW"} />  {/* Substitute this for actual location query */}
            </DescriptionSection>

            <DescriptionSection title="Requirements">
                There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. 
                <ul>
                    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                    <li>Nullam fringilla velit vitae odio pulvinar ultricies.</li>
                    <li>Fusce rhoncus nunc non ante posuere, eu laoreet ipsum ultricies.</li>
                </ul>

                <ul>
                    <li>Sed ac est a elit mattis sagittis et quis orci.</li>
                    <li>Donec eu nunc aliquet arcu cursus posuere.</li>
                </ul>
                <ul>
                    <li>Integer id velit egestas, blandit felis vel, porttitor mi.</li>
                    <li>Nulla sit amet ante a tellus elementum vulputate ut ac ante.</li>
                    <li>Nunc ut nulla vel urna molestie facilisis iaculis ac odio.</li>
                    <li>Phasellus nec erat nec nibh elementum bibendum.</li>
                    <li>Fusce in arcu eget nibh eleifend egestas non nec enim.</li>
                </ul>
            </DescriptionSection>

            <DescriptionSection title="Missing Skills">
                    <ul>
                        <li>Integer id velit egestas, blandit felis vel, porttitor mi.</li>
                        <li>Nulla sit amet ante a tellus elementum vulputate ut ac ante.</li>
                        <li>Nunc ut nulla vel urna molestie facilisis iaculis ac odio.</li>
                        <li>Phasellus nec erat nec nibh elementum bibendum.</li>
                        <li>Fusce in arcu eget nibh eleifend egestas non nec enim.</li>
                    </ul>
            </DescriptionSection>

            <DescriptionSection title="Resource Recommendations">
                <ul>
                    <li>Sed ac est a elit mattis sagittis et quis orci.</li>
                    <li>Donec eu nunc aliquet arcu cursus posuere.</li>
                </ul>
                <ul>
                    <li>Integer id velit egestas, blandit felis vel, porttitor mi.</li>
                    <li>Nulla sit amet ante a tellus elementum vulputate ut ac ante.</li>
                    <li>Nunc ut nulla vel urna molestie facilisis iaculis ac odio.</li>
                    <li>Phasellus nec erat nec nibh elementum bibendum.</li>
                    <li>Fusce in arcu eget nibh eleifend egestas non nec enim.</li>
                </ul>
            </DescriptionSection>

            <hr />

            <Footer type="job"/>
            
        </Layout>
    );
};

export default JobDetails;
