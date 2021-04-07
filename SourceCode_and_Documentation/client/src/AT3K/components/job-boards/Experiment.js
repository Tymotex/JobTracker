import React from "react";
import ReactDOM from "react-dom";
import ReactDataGrid from "react-data-grid";

class Example extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            rows: this.props.trackedJobs,
            columns: this.props.columns
        };
    }

    onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
        this.setState(state => {
            const rows = state.rows.slice();
            for (let i = fromRow; i <= toRow; i++) {
                rows[i] = { ...rows[i], ...updated };
            }
            return { rows };
        });
    };
    render() {
        return (
            <ReactDataGrid
                columns={this.state.columns}
                rowGetter={i => this.state.rows[i]}
                rowsCount={3}
                onGridRowsUpdated={this.onGridRowsUpdated}
                enableCellSelect={true}
            />
        );
    }
}

const rootElement = document.getElementById("root");
export default Example;
