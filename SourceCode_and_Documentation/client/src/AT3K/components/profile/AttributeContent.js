import { Typography } from "@material-ui/core"

const AttributeContent = ({ children }) => {
    return (
        <div style={{ minHeight: '50px'}}>
            <Typography
                align="left"
                variant="subtitle1"
            >
                {children}
            </Typography>
        </div>
    )
}

export default AttributeContent;