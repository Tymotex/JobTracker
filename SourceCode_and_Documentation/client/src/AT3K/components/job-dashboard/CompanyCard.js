import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CardCarousel.module.scss';

const CompanyCard = ({ name, description, link }) => {
    return (
        <div className={styles.companyCard}>
            <h3 className={styles.title}>
                <Link to={`${link}?company=${name}`}>
                    {name}
                </Link>
                {/* <a href={link}></a> */}
            </h3>
            <p className={styles.description}>
                {description}
            </p>
        </div>
    )
}

export default CompanyCard;
