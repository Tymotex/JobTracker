import React from "react";
import ApexCharts from "react-apexcharts";

const StatsLineChartFilled = ({ theme, activityType, activityStats }) => {

    const returnedData = activityStats;
    
    // Ideas:
    // Toggleability to show number of "applications", "resumes", etc.
    
    // Need to change this so it works for any week/month/time period
    // Currently this gets the date for the past 7 days
    if (returnedData) {
        const statDays = Object.keys(returnedData);

        var app_list = [];
        var res_list = [];
        var int_list = [];
        var fin_list = [];
        statDays.forEach(day => {
            console.log(day);
            const appCount = returnedData[day].reduce((appCount, currActivity) => 
                (currActivity === "application") ? appCount + 1 : appCount,
                0 
            );
            const resumeCount = returnedData[day].reduce((appCount, currActivity) => 
                (currActivity === "resume") ? appCount + 1 : appCount,
                0 
            );
            const interviewCount = returnedData[day].reduce((appCount, currActivity) => 
                (currActivity === "interview") ? appCount + 1 : appCount,
                0 
            );
            const finalCount = returnedData[day].reduce((appCount, currActivity) => 
                (currActivity === "final") ? appCount + 1 : appCount,
                0 
            );
            app_list.push(appCount);
            res_list.push(resumeCount);
            int_list.push(interviewCount);
            fin_list.push(finalCount);
        }) 

        // All possible series
        let series = [
            {
                name: "application",
                data: app_list,
            },
            {
                name: "resume",
                data: res_list,
            },
            {
                name: "interview",
                data: int_list,
            },
            {
                name: "final",
                data: fin_list,
            },
        ];
    
        console.log(series);

        // Setting which activities should be displayed
        series = series.filter(eachSeries => (eachSeries.name === activityType || activityType === "all"));
    
        function themeOptions(theme) {
            return {
                dataLabels: {
                    enabled: true,
                },
                stroke: {
                    curve: "smooth",
                },
                xaxis: {
                    // type: "datetime",
                    categories: statDays,
                },
                tooltip: {
                    x: {
                        format: "dd/MM/yy",
                    },
                },
                colors: [theme.palette.primary.main, theme.palette.success.main, "blue", "red"],
                chart: {
                    toolbar: {
                        show: false,
                    },
                },
                legend: {
                    show: false,
                },
            };
        }
    
    
    
        // Documentation: https://apexcharts.com/docs/options/
        return (
            <ApexCharts
                options={themeOptions(theme)}
                series={series}
                // type="area"
                // yaxis={{
                //     min: 5,
                // }}
                height={350}
            />    
        );    
    } else {
        return (
            <div style={{height: "350px", position: "relative"}}>
                <div style={{margin: "0 auto", top: "50%", position: "absolute", width: "100%"}}>
                    <h2 style={{textAlign: "center"}}>Please select a board!</h2>
                </div>
            </div>
        )
    }
};
    
export default StatsLineChartFilled;
