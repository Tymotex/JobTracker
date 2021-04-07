
const Selector = ({ row, customKey, onRowChange, options }) => {
    const setNewObject = (row, key, value) => {
        const newObj = {
            ...row,
        }
        newObj[key] = value;
        return newObj;
    }
    return (
        <select
            value={row.title}
            onChange={event => onRowChange(setNewObject(row, customKey, event.target.value), true)}
            autoFocus
        >
            {options.map(item => (
                <option key={item} value={item}>
                    {item}
                </option>
            ))}
        </select>
    );
}

export default {
    StatusEditor({ row, onRowChange }) {
        const options = ['', 'application', 'resume', 'interview', 'final'];
        return (
            <>
                <Selector row={row} customKey="current_status" onRowChange={onRowChange} options={options} />
            </>
        );
    },
    PriorityEditor({ row, onRowChange }) {
        const options = ["", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        return (
            <Selector row={row} customKey="priority" onRowChange={onRowChange} options={options} />
        );
    },

};
