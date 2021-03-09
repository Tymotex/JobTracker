import React, { useState } from 'react';

import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Accordion from './accordion'
import Layout from '../../components/Layout/Layout';
import styles from './FAQ.module.scss'

const FAQ = () => {
    const [query, setQuery] = useState("");
    const searchForQuestion = (event) => {
        setQuery(event.target.value);
    };

    return (
        <Layout>
            <h1 className={styles.Title}>FAQ</h1>
            <p className={styles.text}>
                Search for your question or browse our frequently asked questions
            </p>
            <br/>
            <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-amount"></InputLabel>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    placeholder={"Search"}
                    onChange={searchForQuestion}
                    startAdornment={<InputAdornment position="start"></InputAdornment>}
                />
            </FormControl>
            {query === "" ? (
                <div>
                    <Accordion/>
                </div>
            ) : (
                <div>
                    {/* START HERE */}



                    {/* END HERE */}
                </div>
            )}
        </Layout>
    );
};

export default FAQ;
