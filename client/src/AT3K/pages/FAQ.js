import React, { useState } from 'react';

import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Accordion from './accordion'
import Layout from '../../components/Layout/Layout';
import styles from './FAQ.module.scss'
import Card from './card';
import pageStyles from './Page.module.scss';

const FAQ = () => {
    const [query, setQuery] = useState("");
    const searchForQuestion = (event) => {
        setQuery(event.target.value);
    };

    return (
        <Layout>
            <div className={pageStyles.container}>
                <h1 className={styles.Title}>FAQ</h1>
                <p className={styles.text}>
                    Search for your question or browse our frequently asked questions
                    (TYPE IN THE SEARCH BAR TO BRING UP ANOTHER VIEW)
                </p>
                <br />
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
                        <Accordion />
                    </div>
                ) : (
                    <div>
                        {/* START HERE */}



                        <strong><h2>Results:</h2></strong>
                        <Card />
                        <Card />
                        <Card />
                        <br />
                        <footer>
                            For more information, please contact us at example@email.com
                        </footer>
                        {/* END HERE */}
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default FAQ;
