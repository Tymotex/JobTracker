import React from 'react';
import styles from './CardCarousel.module.scss';

const CompanyCard = ({ name, description }) => {
    return (
        <div className={styles.companyCard}>
            <h3 className={styles.title}>
                {name}
            </h3>
            <p className={styles.description}>
                {description}
            </p>
        </div>
    )
}

export default CompanyCard;
