import React from 'react';

import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';

import Layout from '../../components/Layout/Layout';

const FAQ = () => {
    return (
        <Layout>
            <h1>FAQ</h1>
            <p>
                Hello
            </p>
            <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-amount">Search for a question</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    value={"Test"}
                    onChange={function() {}}
                    startAdornment={<InputAdornment position="start"></InputAdornment>}
                    labelWidth={60}
                />
            </FormControl>
        </Layout>
    );
};

export default FAQ;
