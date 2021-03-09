import React from 'react';

import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Accordion from './accordion'
import Layout from '../../components/Layout/Layout';
import styles from './FAQ.module.scss'

const FAQ = () => {
    return (
        <Layout>
            <h1 className={styles.Title}>FAQ</h1>
            <p className={styles.text}>
                Search for your question or browse our frequently asked questions
            </p>
            <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-amount">How do i get rid of this!?</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    placeholder={"Search"}
                    onChange={function() {}}
                    startAdornment={<InputAdornment position="start"></InputAdornment>}
                    labelWidth={60}
                />
            </FormControl>

            <Accordion/>
        </Layout>
    );
};

export default FAQ;
