import { Button, Grid } from "@material-ui/core";
import { ArrowBack as ArrowBackIcon } from "@material-ui/icons";
import axios from "axios";
import Cookie from "js-cookie";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import JobItem from "../components/company-profile/JobItem";
import DescriptionSection from "../components/job-details/DescriptionSection";
import Footer from "../components/job-details/Footer";
import { ContentLoader } from "../components/loaders";
import { Notification } from "../components/notification";
import api from "../constants/api";
import styles from "./JobDetails.module.scss";
import pageStyles from "./Page.module.scss";

const Header = ({ name }) => {
    const [save, setSave] = React.useState();
    const userID = Cookie.get("user_id");

    useEffect(() => {
        // load initial state of this company
        if (userID) {
            axios
                .get(`${api.BASE_URL}/api/user/company?user_id=${userID}`)
                .then((res) => setSave(res.data.indexOf(name) > -1))
                .catch((err) => Notification.spawnError(err));
        } else {
            Notification.spawnRegisterError();
        }
    }, [name, userID]);

    const btnStyle = {
        margin: "20px 5px",
    };

    const companyIconStyle = {
        padding: "5px",
    };

    const handleBack = () => window.history.back();

    const handleSave = () => {
        // if current state is 'already saved', unsave the company
        const userID = Cookie.get("user_id");
        if (userID) {
            const postData = {
                method: save ? "delete" : "post",
                url: `${api.BASE_URL}/api/user/company`,
                data: {
                    user_id: userID,
                    company_name: name,
                },
                headers: {
                    "Content-Type": "application/json",
                },
            };
            axios(postData)
                .then((res) => {
                    Notification.spawnSuccess(
                        `${save ? "Unsaved" : "Saved"} '${res.data}'`
                    );
                    setSave(!save);
                })
                .catch((err) => Notification.spawnError(err));
        } else {
            Notification.spawnRegisterError();
        }
    };

    return (
        <Grid container direction="column">
            <Grid item>
                <Button onClick={handleBack} className={styles.iconLabelSet}>
                    <ArrowBackIcon id="back" fontSize="large" />
                    <label for="back">Back</label>
                </Button>
            </Grid>

            <Grid item>
                <div className={styles.iconLabelSet}>
                    <img
                        src={`https://logo.clearbit.com/${
                            name.split(" ")[0] // TODO: Hacky solution to work around company names with whitespace
                        }.com`}
                        style={companyIconStyle}
                        alt={name}
                    />
                </div>
                <div className={styles.mainTitle}>{name}</div>
            </Grid>

            <Grid item direction="row">
                <Button
                    style={btnStyle}
                    variant="outlined"
                    color="secondary"
                    size="small"
                    onClick={handleSave}
                >
                    {save ? "Saved" : "Save"}
                </Button>
            </Grid>
        </Grid>
    );
};

const CompanyProfile = () => {
    const [companyDetails, setCompanyDetails] = useState(null);
    const search = useLocation().search;
    const params = new URLSearchParams(search);
    const company = params.get("company");
    useEffect(() => {
        if (company && company !== "") {
            axios
                .get(`${api.BASE_URL}/api/company?company=${company}`)
                .then((response) => setCompanyDetails(response.data))
                .catch((err) => Notification.spawnError(err));
        }
    }, [company]);

    const isLoading = companyDetails === null;
    return (
        <Layout>
            <div className={pageStyles.container}>
                {company && company !== "" ? (
                    <>
                        <Header name={company} />
                        <hr />
                        <DescriptionSection title="About">
                            {isLoading ? (
                                <ContentLoader />
                            ) : (
                                <>
                                    {companyDetails &&
                                        companyDetails.company_info
                                            .company_details}
                                </>
                            )}
                        </DescriptionSection>
                        {isLoading ? (
                            <ContentLoader />
                        ) : (
                            <>
                                {companyDetails &&
                                    companyDetails.jobs &&
                                    companyDetails.jobs.length !== 0 && (
                                        <DescriptionSection title="Recent Jobs">
                                            {companyDetails &&
                                                companyDetails.jobs.map(
                                                    (job) => (
                                                        <JobItem {...job} />
                                                    )
                                                )}
                                        </DescriptionSection>
                                    )}
                            </>
                        )}
                        <hr />
                        <Footer type="company" />
                        <div>
                            <a href="https://clearbit.com">
                                Logos provided by Clearbit
                            </a>
                        </div>
                    </>
                ) : (
                    <>No company</>
                )}
            </div>
        </Layout>
    );
};

export default CompanyProfile;
