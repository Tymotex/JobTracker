import React, { useState } from "react";
import {
    Pie,
    PieChart,
    Sector
} from "recharts";

/*

After making a call to GET /api/user/boards, you'll get something like this

[
    {
        "_id":{
            "$oid":"60752005b8ee7734839b55f4"
        },
        "user_id":"60751ff9b8ee7734839b55f3",
        "name":"fff",
        "description":"ff",
        "tracked_jobs":[
            {
                "title":"Software Support Specialist",
                "company":"AMDOCS LTD",
                "locations":"Sydney, NSW",
                "url":"http://jobviewtrack.com/en-au/job-1919417e42021b19460645433b141e170a52006a3a065a5b525f59443c1e4217490204081d1367731b0e1d044b59580d7e140a0d4e154c0a1b156c340a46001f08014f296e585d14001c537513505a5759/d349683cc44736c739530ec22c37e336.html?affid=213e213hd12344552",
                "description":"B>software engineering tools and various innovative techniques, and reusing existing solutions. By means of automation... Leading-edge software solutions, using best in class delivery practices and tooling via a devops model for faster to market...",
                "salary":"",
                "date":"Fri, 26 Mar 2021 06:30:11 GMT",
                "current_status":"application",
                "notes":"",
                "priority":{
                    "$numberInt":"5"
                },
                "job_id":"60752005b8ee7734839b55f4-b8d8ed55-022d-45c2-91e8-ff881c60fdcf"
            }
        ],
        "statistics":[
            {
                "timestamp":{
                    "$numberDouble":"1618292032.1451018"
                },
                "activity":"application",
                "job_id":"60752005b8ee7734839b55f4-b8d8ed55-022d-45c2-91e8-ff881c60fdcf"
            }
        ]
    }
]


*/

const stats = [
    {
        "timestamp":{
            "$numberDouble":"1618292032.1451018"
        },
        "activity":"application",
        "job_id":"60752005b8ee7734839b55f4-b8d8ed55-022d-45c2-91e8-ff881c60fdcf"
    },
    {
        "timestamp":{
            "$numberDouble":"1618292032.1451018"
        },
        "activity":"resume",
        "job_id":"60752005b8ee7734839b55f4-b8d8ed55-022d-45c2-91e8-ff881c60fdcf"
    }
]



const currentProgress = [
    { name: "Awaiting Application", value: 50 },
    { name: "Resume Sent", value: 10 },
    { name: "Interview Stage", value: 4 },
    { name: "Finalised", value: 2 },
];

function renderActiveShape(props) {
    var RADIAN = Math.PI / 180;
    var {
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        startAngle,
        endAngle,
        fill,
        payload,
        percent,
        value,
    } = props;
    var sin = Math.sin(-RADIAN * midAngle);
    var cos = Math.cos(-RADIAN * midAngle);
    var sx = cx + (outerRadius + 10) * cos;
    var sy = cy + (outerRadius + 10) * sin;
    var mx = cx + (outerRadius + 30) * cos;
    var my = cy + (outerRadius + 30) * sin;
    var ex = mx + (cos >= 0 ? 1 : -1) * 22;
    var ey = my;
    var textAnchor = cos >= 0 ? "start" : "end";


    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                {payload.name}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={"#8884d8"}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path
                d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
                stroke={fill}
                fill="none"
            />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                textAnchor={textAnchor}
                fill="#333"
            >{`Number: ${value}`}</text>
            <text
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                dy={18}
                textAnchor={textAnchor}
                fill="#999"
            >
                {`${(percent * 100).toFixed(2)}%`}
            </text>
        </g>
    );
}

const StatsPieChart = ({ theme, pieChartData }) => {
    const [activeIndex, setActiveIndexId] = useState(0);
    return (
        <PieChart width={500} height={300}>
            <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                // data={pieChartData}
                data={currentProgress}
                innerRadius={60}
                outerRadius={80}
                fill={theme.palette.primary.main}
                dataKey="value"
                onMouseEnter={(e, id) => setActiveIndexId(id)}
            />
        </PieChart>
    );
};

export default StatsPieChart;
