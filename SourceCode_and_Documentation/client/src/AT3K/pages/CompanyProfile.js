import React, { useEffect, useState } from 'react';
import {
    Link, useLocation
} from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import DescriptionSection from '../components/job-details/DescriptionSection';
import Footer from '../components/job-details/Footer'; 
import JobItem from '../components/company-profile/JobItem';

import {
    Grid,
    Button
} from '@material-ui/core';

import {
	ArrowBack as ArrowBackIcon
} from '@material-ui/icons';

import api from '../constants/api';

import styles from './JobDetails.module.scss';
import axios from 'axios';


const recentJobs = [
	{
		title: "title 1",
		location: "Sydney, Australia",
		postTime: "10th Mar 2021"
	},
	{
		title: "title 2",
		location: "Sydney, Australia",
		postTime: "10th Mar 2021"
	},
	{
		title: "title 3",
		location: "Sydney, Australia",
		postTime: "10th Mar 2021"
	},
	{
		title: "title 4",
		location: "Sydney, Australia",
		postTime: "10th Mar 2021"
	},
	{
		title: "title 5",
		location: "Sydney, Australia",
		postTime: "10th Mar 2021"
	},
	{
		title: "title 6",
		location: "Sydney, Australia",
		postTime: "10th Mar 2021"
	},
	{
		title: "title 7",
		location: "Sydney, Australia",
		postTime: "10th Mar 2021"
	},
	{
		title: "title 8",
		location: "Sydney, Australia",
		postTime: "10th Mar 2021"
	},
	{
		title: "title 9",
		location: "Sydney, Australia",
		postTime: "10th Mar 2021"
	},
	{
		title: "title 10",
		location: "Sydney, Australia",
		postTime: "10th Mar 2021"
	}

]


const Header = ({name}) => {
    // const iconSize = "small";
    const btnStyle = {
        margin: '20px 5px'
    };

    const companyIconStyle = {
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        padding: '5px'
    };

    // const tagStyle = {
    //     height: '30px',
    //     margin: '5px'
    // };

	return (
		<Grid container direction="column">
            <Grid item>
                <Link className={styles.iconLabelSet}>
                    <ArrowBackIcon id="back" fontSize="large"/> 
                    <label for="back">Back</label>
                </Link>
            </Grid>

            <Grid item>
                <div className={styles.iconLabelSet}>
					{/*
						Using Logo API
						NOTE: 
							has some conditions  
							required to link 
							<a href="https://clearbit.com">Logos provided by Clearbit</a>
							on pages where this is used
					*/}
                    <img 
						// src={`https://logo.clearbit.com/${name}.com` }
						src="https://th.bing.com/th/id/OIP.zJufwwvIsPoEYwp9lXhizgHaFi?w=158&h=129&c=7&o=5&dpr=2.5&pid=1.7"
						style={companyIconStyle}
						alt={name}
					/>
                    <div>{name}</div>
                </div>
                <div className={styles.mainTitle}>
                    {name}
                </div>
            </Grid>

            <Grid item direction="row">
                <Button style={btnStyle} variant="outlined" color="secondary" size="small" href="">
                    View official Website
                </Button>
                <Button style={btnStyle} variant="outlined" color="secondary" size="small" href="">
                    Save
                </Button>
            </Grid>
        </Grid>
	);
};

const CompanyProfile = () => {
	const [companyDetails, setCompanyDetails] = useState();
	const search = useLocation().search;
	const params = new URLSearchParams(search);
	const company = params.get('company'); // bar
	console.log("==== " + company)
	useEffect(() => {
		axios.get(`${api.BASE_URL}/api/company?company=${company}`)
		.then(response => setCompanyDetails(response.data))
	}, [company])

	return (
		<Layout>

			<Header name={company}/>

			<hr />

			<DescriptionSection title="About">
				{/* It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). */}
				{companyDetails && companyDetails.company_info.company_details}
			</DescriptionSection>

			<DescriptionSection title="Recent Jobs">
				{	companyDetails &&
					companyDetails.jobs.map((job) => (
						<JobItem {...job} />
					))
				}
			</DescriptionSection>

			<hr />

			<Footer type="company"/>
		</Layout>

	);
};

export default CompanyProfile;