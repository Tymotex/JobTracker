import React, { useState } from "react";
import { Pie, PieChart, Sector } from "recharts";
import { LoadingSpinner } from "../loaders";

const StatsPieChart = ({ theme, boards, selectedBoardID }) => {
    const [activeIndex, setActiveIndexId] = useState(0);

    if (!boards) {
        return <LoadingSpinner />;
    }

    const boardStats = boards.map((eachBoard) => {
        return eachBoard.statistics;
    });

    let globalStats = [];
    boardStats.forEach((eachStat) => {
        globalStats = [...globalStats, ...eachStat];
    });

    const specificBoardStats = boards.filter(
        (eachBoard) => eachBoard._id === selectedBoardID
    )[0];

    // Global stats is ready for you to work with
    // See the chrome inspector console to check what gets outputted:
    // selectedBoardID will be null if no board is selected. Use this to
    // determine whether to render the global data or specific board data
    // The selected board dropdown should be working.

    /*
    if activity === "interview":
        this job has gotten past the resume stage and should increment "resume hit"
    else if activity === "resume":
        the user has sent out the resume but it hasn't produced a response yet
    */
    let hitCount = 0,
        missCount = 0;
    if (selectedBoardID == null) {
        for (let i = 0; i < globalStats.length; i++) {
            const activity = globalStats[i]["activity"];
            if (activity === "resume") missCount++;
            if (activity === "interview") hitCount++;
        }
    } else {
        const stats = specificBoardStats["statistics"];
        for (let i = 0; i < stats.length; i++) {
            const activity = stats[i]["activity"];
            if (activity === "resume") missCount++;
            if (activity === "interview") hitCount++;
        }
    }

    const currentProgress = [
        { name: "Resume Hits", value: hitCount },
        { name: "Resume Misses", value: missCount },
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
};

export default StatsPieChart;
