import React from "react";
import { useTheme } from "@material-ui/styles";
import ApexCharts from "react-apexcharts";


const series = [
    {
        name: "Monday",
        data: generateData(8, {
            min: 0,
            max: 10,
        }),
    },
    {
        name: "Tuesday",
        data: generateData(8, {
            min: 0,
            max: 10,
        }),
    },
    {
        name: "Wednesday",
        data: generateData(8, {
            min: 0,
            max: 10,
        }),
    },
    {
        name: "Thursday",
        data: generateData(8, {
            min: 0,
            max: 10,
        }),
    },
    {
        name: "Friday",
        data: generateData(8, {
            min: 0,
            max: 10,
        }),
    },
    {
        name: "Saturday",
        data: generateData(8, {
            min: 0,
            max: 10,
        }),
    },
    {
        name: "Sunday",
        data: generateData(8, {
            min: 0,
            max: 10,
        }),
    }
];

function generateData(count, yrange) {
    var i = 0;
    var series = [];
    while (i < count) {
        var x = "Week " + (i + 1).toString();
        var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

        series.push({
            x: x,
            y: y,
        });
        i++;
    }
    return series;
}

function themeOptions(theme) {
    return {
        chart: {
            toolbar: {
                show: false,
            },
        },
        dataLabels: {
            enabled: false,
        },
        colors: [theme.palette.primary.main],
    };
}

const StatsHeapMap = () => {
    var theme = useTheme();

    return (
        <ApexCharts
            options={themeOptions(theme)}
            series={series}
            type="heatmap"
            height={350}
        />
    );
}

export default StatsHeapMap;
