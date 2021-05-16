import { Box, Divider, Typography } from "@material-ui/core";
import styles from '../../pages/Profile.module.scss';

const AttributeTitle = ({ children }) => {
    return (
        <Box display='flex' flexDirection='row' alignItems='center' className={styles.attributeTitle}>

            <Typography
                align="left"
                variant="h5"
                color='textPrimary'
                style={{ fontFamily: 'Arialight', fontWeight: 'lighter' }}
            >
                {children}
            </Typography>
            <Divider />
        </Box>
    )
}

export default AttributeTitle;