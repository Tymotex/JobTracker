import React, { useState } from "react";
import {
    Pie,
    PieChart,
    Sector
} from "recharts";
import { LoadingSpinner } from '../loaders';

const StatsPieChart = ({ theme, pieChartData, boards, selectedBoardID }) => {
    const [activeIndex, setActiveIndexId] = useState(0);
    
    /*
    IMPORTANT NOTE:
        You have access to the 'boards' variable ^^^ 

        This contains something like this: [
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

    if (boards) {
        const boardStats = boards.map(eachBoard => {
            return eachBoard.statistics
        });

        let globalStats = [];
        boardStats.forEach(eachStat => {
            globalStats = [...globalStats, ...eachStat]
        });

        const specificBoardStats = boards.filter(eachBoard => eachBoard._id === selectedBoardID)[0];

        // Global stats is ready for you to work with
        // See the chrome inspector console to check what gets outputted:
        // selectedBoardID will be null if no board is selected. Use this to 
        // determine whether to render the global data or specific board data
        // The selected board dropdown should be working.
        console.log("Global stats");
        console.log(globalStats);
        console.log("Selected board's stats");
        console.log(specificBoardStats);

        // TODO: This array is dummy data. Fill it out with the real data:
        // Activities to filter for (exact strings): "application", "resume", "interview", "final"
        var appCount = 0, resumeCount = 0, interviewCount = 0, finalCount = 0;
        if (selectedBoardID == null) {
            for (var i = 0; i < globalStats.length; i++) {
                const activity = globalStats[i]["activity"];
                if (activity === "application") appCount++;
                if (activity === "resume") resumeCount++;
                if (activity === "interview") interviewCount++;
                if (activity === "final") finalCount++;
            };
        } else {
            const stats = specificBoardStats["statistics"];
            for (var i = 0; i < stats.length; i++) {
                const activity = stats[i]["activity"];
                if (activity === "application") appCount++;
                if (activity === "resume") resumeCount++;
                if (activity === "interview") interviewCount++;
                if (activity === "final") finalCount++;
            };
        };

        const currentProgress = [
            { name: "Awaiting Application", value: appCount },
            { name: "Resume Sent", value: resumeCount },
            { name: "Interview Stage", value: interviewCount },
            { name: "Finalised", value: finalCount },
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
    
    } else {
        return (
            <LoadingSpinner />
        )
    }
};

export default StatsPieChart;
