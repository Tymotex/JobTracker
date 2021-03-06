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
import { StatisticsSelection } from '../components/statistics';

export default function Charts(props) {

    var theme = useTheme();

    return (
        <Layout>
            <h1>Job Statistics</h1>
			<StatisticsSelection />
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Widget title="Growth in Python Jobs" upperTitle noBodyPadding>
                        <StatsLineChartFilled theme={theme} />
                    </Widget>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Widget title="User Activity" upperTitle noBodyPadding>
                        <StatsHeatMap />
                    </Widget>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Widget title="Growth in Different Software Engineering Jobs" noBodyPadding upperTitle>
                        <ResponsiveContainer width="100%" height={350}>
							<StatsLineChart theme={theme} />
                        </ResponsiveContainer>
                    </Widget>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Widget title="Popular Software Skills" noBodyPadding upperTitle>
                        <ResponsiveContainer width="100%" height={300}>
                            <StatsPieChart theme={theme} />
                        </ResponsiveContainer>
                    </Widget>
                </Grid>
            </Grid>
        </Layout>
    );
}

