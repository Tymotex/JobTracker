import React from "react";
import HeatMap from "react-heatmap-grid";

const StatsHeapMap = () => {
    const xLabels = new Array(8).fill(0).map((_, i) => `${i}`);
    const yLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const data = new Array(yLabels.length)
        .fill(0)
        .map(() => 
            new Array(xLabels.length).fill(0).map(() => Math.floor(Math.random() * 100))
        );
    return (
        <div style={{ fontSize: "13px" }}>
            <HeatMap
                xLabels={xLabels}
                yLabels={yLabels}
                xLabelsLocation={"bottom"}
                xLabelWidth={60}
                data={data}
                rectangles
                height={45}
                cellStyle={(background, value, min, max, data, x, y) => ({
                background: `rgb(0, 151, 230, ${1 - (max - value) / (max - min)})`,
                fontSize: "11.5px",
                color: "#444"
                })}
                cellRender={value => value && <div>{value}</div>}
            />
        </div>
    )
}

export default StatsHeapMap;