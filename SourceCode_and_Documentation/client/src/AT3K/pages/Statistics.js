import { Grid } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import React from "react";
import {
	ResponsiveContainer
} from "recharts";
import {
	StatsHeatMap, StatsLineChart,
	StatsLineChartFilled,
	StatsPieChart
} from '../../AT3K/components/statistics';
import Layout from '../../components/Layout/Layout';
import Widget from "../../components/Widget/Widget";
import { DropdownHierarchical } from "../components/dropdowns";
import pageStyles from './Page.module.scss';

const currentProgress = [
    { name: "No Application", value: 20 },
    { name: "Resume Sent", value: 10 },
    { name: "Interview Stage", value: 4 },
    { name: "Finalised", value: 2 },
];

const overallStats = [
    { name: "Resume hit", value: 20 },
    { name: "Resume miss", value: 10 },
];

export default function Charts(props) {

    var theme = useTheme();

    const timeRangeOptions = [ 
        { 
            label: "Weekly", 
            options: [
                {
                    name: "This week", 
                    value: 1
                },
                {
                    name: "Last week",
                    value: 2
                }
            ] 
        },
        {
            label: "Monthly",
            options: [
                {
                    name: "This month",
                    value: 3,
                },
                {
                    name: "Last month",
                    value: 4,
                },
            ]
        }
    ];

    const outcomeOptions = [
        {
            label: "Resume",
            options: [
                {
                    name: "Resume Hits vs. Misses",
                    value: 1
                }
            ]
        },
        {
            label: "Interview",
            options: [
                {
                    name: "Interview: Success vs. Failure",
                    value: 2
                }
            ]
        },
    ]

    return (
        <Layout>
            <div className={pageStyles.container}>
                <h1>Job Statistics</h1>
                <DropdownHierarchical options={timeRangeOptions}/>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={12}>
                        <Widget title="Your activity the past week" upperTitle noBodyPadding>
                            <ResponsiveContainer width="100%" height={400}>
                                <StatsLineChartFilled theme={theme} />
                            </ResponsiveContainer>
                        </Widget>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Widget title="Number of applications made" upperTitle noBodyPadding>
                            <ResponsiveContainer width="100%" height={400}>
                                <StatsHeatMap />
                            </ResponsiveContainer>
                        </Widget>
                    </Grid>
                    {/* <Grid item xs={12} md={8}>
                        <Widget title="" noBodyPadding upperTitle>
                            <ResponsiveContainer width="100%" height={350}>
                                <StatsLineChart theme={theme} />
                            </ResponsiveContainer>
                        </Widget>
                    </Grid> */}
                    <Grid item xs={12} md={6}>
                        <Widget title="Visualising where you are" noBodyPadding upperTitle>
                            <ResponsiveContainer width="100%" height={300}>
                                <StatsPieChart 
                                    theme={theme} 
                                    pieChartData={currentProgress}
                                />
                            </ResponsiveContainer>
                        </Widget>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <DropdownHierarchical 
                            options={outcomeOptions}
                        />
                        <Widget title="Visualising your overall outcomes" noBodyPadding upperTitle>
                            <ResponsiveContainer width="100%" height={300}>
                                <StatsPieChart 
                                    theme={theme} 
                                    pieChartData={overallStats}
                                />
                            </ResponsiveContainer>
                        </Widget>
                    </Grid>
                </Grid>
            </div>
        </Layout>
    );
}

