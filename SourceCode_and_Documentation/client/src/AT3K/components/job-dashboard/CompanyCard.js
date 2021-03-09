import React from 'react';
import styles from './CardCarousel.module.scss';

const CompanyCard = ({ name, description, link }) => {
    return (
        <div className={styles.companyCard}>
            <h3 className={styles.title}>
                <a href={link}>{name}</a>
            </h3>
            <p className={styles.description}>
                {description}
            </p>
        </div>
    )
}

export default CompanyCard;
