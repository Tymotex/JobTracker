import React from "react";
import ApexCharts from "react-apexcharts";
import timeRangeOptions from "../../pages/Statistics";

const returnedData = {
    "29/3/2021": [
        "application",
        "application",
        "application",
        "application",
        "interview",
    ],
    "30/3/2021": [
        "application",
        "application",
        "interview",
    ],
    "31/3/2021": [
        "application",
        "application",
        "application",
        "interview",
    ],
    "2/4/2021": [
        "application",
        "application",
        "application",
        "application",
        "application",
        "application",
        "interview",
    ],
    "3/4/2021": [
        "application",
        "application",
        "application",
        "application",
        "interview",
    ],
    "4/4/2021": [
        "application",
        "interview",
    ],
    "5/4/2021": [
        "application",
        "application",
        "interview",
    ],
    "6/4/2021": [
        "application",
        "application",
        "application",
        "application",
        "interview",
    ],
    "8/4/2021": [
        "application",
        "interview",
    ],
    "9/4/2021": [
        "interview",
    ],
    "10/4/2021": [
        "application",
        "application",
        "application",
        "application",
        "application",
        "application",
        "interview",
    ],
    "11/4/2021": [
        "application",
        "application",
        "application",
        "application",
        "application",
        "interview",
    ],
    "12/4/2021": [
        "application",
        "application",
        "interview",
    ]
};


// Ideas:
// Toggleability to show number of "applications", "resumes", etc.

// Need to change this so it works for any week/month/time period
// Currently this gets the date for the past 7 days
var week_list = [];
for (var count = 6; count >= 0; count--) {
    var days = new Date();
    days.setDate(days.getDate() - count);
    var dd = ("0" + days.getDate()).slice(-2);
    var mm = ("0" + (days.getMonth() + 1)).slice(-2);
    var yyyy = days.getFullYear();
    var new_date = yyyy + "-" + mm + "-" + dd;
    week_list.push(new_date);
}

var tokens;
var day;
var date_string;
var app_list = [];
var res_list = [];
var int_list = [];
var fin_list = [];

for (var date in week_list) {
    date_string = "" + week_list[date];
    tokens = date_string.split("-");
    // Changes string from "yyyy-mm-dd" to "dd/mm/yyyy" and removing leading zeroes
    for (var token = 0; token < tokens.length; token++) {
        var format = "" + tokens[2 - token];
        if (format.startsWith("0", 0)) {
            format = format.substring(1);
        };
        if (token == 0) {
            day = format;
            continue;
        };
        day = day + "/" + format;
    };

    // Count number of each type of activity and push to each activity type list
    if (day in returnedData) {
        var activity_list = returnedData[day];
        var app_count = 0;
        var res_count = 0;
        var int_count = 0;
        var fin_count = 0;
        for (var activity in activity_list) {
            if (activity_list[activity].match("application")) {
                app_count++;
            } else if (activity_list[activity].match("resume")) {
                res_count++;
            } else if (activity_list[activity].match("interview")) {
                int_count++;
            } else {
                fin_count++;
            };
        };
        app_list.push(app_count);
        res_list.push(res_count);
        int_list.push(int_count);
        fin_list.push(fin_count);
    } else {
        // Push zero to the each list of activity if there was no activity of any type on that day
        app_list.push(0);
        res_list.push(0);
        int_list.push(0);
        fin_list.push(0);
    };
};


const series = [
    {
        name: "applications",
        data: app_list,
    },
    // {
    //     name: "resumes",
    //     data: res_list,
    // },
    // {
    //     name: "interviews",
    //     data: int_list,
    // },
    // {
    //     name: "finals",
    //     data: fin_list,
    // },
];

function themeOptions(theme) {
    return {
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: "smooth",
        },
        xaxis: {
            type: "datetime",
            categories: week_list,
        },
        tooltip: {
            x: {
                format: "dd/MM/yy HH:mm",
            },
        },
        fill: {
            colors: [theme.palette.primary.light, theme.palette.success.light],
        },
        colors: [theme.palette.primary.main, theme.palette.success.main],
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

const StatsLineChartFilled = ({ theme }) => {
    return (
        <ApexCharts
            options={themeOptions(theme)}
            series={series}
            type="area"
            height={350}
        />    
    );    
}    
export default StatsLineChartFilled;
